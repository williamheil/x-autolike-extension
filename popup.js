const toggle = document.getElementById('toggleSwitch');
const card = document.getElementById('toggleCard');
const badge = document.getElementById('statusBadge');
const statusText = document.getElementById('statusText');
const timeRange = document.getElementById('timeRange');
const timeLabel = document.getElementById('timeLabel');

function updateUI(enabled) {
  toggle.checked = enabled;
  if (enabled) {
    card.classList.add('active');
    badge.className = 'status-badge on';
    statusText.textContent = 'Monitorando seu feed...';
  } else {
    card.classList.remove('active');
    badge.className = 'status-badge off';
    statusText.textContent = 'Pausado';
  }
}

function updateSlider(val) {
  timeLabel.textContent = val + 's';
  const pct = ((val - 2) / (8 - 2)) * 100;
  timeRange.style.background = `linear-gradient(to right, var(--accent) ${pct}%, var(--border) ${pct}%)`;
}

chrome.storage.sync.get(['enabled', 'readTime'], (r) => {
  updateUI(r.enabled !== undefined ? r.enabled : true);
  const t = r.readTime || 3;
  timeRange.value = t;
  updateSlider(t);
});

toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
  updateUI(toggle.checked);
});

timeRange.addEventListener('input', () => {
  const val = parseFloat(timeRange.value);
  updateSlider(val);
  chrome.storage.sync.set({ readTime: val });
});
