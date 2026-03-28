const toggle    = document.getElementById('toggleSwitch');
const card      = document.getElementById('toggleCard');
const badge     = document.getElementById('statusBadge');
const statusTxt = document.getElementById('statusText');
const timeRange = document.getElementById('timeRange');
const timeLabel = document.getElementById('timeLabel');
const limitRange= document.getElementById('limitRange');
const limitLabel= document.getElementById('limitLabel');
const countNum  = document.getElementById('countNum');
const countOf   = document.getElementById('countOf');
const fill      = document.getElementById('progressFill');

const TODAY_KEY = () => 'likes_' + new Date().toISOString().slice(0, 10);

function updateUI(enabled, count, limit) {
  toggle.checked = enabled;
  const atLimit = count >= limit;

  if (!enabled) {
    card.classList.remove('active');
    badge.className = 'status-badge off';
    statusTxt.textContent = 'Pausado';
  } else if (atLimit) {
    card.classList.add('active');
    badge.className = 'status-badge limit';
    statusTxt.textContent = `Limite de ${limit} curtidas atingido hoje`;
  } else {
    card.classList.add('active');
    badge.className = 'status-badge on';
    statusTxt.textContent = 'Monitorando seu feed...';
  }
}

function updateProgress(count, limit) {
  const pct = Math.min((count / limit) * 100, 100);
  fill.style.width = pct + '%';
  fill.className = 'progress-fill' + (pct >= 90 ? ' danger' : pct >= 70 ? ' warning' : '');
  countNum.textContent = count;
  countOf.textContent = '/ ' + limit;
}

function updateSlider(val) {
  timeLabel.textContent = val + 's';
  const pct = ((val - 2) / (8 - 2)) * 100;
  timeRange.style.background = `linear-gradient(to right,var(--accent) ${pct}%,var(--border) ${pct}%)`;
}

function updateLimitSlider(val) {
  limitLabel.textContent = val + '/dia';
  const pct = ((val - 20) / (500 - 20)) * 100;
  limitRange.style.background = `linear-gradient(to right,var(--red) ${pct}%,var(--border) ${pct}%)`;
}

// Carrega estado
chrome.storage.sync.get(['enabled', 'readTime', 'dailyLimit'], (s) => {
  const enabled = s.enabled !== undefined ? s.enabled : true;
  const time    = s.readTime    || 3;
  const limit   = s.dailyLimit  || 100;

  timeRange.value  = time;
  limitRange.value = limit;
  updateSlider(time);
  updateLimitSlider(limit);

  chrome.storage.local.get([TODAY_KEY()], (l) => {
    const count = l[TODAY_KEY()] || 0;
    updateUI(enabled, count, limit);
    updateProgress(count, limit);
  });
});

// Toggle
toggle.addEventListener('change', () => {
  chrome.storage.sync.get(['dailyLimit'], (s) => {
    const limit = s.dailyLimit || 100;
    chrome.storage.local.get([TODAY_KEY()], (l) => {
      const count = l[TODAY_KEY()] || 0;
      chrome.storage.sync.set({ enabled: toggle.checked });
      updateUI(toggle.checked, count, limit);
    });
  });
});

// Slider de tempo
timeRange.addEventListener('input', () => {
  const val = parseFloat(timeRange.value);
  updateSlider(val);
  chrome.storage.sync.set({ readTime: val });
});

// Slider de limite
limitRange.addEventListener('input', () => {
  const val = parseInt(limitRange.value);
  updateLimitSlider(val);
  chrome.storage.sync.set({ dailyLimit: val });
  chrome.storage.local.get([TODAY_KEY()], (l) => {
    const count = l[TODAY_KEY()] || 0;
    updateProgress(count, val);
    updateUI(toggle.checked, count, val);
  });
});

// Atualiza contador em tempo real
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes[TODAY_KEY()]) {
    const count = changes[TODAY_KEY()].newValue || 0;
    chrome.storage.sync.get(['dailyLimit'], (s) => {
      const limit = s.dailyLimit || 100;
      updateProgress(count, limit);
      updateUI(toggle.checked, count, limit);
    });
  }
});
