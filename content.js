// readlike - Content Script v3.2
let isEnabled  = true;
let dailyLimit = 100;
let readTime   = 3000;
let unlimited  = false;

const likedPosts   = new Set();
const watchedPosts = new Map();
const VISIBILITY_THRESHOLD = 0.6;

function todayKey() {
  return 'likes_' + new Date().toISOString().slice(0, 10);
}

function getCount(cb) {
  chrome.storage.local.get([todayKey()], (r) => cb(r[todayKey()] || 0));
}

function incrementCount() {
  const key = todayKey();
  chrome.storage.local.get([key], (r) => {
    chrome.storage.local.set({ [key]: (r[key] || 0) + 1 });
  });
}

chrome.storage.sync.get(['enabled', 'dailyLimit', 'readTime', 'unlimited'], (r) => {
  if (r.enabled    !== undefined) isEnabled  = r.enabled;
  if (r.dailyLimit !== undefined) dailyLimit = r.dailyLimit;
  if (r.readTime   !== undefined) readTime   = r.readTime * 1000;
  if (r.unlimited  !== undefined) unlimited  = r.unlimited;
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') {
    if (changes.enabled)    isEnabled  = changes.enabled.newValue;
    if (changes.dailyLimit) dailyLimit = changes.dailyLimit.newValue;
    if (changes.readTime)   readTime   = changes.readTime.newValue * 1000;
    if (changes.unlimited)  unlimited  = changes.unlimited.newValue;
  }
});

function getTweetId(article) {
  const link = article.querySelector('a[href*="/status/"]');
  if (link) {
    const match = link.href.match(/status\/(\d+)/);
    if (match) return match[1];
  }
  return null;
}

function isAlreadyLiked(article) {
  if (article.querySelector('[data-testid="unlike"]')) return true;
  const btn = article.querySelector('[data-testid="like"]');
  if (btn) {
    const label = (btn.getAttribute('aria-label') || '').toLowerCase();
    if (label.includes('liked') || label.includes('curtiu')) return true;
  }
  return false;
}

function likeTweet(article, tweetId) {
  if (!isEnabled) return;
  if (isAlreadyLiked(article)) return;
  if (tweetId && likedPosts.has(tweetId)) return;

  const btn = article.querySelector('[data-testid="like"]');
  if (!btn) return;

  getCount((count) => {
    if (!unlimited && count >= dailyLimit) return;

    setTimeout(() => {
      if (!isEnabled || isAlreadyLiked(article)) return;
      getCount((countNow) => {
        if (!unlimited && countNow >= dailyLimit) return;
        try {
          btn.click();
          if (tweetId) likedPosts.add(tweetId);
          incrementCount();
        } catch(e) {}
      });
    }, Math.random() * 600);
  });
}

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const article = entry.target;
    const tweetId = getTweetId(article) || article.dataset.alId;
    if (!tweetId) continue;
    if (likedPosts.has(tweetId)) continue;

    if (entry.isIntersecting && entry.intersectionRatio >= VISIBILITY_THRESHOLD) {
      if (!watchedPosts.has(tweetId)) {
        const wait = readTime + Math.random() * 2000;
        const timer = setTimeout(() => {
          if (likedPosts.has(tweetId)) return;
          const rect = article.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          if (inView) likeTweet(article, tweetId);
          watchedPosts.delete(tweetId);
        }, wait);
        watchedPosts.set(tweetId, { timer });
      }
    } else {
      if (watchedPosts.has(tweetId)) {
        clearTimeout(watchedPosts.get(tweetId).timer);
        watchedPosts.delete(tweetId);
      }
    }
  }
}, { threshold: [0, VISIBILITY_THRESHOLD, 1.0] });

let observedSet = new Set();
let idCounter = 0;

function observeArticles() {
  const articles = document.querySelectorAll('article[data-testid="tweet"]');
  for (const article of articles) {
    if (observedSet.has(article)) continue;
    observedSet.add(article);
    if (!getTweetId(article)) article.dataset.alId = `al-${++idCounter}`;
    observer.observe(article);
  }
}

const domObserver = new MutationObserver(() => observeArticles());
domObserver.observe(document.body, { childList: true, subtree: true });

let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    observedSet.clear();
    watchedPosts.forEach(({ timer }) => clearTimeout(timer));
    watchedPosts.clear();
    setTimeout(observeArticles, 800);
  }
}).observe(document.body, { childList: true, subtree: true });

setTimeout(observeArticles, 1200);
