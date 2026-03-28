// Auto Like ao Ler - Content Script
// Curte posts que você parou pra ler (3-5s visíveis na tela)

let isEnabled = true;
const likedPosts = new Set();
const watchedPosts = new Map();

const MIN_READ_TIME = 3000;
const MAX_READ_TIME = 5000;
const VISIBILITY_THRESHOLD = 0.6;

chrome.storage.sync.get(['enabled'], (r) => {
  if (r.enabled !== undefined) isEnabled = r.enabled;
});
chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) isEnabled = changes.enabled.newValue;
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

  setTimeout(() => {
    if (!isEnabled || isAlreadyLiked(article)) return;
    try {
      btn.click();
      if (tweetId) likedPosts.add(tweetId);
    } catch(e) {}
  }, Math.random() * 600);
}

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const article = entry.target;
    const tweetId = getTweetId(article) || article.dataset.alId;
    if (!tweetId) continue;
    if (likedPosts.has(tweetId)) continue;

    if (entry.isIntersecting && entry.intersectionRatio >= VISIBILITY_THRESHOLD) {
      if (!watchedPosts.has(tweetId)) {
        const readTime = MIN_READ_TIME + Math.random() * (MAX_READ_TIME - MIN_READ_TIME);
        const timer = setTimeout(() => {
          if (likedPosts.has(tweetId)) return;
          const rect = article.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          if (inView) likeTweet(article, tweetId);
          watchedPosts.delete(tweetId);
        }, readTime);
        watchedPosts.set(tweetId, { timer, startTime: Date.now() });
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
    if (!getTweetId(article)) {
      article.dataset.alId = `al-${++idCounter}`;
    }
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
