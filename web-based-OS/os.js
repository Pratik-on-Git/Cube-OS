// Real-time clock for the taskbar
function updateClock() {
  const clock = document.getElementById('taskbar-clock');
  if (!clock) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  clock.innerHTML = `<span class="clock-time">${hh}:${mm}</span><span class="clock-date">${day}-${month}-${year}</span>`;
}
setInterval(updateClock, 1000);
updateClock();

// Online/Offline status detection
function updateConnectionStatus() {
  const connectionStatus = document.querySelector('.connection-status');
  const connectionText = document.getElementById('connection-text');
  const taskbarConnectionStatus = document.getElementById('taskbar-connection-status');
  
  if (!connectionStatus || !connectionText) return;
  
  if (navigator.onLine) {
    connectionStatus.classList.remove('offline');
    connectionStatus.classList.add('online');
    connectionText.textContent = 'Online';
    
    if (taskbarConnectionStatus) {
      taskbarConnectionStatus.classList.remove('offline');
      taskbarConnectionStatus.classList.add('online');
    }
  } else {
    connectionStatus.classList.remove('online');
    connectionStatus.classList.add('offline');
    connectionText.textContent = 'Offline';
    
    if (taskbarConnectionStatus) {
      taskbarConnectionStatus.classList.remove('online');
      taskbarConnectionStatus.classList.add('offline');
    }
  }
}

// Initialize connection status
updateConnectionStatus();

// Listen for online/offline events
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

// Add click handler for taskbar connection status
document.addEventListener('DOMContentLoaded', function() {
  const taskbarConnectionStatus = document.getElementById('taskbar-connection-status');
  if (taskbarConnectionStatus) {
    taskbarConnectionStatus.addEventListener('click', function() {
      const status = navigator.onLine ? 'Online' : 'Offline';
      const message = navigator.onLine 
        ? 'You are connected to the internet' 
        : 'You are currently offline. Check your connection.';
      
      // Create a simple notification
      showConnectionNotification(status, message);
    });
  }
});

// Simple notification function
function showConnectionNotification(title, message) {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.connection-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = 'connection-notification';
  notification.innerHTML = `
    <div class="notification-header">
      <span class="notification-title">${title}</span>
      <button class="notification-close">&times;</button>
    </div>
    <div class="notification-message">${message}</div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
  
  // Close button handler
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.remove();
  });
}

// Context menu logic
const desktop = document.getElementById('desktop');
const contextMenu = document.getElementById('context-menu');

desktop.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  contextMenu.style.display = 'block';
  contextMenu.style.left = e.pageX + 'px';
  contextMenu.style.top = e.pageY + 'px';
  contextMenu.innerHTML = `
    <li id="cm-refresh">Refresh</li>
    <li id="cm-new">New</li>
    <li id="cm-del">Delete</li>
    <li id="cm-rename">Rename</li>
  `;
});

document.addEventListener('click', function() {
  contextMenu.style.display = 'none';
});

// Start Menu window logic
const startMenuWindow = document.getElementById('start-menu-window');
const startButton = document.getElementById('start-button');

function renderStartMenu() {
  startMenuWindow.innerHTML = `
    <div class="start-searchbar">
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="7" stroke="#bbb" stroke-width="2" fill="none"/>
        <line x1="14.2" y1="14.2" x2="18" y2="18" stroke="#bbb" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <input type="text" placeholder="Search for apps, settings, and documents" />
    </div>
    <div class="start-section">
      <div class="start-section-header">Pinned <span class="show-all">Show all</span></div>
      <div class="start-pinned">
        <div class="start-app notepad-app" title="Notepad">
                  <svg fill="#fff" width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="notepad-1"  enable-background="new 0 0 32 32" xml:space="preserve">
          <rect x="9" y="17" width="14" height="2"/>
          <rect x="9" y="21" width="14" height="2"/>
          <rect x="9" y="13" width="14" height="2"/>
          <path d="M23 4V2h-2v2h-4V2h-2v2h-4V2H9v2H4v26h24V4H23zM26 28H6V6h3v2h2V6h4v2h2V6h4v2h2V6h3V28z"/>
        </svg>
          <div class="start-app-label">Notepad</div>
        </div>
        <div class="start-app"><svg fill="#fff" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 305 305" xml:space="preserve">
<g id="XMLID_16_">
	<path id="XMLID_17_" d="M95.506,152.511c0,31.426,25.567,56.991,56.994,56.991c31.425,0,56.99-25.566,56.99-56.991
		c0-31.426-25.565-56.993-56.99-56.993C121.073,95.518,95.506,121.085,95.506,152.511z"/>
	<path id="XMLID_18_" d="M283.733,77.281c0.444-0.781,0.436-1.74-0.023-2.513c-13.275-22.358-32.167-41.086-54.633-54.159
		C205.922,7.134,179.441,0.012,152.5,0.012c-46.625,0-90.077,20.924-119.215,57.407c-0.643,0.804-0.727,1.919-0.212,2.81
		l42.93,74.355c0.45,0.78,1.28,1.25,2.164,1.25c0.112,0,0.226-0.008,0.339-0.023c1.006-0.137,1.829-0.869,2.083-1.852
		c8.465-32.799,38.036-55.706,71.911-55.706c2.102,0,4.273,0.096,6.455,0.282c0.071,0.007,0.143,0.01,0.214,0.01H281.56
		C282.459,78.545,283.289,78.063,283.733,77.281z"/>
	<path id="XMLID_19_" d="M175.035,224.936c-0.621-0.803-1.663-1.148-2.646-0.876c-6.457,1.798-13.148,2.709-19.889,2.709
		c-28.641,0-55.038-16.798-67.251-42.794c-0.03-0.064-0.063-0.126-0.098-0.188L23.911,77.719c-0.446-0.775-1.272-1.25-2.165-1.25
		c-0.004,0-0.009,0-0.013,0c-0.898,0.005-1.725,0.49-2.165,1.272C6.767,100.456,0,126.311,0,152.511
		c0,36.755,13.26,72.258,37.337,99.969c23.838,27.435,56.656,45.49,92.411,50.84c0.124,0.019,0.248,0.027,0.371,0.027
		c0.883,0,1.713-0.47,2.164-1.25l42.941-74.378C175.732,226.839,175.657,225.739,175.035,224.936z"/>
	<path id="XMLID_20_" d="M292.175,95.226h-85.974c-1.016,0-1.931,0.615-2.314,1.555c-0.384,0.94-0.161,2.02,0.564,2.73
		c14.385,14.102,22.307,32.924,22.307,53c0,15.198-4.586,29.824-13.263,42.298c-0.04,0.058-0.077,0.117-0.112,0.178l-61.346,106.252
		c-0.449,0.778-0.446,1.737,0.007,2.513c0.449,0.767,1.271,1.237,2.158,1.237c0.009,0,0.019,0,0.028,0
		c40.37-0.45,78.253-16.511,106.669-45.222C289.338,231.032,305,192.941,305,152.511c0-19.217-3.532-37.956-10.498-55.698
		C294.126,95.855,293.203,95.226,292.175,95.226z"/>
</g>
</svg><div class="start-app-label">Chrome</div></div>
        <div class="start-app"><img src="https://img.icons8.com/color/48/000000/microsoft-word-2019--v2.png" width="28" height="28"/><div class="start-app-label">Word</div></div>
        <div class="start-app"><img src="https://img.icons8.com/color/48/000000/microsoft-excel-2019--v2.png" width="28" height="28"/><div class="start-app-label">Excel</div></div>
        <div class="start-app"><img src="https://img.icons8.com/color/48/000000/microsoft-powerpoint-2019--v2.png" width="28" height="28"/><div class="start-app-label">PowerPoint</div></div>
        <div class="start-app"><img src="https://img.icons8.com/color/48/000000/microsoft-teams.png" width="28" height="28"/><div class="start-app-label">Teams</div></div>
        <div class="start-app"><img src="https://img.icons8.com/color/48/000000/adobe-illustrator.png" width="28" height="28"/><div class="start-app-label">Illustrator</div></div>
        <div class="start-app"><img src="https://img.icons8.com/color/48/000000/adobe-photoshop.png" width="28" height="28"/><div class="start-app-label">Photoshop</div></div>
        <div class="start-app" title="Camera">
          <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3H0V14H16V3H13L11 1H5L3 3ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" fill="#000000"/>
          </svg>
          <div class="start-app-label">Camera</div>
        </div>
      </div>
    </div>
    <div class="start-section">
      <div class="start-section-header">Recommended <span class="show-all">Show all</span></div>
      <div class="start-recommended">
        <div class="start-recommended-item">
          <div class="start-recommended-icon"><img src="https://img.icons8.com/color/48/000000/linkedin.png" width="35" height="35"/></div>
          <div class="start-recommended-info">
            <div class="start-recommended-title">LinkedIn</div>
            <div class="start-recommended-desc">From your browsing history</div>
          </div>
        </div>
        <div class="start-recommended-item">
          <div class="start-recommended-icon"><img src="https://img.icons8.com/color/48/000000/microsoft-word-2019--v2.png" width="35" height="35"/></div>
          <div class="start-recommended-info">
            <div class="start-recommended-title">Try Microsoft Word</div>
            <div class="start-recommended-desc">Create and edit documents</div>
          </div>
        </div>
      </div>
    </div>
     <!-- <div class="start-section">
      <div class="start-section-header">All <span class="show-all">View: Category</span></div>
      <div class="start-pinned">
        <div class="start-app"><img src="https://img.icons8.com/color/48/000000/microsoft-word-2019--v2.png" width="28" height="28"/><div class="start-app-label">Word</div></div>
        <div class="start-app"><img src="https://img.icons8.com/color/48/000000/microsoft-teams.png" width="28" height="28"/><div class="start-app-label">Teams</div></div>
        <div class="start-app"><img src="https://img.icons8.com/color/48/000000/adobe-illustrator.png" width="28" height="28"/><div class="start-app-label">Ai</div></div>
        <div class="start-app"><img src="https://img.icons8.com/color/48/000000/adobe-photoshop.png" width="28" height="28"/><div class="start-app-label">Ps</div></div>
        <div class="start-app"><img src="https://img.icons8.com/color/48/000000/xbox.png" width="28" height="28"/><div class="start-app-label">Xbox</div></div>
        <div class="start-app"><img src="https://img.icons8.com/color/48/000000/steam.png" width="28" height="28"/><div class="start-app-label">Steam</div></div>
      </div>
    </div> -->
    <div class="start-bottom-bar">
      <div class="start-user">
        <div class="start-user-avatar"></div>
        <div class="start-user-name">Pratik Das</div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div class="start-settings" title="Settings" style="cursor:pointer;display:flex;align-items:center;justify-content:center;">
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4C1 2.34315 2.34315 1 4 1C5.65685 1 7 2.34315 7 4V5H9V4C9 2.34315 10.3431 1 12 1C13.6569 1 15 2.34315 15 4C15 5.65685 13.6569 7 12 7H11V9H12C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12V11H7V12C7 13.6569 5.65685 15 4 15C2.34315 15 1 13.6569 1 12C1 10.3431 2.34315 9 4 9H5V7H4C2.34315 7 1 5.65685 1 4ZM5 5V4C5 3.44772 4.55228 3 4 3C3.44772 3 3 3.44772 3 4C3 4.55228 3.44772 5 4 5H5ZM7 7V9H9V7H7ZM5 11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13C4.55228 13 5 12.5523 5 12V11ZM11 11V12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11H11ZM11 5H12C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V5Z" fill="#000000"/>
          </svg>
        </div>
      </div>
    </div>
  `;
}

function toggleStartMenuWindow(e) {
  e.stopPropagation();
  if (startMenuWindow.classList.contains('open')) {
    startMenuWindow.classList.remove('open');
  } else {
    renderStartMenu();
    attachChromeAppHandler();
    startMenuWindow.classList.add('open');
  }
}

startButton.addEventListener('click', toggleStartMenuWindow);
document.addEventListener('click', function(e) {
  if (!startMenuWindow.contains(e.target) && e.target !== startButton) {
    startMenuWindow.classList.remove('open');
  }
});

// Loading screen logic (beginner-friendly)
// Only show the loading screen if not already loaded this session
if (!sessionStorage.getItem('osLoaded')) {
  const overlay = document.getElementById('loading-overlay');
  const progress = document.getElementById('loading-progress');
  overlay.style.display = 'flex';

  // Pick a random loading time between 5 and 7 seconds
  const loadTime = 5000 + Math.random() * 2000;
  let start = null;

  // Animate the progress bar
  function animateProgressBar(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const percent = Math.min((elapsed / loadTime) * 100, 100);
    progress.style.width = percent + '%';
    if (elapsed < loadTime) {
      requestAnimationFrame(animateProgressBar);
    } else {
      // Hide the overlay and set the session flag
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
        sessionStorage.setItem('osLoaded', '1');
      }, 400);
    }
  }
  requestAnimationFrame(animateProgressBar);
} else {
  // Hide overlay immediately if already loaded
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.style.display = 'none';
}

// Calendar popup logic
const calendarPopup = document.getElementById('calendar-popup');
const taskbarClock = document.getElementById('taskbar-clock');

// Track the currently displayed month and year
let calendarMonth = null;
let calendarYear = null;

function renderCalendar(month, year) {
  const now = new Date();
  // If no month/year provided, use current
  if (month === undefined || year === undefined) {
    month = now.getMonth();
    year = now.getFullYear();
  }
  calendarMonth = month;
  calendarYear = year;
  const today = now.getDate();
  const isCurrentMonth = (month === now.getMonth() && year === now.getFullYear());

  // Get first day of the month (0=Sun, 1=Mon, ...)
  const firstDay = new Date(year, month, 1).getDay();
  // Get number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Get number of days in previous month
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Weekday labels
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Full date at the top
  const fullDate = new Date(year, month, isCurrentMonth ? today : 1);
  const fullDateStr = fullDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  let html = `<div class="calendar-header-date">${fullDateStr}</div>`;

  // Month/year header with chevrons
  html += `<h4>
    <button class='calendar-nav-btn' id='calendar-prev' aria-label='Previous Month'>
      <svg width="18" height="18" viewBox="0 0 20 20"><polyline points="12,4 6,10 12,16" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <span>${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}</span>
    <button class='calendar-nav-btn' id='calendar-next' aria-label='Next Month'>
      <svg width="18" height="18" viewBox="0 0 20 20"><polyline points="8,4 14,10 8,16" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </h4>`;

  html += '<div id="calendar-grid">';
  // Add weekday headers
  for (let d = 0; d < 7; d++) {
    html += `<span class='weekday'>${weekdays[d]}</span>`;
  }
  // Add days from previous month
  for (let i = 0; i < firstDay; i++) {
    html += `<span class='other-month'>${prevMonthDays - firstDay + i + 1}</span>`;
  }
  // Add days of the current month
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = isCurrentMonth && d === today;
    html += `<span class='${isToday ? 'today' : ''}'>${d}</span>`;
  }
  // Add days from next month to fill the grid (if needed)
  const totalCells = firstDay + daysInMonth;
  const nextDays = (7 - (totalCells % 7)) % 7;
  for (let i = 1; i <= nextDays; i++) {
    html += `<span class='other-month'>${i}</span>`;
  }
  html += '</div>';
  calendarPopup.innerHTML = html;

  // Add event listeners for navigation
  document.getElementById('calendar-prev').onclick = function(e) {
    e.stopPropagation();
    let newMonth = calendarMonth - 1;
    let newYear = calendarYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    renderCalendar(newMonth, newYear);
  };
  document.getElementById('calendar-next').onclick = function(e) {
    e.stopPropagation();
    let newMonth = calendarMonth + 1;
    let newYear = calendarYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    renderCalendar(newMonth, newYear);
  };
}

function toggleCalendar() {
  if (calendarPopup.classList.contains('open')) {
    calendarPopup.classList.remove('open');
  } else {
    renderCalendar();
    calendarPopup.classList.add('open');
  }
}

taskbarClock.addEventListener('click', toggleCalendar);
calendarPopup.addEventListener('click', toggleCalendar);

// Widgets panel logic
const widgetsPanel = document.getElementById('widgets-panel');
const widgetsButton = document.getElementById('taskbar-widgets');

const weatherSideWindow = document.getElementById('weather-side-window');
const stocksSideWindow = document.getElementById('stocks-side-window');

function renderWeatherWindow({ temp, desc, location, city }) {
  weatherSideWindow.innerHTML = `
    <div class="weather-title">Weather</div>
    <div class="weather-info">
      <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"  xml:space="preserve">
        <style type="text/css">
          .st0{fill:#000000;}
        </style>
          <g>
            <path class="st0" d="M115.958,269.922c16.999-10.12,36.842-15.916,58.04-15.916c2.556,0,5.127,0.078,7.682,0.234
              c7.199-24.681,20.957-46.355,39.203-63.12c-3.49-39.437-36.562-70.32-76.879-70.32c-42.647,0-77.207,34.56-77.207,77.199
              C66.798,230.766,87.194,258.719,115.958,269.922z"/>
            <rect x="135.652" y="54.002" class="st0" width="16.696" height="45.911"/>
            <polygon class="st0" points="102.184,108.88 79.232,69.116 64.772,77.467 87.724,117.232  "/>
            <polygon class="st0" points="15.114,133.233 54.878,156.185 63.23,141.726 23.466,118.774  "/>
            <polygon class="st0" points="45.919,189.654 0,189.654 0,206.35 45.919,206.342  "/>
            <polygon class="st0" points="15.114,262.77 23.466,277.23 63.23,254.27 54.878,239.811  "/>
            <rect x="240.478" y="114.523" transform="matrix(0.4998 0.8661 -0.8661 0.4998 243.5358 -146.7501)" class="st0" width="16.694" height="45.913"/>
            <polygon class="st0" points="223.228,77.467 208.776,69.116 185.817,108.88 200.269,117.232  "/>
            <path class="st0" d="M431.997,298c-0.031,0-0.062,0.008-0.101,0.008c0.054-1.332,0.101-2.665,0.101-4.004
              C431.997,229.932,380.064,178,316,178c-60.012,0-109.382,45.575-115.388,104.006c-8.414-2.602-17.342-4.005-26.614-4.005
              C124.294,278.001,84,318.295,84,368c0,49.704,40.294,89.998,89.998,89.998h257.999c44.182,0,80.003-35.814,80.003-79.995
              C512,333.814,476.178,298,431.997,298z"/>
          </g>
        </svg>
      <div class="weather-temp">${temp}&deg;C</div>
      <div class="weather-desc">${desc}</div>
      <div class="weather-location">${location}</div>
      <div class="weather-city">${city ? city : ''}</div>
    </div>
  `;
}

function showWeatherLoading() {
  weatherSideWindow.innerHTML = `
    <div class="weather-title">Weather</div>
    <div class="weather-info">
      <div>Loading...</div>
    </div>
  `;
}

let weatherOpen = false;

function toggleWeatherWindow() {
  if (weatherSideWindow.classList.contains('open')) {
    weatherSideWindow.classList.remove('open');
    weatherOpen = false;
  } else {
    showWeatherLoading();
    weatherSideWindow.classList.add('open');
    weatherOpen = true;

    // Try to get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        // Use Open-Meteo API (no key required)
        try {
          const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
          const data = await resp.json();
          const temp = data.current_weather.temperature;
          const code = data.current_weather.weathercode;
          const desc = mapWeatherCode(code);
          // Fetch city name using reverse geocoding
          let city = '';
          try {
            const geoResp = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
            const geoData = await geoResp.json();
            city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.hamlet || geoData.address.state || '';
          } catch {}
          renderWeatherWindow({ temp, desc, location: `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`, city });
        } catch {
          renderWeatherWindow({ temp: '--', desc: 'Unable to fetch weather', location: 'Unknown', city: '' });
        }
      }, () => {
        renderWeatherWindow({ temp: '--', desc: 'Location denied', location: 'Unknown', city: '' });
      });
    } else {
      renderWeatherWindow({ temp: '--', desc: 'Geolocation not supported', location: 'Unknown', city: '' });
    }
  }
}

// Map Open-Meteo weather codes to descriptions
function mapWeatherCode(code) {
  const codes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Drizzle',
    55: 'Dense drizzle',
    56: 'Freezing drizzle',
    57: 'Freezing drizzle',
    61: 'Slight rain',
    63: 'Rain',
    65: 'Heavy rain',
    66: 'Freezing rain',
    67: 'Freezing rain',
    71: 'Slight snow',
    73: 'Snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm w/ hail',
    99: 'Thunderstorm w/ hail',
  };
  return codes[code] || 'Unknown';
}

// Close weather window when clicking outside
function handleWeatherWindowClose(e) {
  if (weatherSideWindow.classList.contains('open')) {
    if (!weatherSideWindow.contains(e.target) && !(e.target.closest('.widget-icon[title="Weather"]'))) {
      weatherSideWindow.classList.remove('open');
      weatherOpen = false;
    }
  }
}
document.addEventListener('click', handleWeatherWindowClose);

// Attach to weather icon after rendering widgets
function attachWeatherIconHandler() {
  const weatherIcon = document.querySelector('.widget-icon[title="Weather"]');
  if (weatherIcon) {
    weatherIcon.onclick = function(e) {
      e.stopPropagation();
      toggleWeatherWindow();
    };
  }
}

function renderStocksWindow() {
  // 4K wallpaper array
  const wallpapers = [
    'https://4kwallpapers.com/images/walls/thumbs_3t/22700.jpg',
    'https://4kwallpapers.com/images/walls/thumbs_3t/22626.jpg',
    'https://4kwallpapers.com/images/walls/thumbs_3t/14857.jpg',
    'https://4kwallpapers.com/images/walls/thumbs_3t/16059.jpg'
  ];
  stocksSideWindow.innerHTML = `
    <nav class="theme-btn-nav">
      <a href="#" class="active" data-theme="wall1">Wallpaper 1</a>
      <a href="#" data-theme="wall2">Wallpaper 2</a>
      <a href="#" data-theme="wall3">Wallpaper 3</a>
      <a href="#" data-theme="wall4">Wallpaper 4</a>
    </nav>
  `;
  // Add wallpaper change logic
  const themeBtns = stocksSideWindow.querySelectorAll('.theme-btn-nav a');
  themeBtns.forEach((btn, idx) => {
    btn.onclick = function(e) {
      e.preventDefault();
      document.getElementById('desktop').style.background = `var(--bg) url('${wallpapers[idx]}') center/cover no-repeat`;
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
  });
}

function toggleStocksWindow() {
  // Close weather window if open
  if (weatherSideWindow.classList.contains('open')) {
    weatherSideWindow.classList.remove('open');
  }
  if (stocksSideWindow.classList.contains('open')) {
    stocksSideWindow.classList.remove('open');
  } else {
    renderStocksWindow();
    stocksSideWindow.classList.add('open');
  }
}

// Attach to Stocks icon after rendering widgets
function attachStocksIconHandler() {
  const stocksIcon = document.querySelector('.widget-icon[title="Stocks"]');
  if (stocksIcon) {
    stocksIcon.onclick = function(e) {
      e.stopPropagation();
      toggleStocksWindow();
    };
  }
}

function renderWidgetsPanel() {
  widgetsPanel.innerHTML = `
    <div class="widgets-grid">
      <div class="widget-icon" title="Weather">
        <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"  xml:space="preserve">
        <style type="text/css">
          .st0{fill:#000000;}
        </style>
          <g>
            <path class="st0" d="M115.958,269.922c16.999-10.12,36.842-15.916,58.04-15.916c2.556,0,5.127,0.078,7.682,0.234
              c7.199-24.681,20.957-46.355,39.203-63.12c-3.49-39.437-36.562-70.32-76.879-70.32c-42.647,0-77.207,34.56-77.207,77.199
              C66.798,230.766,87.194,258.719,115.958,269.922z"/>
            <rect x="135.652" y="54.002" class="st0" width="16.696" height="45.911"/>
            <polygon class="st0" points="102.184,108.88 79.232,69.116 64.772,77.467 87.724,117.232  "/>
            <polygon class="st0" points="15.114,133.233 54.878,156.185 63.23,141.726 23.466,118.774  "/>
            <polygon class="st0" points="45.919,189.654 0,189.654 0,206.35 45.919,206.342  "/>
            <polygon class="st0" points="15.114,262.77 23.466,277.23 63.23,254.27 54.878,239.811  "/>
            <rect x="240.478" y="114.523" transform="matrix(0.4998 0.8661 -0.8661 0.4998 243.5358 -146.7501)" class="st0" width="16.694" height="45.913"/>
            <polygon class="st0" points="223.228,77.467 208.776,69.116 185.817,108.88 200.269,117.232  "/>
            <path class="st0" d="M431.997,298c-0.031,0-0.062,0.008-0.101,0.008c0.054-1.332,0.101-2.665,0.101-4.004
              C431.997,229.932,380.064,178,316,178c-60.012,0-109.382,45.575-115.388,104.006c-8.414-2.602-17.342-4.005-26.614-4.005
              C124.294,278.001,84,318.295,84,368c0,49.704,40.294,89.998,89.998,89.998h257.999c44.182,0,80.003-35.814,80.003-79.995
              C512,333.814,476.178,298,431.997,298z"/>
          </g>
        </svg>
      </div>
      <div class="widget-icon" title="Spotify">
        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>spotify</title>
        <path d="M24.849 14.35c-3.206-1.616-6.988-2.563-10.991-2.563-2.278 0-4.484 0.306-6.58 0.881l0.174-0.041c-0.123 0.040-0.265 0.063-0.412 0.063-0.76 0-1.377-0.616-1.377-1.377 0-0.613 0.401-1.132 0.954-1.311l0.010-0.003c5.323-1.575 14.096-1.275 19.646 2.026 0.426 0.258 0.706 0.719 0.706 1.245 0 0.259-0.068 0.502-0.186 0.712l0.004-0.007c-0.29 0.345-0.721 0.563-1.204 0.563-0.273 0-0.529-0.070-0.752-0.192l0.008 0.004zM24.699 18.549c-0.201 0.332-0.561 0.55-0.971 0.55-0.225 0-0.434-0.065-0.61-0.178l0.005 0.003c-2.739-1.567-6.021-2.49-9.518-2.49-1.925 0-3.784 0.28-5.539 0.801l0.137-0.035c-0.101 0.032-0.217 0.051-0.337 0.051-0.629 0-1.139-0.51-1.139-1.139 0-0.509 0.333-0.939 0.793-1.086l0.008-0.002c1.804-0.535 3.878-0.843 6.023-0.843 3.989 0 7.73 1.064 10.953 2.925l-0.106-0.056c0.297 0.191 0.491 0.52 0.491 0.894 0 0.227-0.071 0.437-0.192 0.609l0.002-0.003zM22.899 22.673c-0.157 0.272-0.446 0.452-0.777 0.452-0.186 0-0.359-0.057-0.502-0.154l0.003 0.002c-2.393-1.346-5.254-2.139-8.299-2.139-1.746 0-3.432 0.261-5.020 0.745l0.122-0.032c-0.067 0.017-0.145 0.028-0.224 0.028-0.512 0-0.927-0.415-0.927-0.927 0-0.432 0.296-0.795 0.696-0.898l0.006-0.001c1.581-0.47 3.397-0.74 5.276-0.74 3.402 0 6.596 0.886 9.366 2.44l-0.097-0.050c0.302 0.15 0.506 0.456 0.506 0.809 0 0.172-0.048 0.333-0.132 0.469l0.002-0.004zM16 1.004c0 0 0 0-0 0-8.282 0-14.996 6.714-14.996 14.996s6.714 14.996 14.996 14.996c8.282 0 14.996-6.714 14.996-14.996v0c-0.025-8.272-6.724-14.971-14.993-14.996h-0.002z"></path>
        </svg>
      </div>
      <div class="widget-icon" title="Stocks">
        <svg width="800px" height="800px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">

<g clip-path="url(#a)">

<path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M96 22v30m24-30v36m-42 76v24a11.998 11.998 0 0 0 12 12h12c3.183 0 6.235-1.264 8.485-3.515A11.996 11.996 0 0 0 114 158v-24M48 96v20a11.998 11.998 0 0 0 12 12h72c3.183 0 6.235-1.264 8.485-3.515A11.996 11.996 0 0 0 144 116V96.149L48 96Zm0 0V46a24 24 0 0 1 24-24h72v74H48Z"/>

</g>

<defs>

<clipPath id="a">

<path fill="#ffffff" d="M0 0h192v192H0z"/>

</clipPath>

</defs>

</svg>
      </div>
      <div class="widget-icon" title="News">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="16" height="12" rx="3" fill="#00c3a6"/><rect x="7" y="9" width="10" height="2" fill="#fff"/><rect x="7" y="13" width="6" height="2" fill="#fff"/></svg>
      </div>
    </div>
  `;
  setTimeout(attachWeatherIconHandler, 0);
  setTimeout(attachSpotifyIconHandler, 0);
  setTimeout(attachStocksIconHandler, 0);
}

function toggleWidgetsPanel(e) {
  e.stopPropagation();
  if (widgetsPanel.classList.contains('open')) {
    widgetsPanel.classList.remove('open');
  } else {
    renderWidgetsPanel();
    widgetsPanel.classList.add('open');
  }
}

widgetsButton.addEventListener('click', toggleWidgetsPanel);
document.addEventListener('click', function(e) {
  if (!widgetsPanel.contains(e.target) && e.target !== widgetsButton) {
    widgetsPanel.classList.remove('open');
  }
});

// Desktop icon drag and drop functionality
function initializeDesktopIcons() {
  const myComputerIcon = document.getElementById('my-computer-icon');
  
  if (!myComputerIcon) return;

  // Load saved position from localStorage
  const savedPosition = localStorage.getItem('my-computer-icon-position');
  if (savedPosition) {
    try {
      const { x, y } = JSON.parse(savedPosition);
      if (x && y) {
        myComputerIcon.style.left = x;
        myComputerIcon.style.top = y;
      }
    } catch (e) {
      console.error("Failed to parse saved icon position:", e);
      // If parsing fails, remove the corrupt data
      localStorage.removeItem('my-computer-icon-position');
    }
  }

  let isDragging = false;
  let startX, startY;
  let originalLeft, originalTop;

  function dragStart(e) {
    e.preventDefault();
    
    // Get the current position of the icon
    const rect = myComputerIcon.getBoundingClientRect();
    originalLeft = rect.left;
    originalTop = rect.top;
    
    // Get the mouse/touch position
    if (e.type === "touchstart") {
      startX = e.touches[0].clientX - originalLeft;
      startY = e.touches[0].clientY - originalTop;
    } else {
      startX = e.clientX - originalLeft;
      startY = e.clientY - originalTop;
    }

    isDragging = true;
    myComputerIcon.classList.add('dragging');
  }

  function dragEnd(e) {
    if (!isDragging) return;
    
    isDragging = false;
    myComputerIcon.classList.remove('dragging');
    
    // Calculate final position
    let finalX, finalY;
    if (e.type === "touchend") {
      finalX = e.changedTouches[0].clientX - startX;
      finalY = e.changedTouches[0].clientY - startY;
    } else {
      finalX = e.clientX - startX;
      finalY = e.clientY - startY;
    }
    
    const finalPosition = {
        x: finalX + 'px',
        y: finalY + 'px'
    };
    
    // Set the final position
    myComputerIcon.style.left = finalPosition.x;
    myComputerIcon.style.top = finalPosition.y;
    myComputerIcon.style.transform = 'none'; // Remove any transform

    // Save the position to localStorage
    try {
      localStorage.setItem('my-computer-icon-position', JSON.stringify(finalPosition));
    } catch (e) {
      console.error("Failed to save icon position:", e);
    }
  }

  function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    
    let currentX, currentY;
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - startX;
      currentY = e.touches[0].clientY - startY;
    } else {
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
    }

    // Update position during drag
    myComputerIcon.style.left = currentX + 'px';
    myComputerIcon.style.top = currentY + 'px';
  }

  // Mouse events
  myComputerIcon.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);

  // Touch events for mobile
  myComputerIcon.addEventListener('touchstart', dragStart, { passive: false });
  document.addEventListener('touchmove', drag, { passive: false });
  document.addEventListener('touchend', dragEnd);

  // Double click to open (placeholder for future functionality)
  myComputerIcon.addEventListener('dblclick', function(e) {
    e.preventDefault();
    openAppStoreWindow();
  });
}

// Initialize desktop icons when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is on mobile device
  checkMobileDevice();
  
  // Loading screen logic (moved inside DOMContentLoaded for better deployment compatibility)
  if (!sessionStorage.getItem('osLoaded')) {
    const overlay = document.getElementById('loading-overlay');
    const progress = document.getElementById('loading-progress');
    
    if (overlay && progress) {
      overlay.style.display = 'flex';

      // Pick a random loading time between 5 and 7 seconds
      const loadTime = 5000 + Math.random() * 2000;
      let start = null;

      // Animate the progress bar
      function animateProgressBar(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const percent = Math.min((elapsed / loadTime) * 100, 100);
        progress.style.width = percent + '%';
        if (elapsed < loadTime) {
          requestAnimationFrame(animateProgressBar);
        } else {
          // Hide the overlay and set the session flag
          overlay.style.opacity = '0';
          setTimeout(() => {
            overlay.style.display = 'none';
            try {
              sessionStorage.setItem('osLoaded', '1');
            } catch (e) {
              console.warn('SessionStorage not available:', e);
            }
          }, 400);
        }
      }
      requestAnimationFrame(animateProgressBar);
    } else {
      console.warn('Loading overlay elements not found');
      // Fallback: hide overlay if elements don't exist
      if (overlay) overlay.style.display = 'none';
    }
  } else {
    // Hide overlay immediately if already loaded
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'none';
  }
  
  initializeDesktopIcons();
  initializeAppWindow();
  attachChromeAppHandler();
  attachNotepadAppHandler();
});

// Mobile device detection function
function checkMobileDevice() {
  const mobileOverlay = document.getElementById('mobile-overlay');
  const loadingOverlay = document.getElementById('loading-overlay');
  
  // Check for mobile device using multiple methods
  const isMobile = (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768 ||
    window.innerHeight <= 768 ||
    ('ontouchstart' in window && window.innerWidth <= 1024)
  );
  
  if (isMobile && mobileOverlay) {
    // Hide loading overlay and show mobile overlay
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
    }
    mobileOverlay.style.display = 'flex';
    
    // Prevent any desktop interactions
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    
    console.log('Cube OS: Mobile device detected. Desktop experience required.');
  } else {
    // Hide mobile overlay on desktop
    if (mobileOverlay) {
      mobileOverlay.style.display = 'none';
    }
  }
}

// Initialize Chrome desktop icon
function initializeChromeDesktopIcon() {
  const chromeIcon = document.getElementById('chrome-icon');
  
  if (!chromeIcon) return;

  // Load saved position from localStorage
  const savedPosition = localStorage.getItem('chrome-icon-position');
  if (savedPosition) {
    try {
      const { x, y } = JSON.parse(savedPosition);
      if (x && y) {
        chromeIcon.style.left = x;
        chromeIcon.style.top = y;
      }
    } catch (e) {
      console.error("Failed to parse saved Chrome icon position:", e);
      localStorage.removeItem('chrome-icon-position');
    }
  }

  let isDragging = false;
  let startX, startY;
  let originalLeft, originalTop;

  function dragStart(e) {
    e.preventDefault();
    
    // Get the current position of the icon
    const rect = chromeIcon.getBoundingClientRect();
    originalLeft = rect.left;
    originalTop = rect.top;
    
    // Get the mouse/touch position
    if (e.type === "touchstart") {
      startX = e.touches[0].clientX - originalLeft;
      startY = e.touches[0].clientY - originalTop;
    } else {
      startX = e.clientX - originalLeft;
      startY = e.clientY - originalTop;
    }

    isDragging = true;
    chromeIcon.classList.add('dragging');
  }

  function dragEnd(e) {
    if (!isDragging) return;
    
    isDragging = false;
    chromeIcon.classList.remove('dragging');
    
    // Calculate final position
    let finalX, finalY;
    if (e.type === "touchend") {
      finalX = e.changedTouches[0].clientX - startX;
      finalY = e.changedTouches[0].clientY - startY;
    } else {
      finalX = e.clientX - startX;
      finalY = e.clientY - startY;
    }
    
    const finalPosition = {
        x: finalX + 'px',
        y: finalY + 'px'
    };
    
    // Set the final position
    chromeIcon.style.left = finalPosition.x;
    chromeIcon.style.top = finalPosition.y;
    chromeIcon.style.transform = 'none'; // Remove any transform

    // Save the position to localStorage
    try {
      localStorage.setItem('chrome-icon-position', JSON.stringify(finalPosition));
    } catch (e) {
      console.error("Failed to save Chrome icon position:", e);
    }
  }

  function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    
    let currentX, currentY;
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - startX;
      currentY = e.touches[0].clientY - startY;
    } else {
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
    }

    // Update position during drag
    chromeIcon.style.left = currentX + 'px';
    chromeIcon.style.top = currentY + 'px';
  }

  // Mouse events
  chromeIcon.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);

  // Touch events for mobile
  chromeIcon.addEventListener('touchstart', dragStart, { passive: false });
  document.addEventListener('touchmove', drag, { passive: false });
  document.addEventListener('touchend', dragEnd);

  // Double click to open Chrome window
  chromeIcon.addEventListener('dblclick', function(e) {
    e.preventDefault();
    createChromeSearchWindow();
  });
}

// Window State Manager
const windowManager = {
    _windows: {},
    _zIndexCounter: 8000,
    
    register: function(id, el) {
        this._windows[id] = {
            el: el,
            isMinimized: false,
            isMaximized: false,
            previousState: {}, // For storing dimensions before maximizing
        };
        el.style.zIndex = this._zIndexCounter;
    },

    get: function(id) {
        return this._windows[id];
    },

    bringToFront: function(id) {
        const window = this.get(id);
        if (window && window.el) {
            this._zIndexCounter++;
            window.el.style.zIndex = this._zIndexCounter;
        }
    }
};

function getTaskbarHeight() {
    const taskbar = document.getElementById('taskbar');
    return taskbar ? taskbar.offsetHeight : 40;
}

function toggleMaximizeWindow(id) {
    const windowState = windowManager.get(id);
    if (!windowState) return;

    const windowEl = windowState.el;
    const headerEl = windowEl.querySelector('.window-header');
    const windowBody = windowEl.querySelector('.window-body');

    if (windowState.isMaximized) {
        // Restore to previous state
        windowEl.style.width = windowState.previousState.width;
        windowEl.style.height = windowState.previousState.height;
        windowEl.style.top = windowState.previousState.top;
        windowEl.style.left = windowState.previousState.left;
        if (windowBody) {
            windowBody.style.height = '';
        }

        windowEl.classList.remove('maximized');
        windowState.isMaximized = false;
        if(headerEl) headerEl.style.cursor = 'move';
    } else {
        // Store current state before maximizing
        const rect = windowEl.getBoundingClientRect();
        windowState.previousState = {
            width: rect.width + 'px',
            height: rect.height + 'px',
            top: rect.top + 'px',
            left: rect.left + 'px',
        };

        // If window is centered, convert to absolute position first
        if (!windowEl.classList.contains('moved')) {
            windowEl.style.left = `${rect.left}px`;
            windowEl.style.top = `${rect.top}px`;
            windowEl.classList.add('moved');
        }

        // Defer the maximization to allow the 'moved' class to apply
        setTimeout(() => {
            windowEl.style.width = '100vw';
            windowEl.style.height = `calc(100vh - 65px)`;
            windowEl.style.top = '0';
            windowEl.style.left = '0';
            if (windowBody) {
                windowBody.style.height = '94%';
            }

            windowEl.classList.add('maximized');
            windowState.isMaximized = true;
            if(headerEl) headerEl.style.cursor = 'default';
        }, 10);
    }
}

function initializeAppWindow() {
    const windowEl = document.getElementById('app-store-window');
    if (!windowEl) return;

    windowManager.register('app-store', windowEl);

    const headerEl = windowEl.querySelector('.window-header');
    const closeBtn = document.getElementById('app-window-close');
    const minimizeBtn = document.getElementById('app-window-minimize');
    const maximizeBtn = document.getElementById('app-window-maximize');
    const resizeHandle = windowEl.querySelector('.resize-handle-se');

    closeBtn.addEventListener('click', closeAppStoreWindow);
    
    // Green button - toggle maximize
    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', () => toggleMaximizeWindow('app-store'));
    }

    // Yellow button - minimize action
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => minimizeWindow('app-store'));
    }

    // --- Dragging Logic ---
    let isDragging = false;
    let offsetX, offsetY;
    let pendingUnmaximize = false;
    let startX, startY;
    const dragStart = (e) => {
        const windowState = windowManager.get('app-store');
        if (e.target.classList.contains('light')) return;

        if (windowState && windowState.isMaximized) {
            pendingUnmaximize = true;
            // Store initial mouse position
            startX = e.clientX || (e.touches && e.touches[0].clientX);
            startY = e.clientY || (e.touches && e.touches[0].clientY);
        } else {
            pendingUnmaximize = false;
        }

        windowManager.bringToFront('app-store');
        if (!windowEl.classList.contains('moved')) {
            const rect = windowEl.getBoundingClientRect();
            windowEl.style.left = `${rect.left}px`;
            windowEl.style.top = `${rect.top}px`;
            windowEl.classList.add('moved');
        }
        windowEl.style.transition = 'none';
        isDragging = true;
        offsetX = (e.clientX || (e.touches && e.touches[0].clientX)) - windowEl.offsetLeft;
        offsetY = (e.clientY || (e.touches && e.touches[0].clientY)) - windowEl.offsetTop;
        document.addEventListener('mousemove', dragMove, { passive: false });
        document.addEventListener('touchmove', dragMove, { passive: false });
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
    };
    const dragMove = (e) => {
        if (!isDragging) return;
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        if (pendingUnmaximize) {
            // Only unmaximize if mouse moved more than a threshold (e.g., 5px)
            if (Math.abs(clientX - startX) > 5 || Math.abs(clientY - startY) > 5) {
                const windowState = windowManager.get('app-store');
                if (windowState && windowState.isMaximized) {
                    windowState.isMaximized = false;
                    windowEl.classList.remove('maximized');
                    if (headerEl) headerEl.style.cursor = 'move';
                }
                pendingUnmaximize = false;
            } else {
                return; // Don't move window until unmaximized
            }
        }
        e.preventDefault();
        windowEl.style.left = `${clientX - offsetX}px`;
        windowEl.style.top = `${clientY - offsetY}px`;
    };
    const dragEnd = () => {
        windowEl.style.transition = '';
        isDragging = false;
        pendingUnmaximize = false;
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('touchmove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchend', dragEnd);
    };
    if (headerEl) {
        headerEl.addEventListener('mousedown', dragStart);
        headerEl.addEventListener('touchstart', dragStart, { passive: false });
        headerEl.addEventListener('dblclick', () => toggleMaximizeWindow('app-store'));
    }

    // --- Resizing Logic ---
    let isResizing = false;
    let originalWidth, originalHeight, originalX, originalY;

    const resizeStart = (e) => {
        const windowState = windowManager.get('app-store');
        if (windowState && windowState.isMaximized) return;

        e.preventDefault();
        isResizing = true;
        originalWidth = parseFloat(getComputedStyle(windowEl, null).getPropertyValue('width').replace('px', ''));
        originalHeight = parseFloat(getComputedStyle(windowEl, null).getPropertyValue('height').replace('px', ''));
        originalX = e.clientX || e.touches[0].clientX;
        originalY = e.clientY || e.touches[0].clientY;
        windowEl.style.transition = 'none';
        document.addEventListener('mousemove', resizeMove);
        document.addEventListener('touchmove', resizeMove);
        document.addEventListener('mouseup', resizeEnd);
        document.addEventListener('touchend', resizeEnd);
    };

    const resizeMove = (e) => {
        if (isResizing) {
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            const width = originalWidth + (clientX - originalX);
            const height = originalHeight + (clientY - originalY);
            if (width > 300) {
                windowEl.style.width = width + 'px';
            }
            if (height > 200) {
                windowEl.style.height = height + 'px';
            }
        }
    };

    const resizeEnd = () => {
        isResizing = false;
        windowEl.style.transition = '';
        document.removeEventListener('mousemove', resizeMove);
        document.removeEventListener('touchmove', resizeMove);
        document.removeEventListener('mouseup', resizeEnd);
        document.removeEventListener('touchend', resizeEnd);
    };

    if (resizeHandle) {
        resizeHandle.addEventListener('mousedown', resizeStart);
        resizeHandle.addEventListener('touchstart', resizeStart, { passive: false });
    }
}

function minimizeWindow(id) {
    const windowState = windowManager.get(id);
    if (!windowState || windowState.isMinimized) return;

    const taskbarIcon = createTaskbarIcon(id);
    const windowEl = windowState.el;

    requestAnimationFrame(() => {
        const windowRect = windowEl.getBoundingClientRect();
        const iconRect = taskbarIcon.getBoundingClientRect();

        const scaleX = iconRect.width / windowRect.width;
        const scaleY = iconRect.height / windowRect.height;
        
        // This calculation now works for both centered and dragged windows
        const translateX = iconRect.left - windowRect.left;
        const translateY = iconRect.top - windowRect.top;
        
        windowEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
        windowEl.classList.add('minimized');
        windowEl.classList.remove('open');

        windowEl.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'transform') {
                windowEl.style.display = 'none';
            }
        }, { once: true });
        
        windowState.isMinimized = true;
    });
}

function restoreWindow(id) {
    const windowState = windowManager.get(id);
    if (!windowState || !windowState.isMinimized) return;

    const windowEl = windowState.el;
    
    windowManager.bringToFront(id);
    windowEl.style.display = 'block';
    
    setTimeout(() => {
        windowEl.style.transform = '';
        windowEl.classList.remove('minimized');
        windowEl.classList.add('open');
    }, 10);

    const taskbarIcon = document.getElementById(`taskbar-icon-${id}`);
    if (taskbarIcon) taskbarIcon.remove();
    
    windowState.isMinimized = false;
}

function openAppStoreWindow() {
    const windowState = windowManager.get('app-store');
    if (!windowState) return;

    if (windowState.isMinimized) {
        restoreWindow('app-store');
    } else {
        const windowEl = windowState.el;
        windowEl.style.display = 'block';
        windowManager.bringToFront('app-store');
        setTimeout(() => {
            windowEl.classList.add('open');
        }, 10);
    }
}

function closeAppStoreWindow() {
    const windowState = windowManager.get('app-store');
    if (windowState) {
        const windowEl = windowState.el;
        
        windowEl.classList.remove('open', 'minimized', 'moved');
        windowEl.style.left = '';
        windowEl.style.top = '';
        
        // The 'open' class is removed, so the exit animation (scale down) will play
        setTimeout(() => {
            windowEl.style.display = 'none';
        }, 400);
        
        const taskbarIcon = document.getElementById('taskbar-icon-app-store');
        if (taskbarIcon) taskbarIcon.remove();
        windowState.isMinimized = false;
    }
}

// Taskbar Icon SVG Mapping Function
function getTaskbarIconSVG(windowId) {
  // Define the mapping of window IDs to SVG file names
  const iconMapping = {
    // Notepad window
    'notepad': 'notepad-svg.svg',
    
    // Chrome window
    'chrome-search': 'chrome-svg.svg',
    
    // Spotify window
    'spotify-player-window': 'spotify-svg.svg',
    
    // App Store window
    'app-store': 'apps-large-solid-svg.svg',
    
    // Weather window
    'weather-side-window': 'weather-2-svg.svg',
    
    // Stocks/Theme Settings window
    'stocks-side-window': 'settings-svg.svg',
    
    // Widgets panel
    'widgets-panel': 'widgets-svg.svg',
    
    // Folder windows (dynamic)
    'folder-window': 'folder-svg.svg',
    
    // Default fallback
    'default': 'desktop-svg.svg'
  };

  // Determine which icon to use based on window ID
  let iconFile = iconMapping.default;
  
  if (windowId === 'notepad') {
    iconFile = iconMapping.notepad;
  } else if (windowId === 'chrome-search') {
    iconFile = iconMapping['chrome-search'];
  } else if (windowId === 'spotify-player-window') {
    iconFile = iconMapping['spotify-player-window'];
  } else if (windowId === 'app-store') {
    iconFile = iconMapping['app-store'];
  } else if (windowId === 'weather-side-window') {
    iconFile = iconMapping['weather-side-window'];
  } else if (windowId === 'stocks-side-window') {
    iconFile = iconMapping['stocks-side-window'];
  } else if (windowId === 'widgets-panel') {
    iconFile = iconMapping['widgets-panel'];
  } else if (windowId.startsWith('folder-window-')) {
    iconFile = iconMapping['folder-window'];
  }

  // Return the appropriate SVG content based on the icon file
  switch (iconFile) {
    case 'notepad-svg.svg':
      return `<svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect x="9" y="17" width="14" height="2" fill="white"/>
        <rect x="9" y="21" width="14" height="2" fill="white"/>
        <rect x="9" y="13" width="14" height="2" fill="white"/>
        <path d="M23 4V2h-2v2h-4V2h-2v2h-4V2H9v2H4v26h24V4H23zM26 28H6V6h3v2h2V6h4v2h2V6h4v2h2V6h3V28z" fill="white"/>
      </svg>`;
      
    case 'chrome-svg.svg':
      return `<svg width="24" height="24" viewBox="0 0 305 305" xmlns="http://www.w3.org/2000/svg">
        <g fill="white">
          <path d="M95.506,152.511c0,31.426,25.567,56.991,56.994,56.991c31.425,0,56.99-25.566,56.99-56.991
            c0-31.426-25.565-56.993-56.99-56.993C121.073,95.518,95.506,121.085,95.506,152.511z"/>
          <path d="M283.733,77.281c0.444-0.781,0.436-1.74-0.023-2.513c-13.275-22.358-32.167-41.086-54.633-54.159
            C205.922,7.134,179.441,0.012,152.5,0.012c-46.625,0-90.077,20.924-119.215,57.407c-0.643,0.804-0.727,1.919-0.212,2.81
            l42.93,74.355c0.45,0.78,1.28,1.25,2.164,1.25c0.112,0,0.226-0.008,0.339-0.023c1.006-0.137,1.829-0.869,2.083-1.852
            c8.465-32.799,38.036-55.706,71.911-55.706c2.102,0,4.273,0.096,6.455,0.282c0.071,0.007,0.143,0.01,0.214,0.01H281.56
            C282.459,78.545,283.289,78.063,283.733,77.281z"/>
          <path d="M175.035,224.936c-0.621-0.803-1.663-1.148-2.646-0.876c-6.457,1.798-13.148,2.709-19.889,2.709
            c-28.641,0-55.038-16.798-67.251-42.794c-0.03-0.064-0.063-0.126-0.098-0.188L23.911,77.719c-0.446-0.775-1.272-1.25-2.165-1.25
            c-0.004,0-0.009,0-0.013,0c-0.898,0.005-1.725,0.49-2.165,1.272C6.767,100.456,0,126.311,0,152.511
            c0,36.755,13.26,72.258,37.337,99.969c23.838,27.435,56.656,45.49,92.411,50.84c0.124,0.019,0.248,0.027,0.371,0.027
            c0.883,0,1.713-0.47,2.164-1.25l42.941-74.378C175.732,226.839,175.657,225.739,175.035,224.936z"/>
          <path d="M292.175,95.226h-85.974c-1.016,0-1.931,0.615-2.314,1.555c-0.384,0.94-0.161,2.02,0.564,2.73
            c14.385,14.102,22.307,32.924,22.307,53c0,15.198-4.586,29.824-13.263,42.298c-0.04,0.058-0.077,0.117-0.112,0.178l-61.346,106.252
            c-0.449,0.778-0.446,1.737,0.007,2.513c0.449,0.767,1.271,1.237,2.158,1.237c0.009,0,0.019,0,0.028,0
            c40.37-0.45,78.253-16.511,106.669-45.222C289.338,231.032,305,192.941,305,152.511c0-19.217-3.532-37.956-10.498-55.698
            C294.126,95.855,293.203,95.226,292.175,95.226z"/>
        </g>
      </svg>`;
      
    case 'spotify-svg.svg':
      return `<svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.849 14.35c-3.206-1.616-6.988-2.563-10.991-2.563-2.278 0-4.484 0.306-6.58 0.881l0.174-0.041c-0.123 0.040-0.265 0.063-0.412 0.063-0.76 0-1.377-0.616-1.377-1.377 0-0.613 0.401-1.132 0.954-1.311l0.010-0.003c5.323-1.575 14.096-1.275 19.646 2.026 0.426 0.258 0.706 0.719 0.706 1.245 0 0.259-0.068 0.502-0.186 0.712l0.004-0.007c-0.29 0.345-0.721 0.563-1.204 0.563-0.273 0-0.529-0.070-0.752-0.192l0.008 0.004zM24.699 18.549c-0.201 0.332-0.561 0.55-0.971 0.55-0.225 0-0.434-0.065-0.61-0.178l0.005 0.003c-2.739-1.567-6.021-2.49-9.518-2.49-1.925 0-3.784 0.28-5.539 0.801l0.137-0.035c-0.101 0.032-0.217 0.051-0.337 0.051-0.629 0-1.139-0.51-1.139-1.139 0-0.509 0.333-0.939 0.793-1.086l0.008-0.002c1.804-0.535 3.878-0.843 6.023-0.843 3.989 0 7.73 1.064 10.953 2.925l-0.106-0.056c0.297 0.191 0.491 0.52 0.491 0.894 0 0.227-0.071 0.437-0.192 0.609l0.002-0.003zM22.899 22.673c-0.157 0.272-0.446 0.452-0.777 0.452-0.186 0-0.359-0.057-0.502-0.154l0.003 0.002c-2.393-1.346-5.254-2.139-8.299-2.139-1.746 0-3.432 0.261-5.020 0.745l0.122-0.032c-0.067 0.017-0.145 0.028-0.224 0.028-0.512 0-0.927-0.415-0.927-0.927 0-0.432 0.296-0.795 0.696-0.898l0.006-0.001c1.581-0.47 3.397-0.74 5.276-0.74 3.402 0 6.596 0.886 9.366 2.44l-0.097-0.050c0.302 0.15 0.506 0.456 0.506 0.809 0 0.172-0.048 0.333-0.132 0.469l0.002-0.004zM16 1.004c0 0 0 0-0 0-8.282 0-14.996 6.714-14.996 14.996s6.714 14.996 14.996 14.996c8.282 0 14.996-6.714 14.996-14.996v0c-0.025-8.272-6.724-14.971-14.993-14.996h-0.002z" fill="white"/>
      </svg>`;
      
    case 'apps-large-solid-svg.svg':
      return `<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <g fill="white">
          <rect x="1" y="1" width="4" height="4" rx="1"/>
          <rect x="7" y="1" width="4" height="4" rx="1"/>
          <rect x="13" y="1" width="2" height="4" rx="1"/>
          <rect x="1" y="7" width="4" height="4" rx="1"/>
          <rect x="7" y="7" width="4" height="4" rx="1"/>
          <rect x="13" y="7" width="2" height="4" rx="1"/>
          <rect x="1" y="13" width="4" height="2" rx="1"/>
          <rect x="7" y="13" width="4" height="2" rx="1"/>
          <rect x="13" y="13" width="2" height="2" rx="1"/>
        </g>
      </svg>`;
      
    case 'weather-2-svg.svg':
      return `<svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <g fill="white">
          <path d="M115.958,269.922c16.999-10.12,36.842-15.916,58.04-15.916c2.556,0,5.127,0.078,7.682,0.234
            c7.199-24.681,20.957-46.355,39.203-63.12c-3.49-39.437-36.562-70.32-76.879-70.32c-42.647,0-77.207,34.56-77.207,77.199
            C66.798,230.766,87.194,258.719,115.958,269.922z"/>
          <rect x="135.652" y="54.002" width="16.696" height="45.911"/>
          <polygon points="102.184,108.88 79.232,69.116 64.772,77.467 87.724,117.232"/>
          <polygon points="15.114,133.233 54.878,156.185 63.23,141.726 23.466,118.774"/>
          <polygon points="45.919,189.654 0,189.654 0,206.35 45.919,206.342"/>
          <polygon points="15.114,262.77 23.466,277.23 63.23,254.27 54.878,239.811"/>
          <rect x="240.478" y="114.523" transform="matrix(0.4998 0.8661 -0.8661 0.4998 243.5358 -146.7501)" width="16.694" height="45.913"/>
          <polygon points="223.228,77.467 208.776,69.116 185.817,108.88 200.269,117.232"/>
          <path d="M431.997,298c-0.031,0-0.062,0.008-0.101,0.008c0.054-1.332,0.101-2.665,0.101-4.004
            C431.997,229.932,380.064,178,316,178c-60.012,0-109.382,45.575-115.388,104.006c-8.414-2.602-17.342-4.005-26.614-4.005
            C124.294,278.001,84,318.295,84,368c0,49.704,40.294,89.998,89.998,89.998h257.999c44.182,0,80.003-35.814,80.003-79.995
            C512,333.814,476.178,298,431.997,298z"/>
        </g>
      </svg>`;
      
    case 'settings-svg.svg':
      return `<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4C1 2.34315 2.34315 1 4 1C5.65685 1 7 2.34315 7 4V5H9V4C9 2.34315 10.3431 1 12 1C13.6569 1 15 2.34315 15 4C15 5.65685 13.6569 7 12 7H11V9H12C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12V11H7V12C7 13.6569 5.65685 15 4 15C2.34315 15 1 13.6569 1 12C1 10.3431 2.34315 9 4 9H5V7H4C2.34315 7 1 5.65685 1 4ZM5 5V4C5 3.44772 4.55228 3 4 3C3.44772 3 3 3.44772 3 4C3 4.55228 3.44772 5 4 5H5ZM7 7V9H9V7H7ZM5 11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13C4.55228 13 5 12.5523 5 12V11ZM11 11V12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11H11ZM11 5H12C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V5Z" fill="white"/>
      </svg>`;
      
    case 'widgets-svg.svg':
      return `<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <g fill="white">
          <rect x="1" y="1" width="6" height="6" rx="1"/>
          <rect x="9" y="1" width="6" height="6" rx="1"/>
          <rect x="1" y="9" width="6" height="6" rx="1"/>
          <rect x="9" y="9" width="6" height="6" rx="1"/>
        </g>
      </svg>`;
      
    case 'folder-svg.svg':
      return `<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 1H6L9 4H16V14H0V1Z" fill="white"/>
      </svg>`;
      
    default:
      return `<svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <path d="m0 0h32v32h-32z"/>
          <path d="m32 3v22h-12v3h4v2h-16v-2h4v-3h-12v-22zm-14 25v-3h-4v3z" fill="white"/>
        </g>
      </svg>`;
  }
}

function createTaskbarIcon(id) {
    const taskbarWindowsContainer = document.getElementById('taskbar-windows');
    // Remove if one already exists for some reason
    const existingIcon = document.getElementById(`taskbar-icon-${id}`);
    if (existingIcon) existingIcon.remove();
    
    const taskbarIcon = document.createElement('div');
    taskbarIcon.id = `taskbar-icon-${id}`;
    taskbarIcon.className = 'taskbar-app-icon';
    
    // Get the appropriate title based on window ID
    let title = "Application";
    if (id === 'notepad') {
      title = "Notepad";
    } else if (id === 'chrome-search') {
      title = "Chrome";
    } else if (id === 'spotify-player-window') {
      title = "Spotify";
    } else if (id === 'app-store') {
      title = "App Store";
    } else if (id === 'weather-side-window') {
      title = "Weather";
    } else if (id === 'stocks-side-window') {
      title = "Theme Settings";
    } else if (id === 'widgets-panel') {
      title = "Widgets";
    } else if (id.startsWith('folder-window-')) {
      title = "Folder";
    }
    
    taskbarIcon.title = title;
    
    // Use the new SVG mapping function
    taskbarIcon.innerHTML = getTaskbarIconSVG(id);
    
    taskbarIcon.addEventListener('click', () => restoreWindow(id));
    taskbarWindowsContainer.appendChild(taskbarIcon);
    return taskbarIcon;
}

// Spotify Integration
let spotifyPlayer = null;
let currentTrack = null;
let isPlaying = false;
let spotifyOpen = false;
let spotifyToken = null;

// Spotify API Configuration
const SPOTIFY_CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID'; // IMPORTANT: Replace with your client ID from Spotify Developer Dashboard
const SPOTIFY_CLIENT_SECRET = 'YOUR_SPOTIFY_CLIENT_SECRET'; // IMPORTANT: Replace with your client secret

// Function to get Spotify Access Token using Client Credentials Flow
async function getSpotifyToken() {
  // If we have a valid token, return it
  if (spotifyToken && spotifyToken.expires_at > Date.now()) {
    return spotifyToken.access_token;
  }

  // If credentials are not set, show an error and stop
  if (SPOTIFY_CLIENT_ID === 'YOUR_SPOTIFY_CLIENT_ID' || SPOTIFY_CLIENT_SECRET === 'YOUR_SPOTIFY_CLIENT_SECRET') {
    console.error("Spotify credentials are not set in os.js. Please get them from the Spotify Developer Dashboard.");
    const tracksContainer = document.getElementById('spotify-tracks-container');
    if(tracksContainer) tracksContainer.innerHTML = '<div class="spotify-error">Spotify API not configured.</div>';
    return null;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    
    if (data.access_token) {
      spotifyToken = {
        access_token: data.access_token,
        expires_at: Date.now() + (data.expires_in * 1000) // Convert expiry seconds to a future timestamp
      };
      return spotifyToken.access_token;
    } else {
      throw new Error(data.error_description || 'Failed to get Spotify token');
    }
  } catch (error) {
    console.error(error);
    const tracksContainer = document.getElementById('spotify-tracks-container');
    if(tracksContainer) tracksContainer.innerHTML = `<div class="spotify-error">${error.message}</div>`;
    return null;
  }
}

// Render the main structure of the Spotify Player
function renderSpotifyPlayer() {
  const spotifyWindow = document.getElementById('spotify-player-window');
  if (!spotifyWindow) return;

  spotifyWindow.innerHTML = `
    <div class="spotify-player-card">
        <div class="spotify-player-top" id="spotify-player-top-bg">
            <button class="spotify-icon-btn top-left" id="spotify-like-btn" title="Like">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
            <button class="spotify-icon-btn top-right" id="spotify-theme-btn" title="Theme">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M10 2c-1.82 0-3.53.5-5 1.35 2.99 1.73 5 4.95 5 8.65s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z"/>
                </svg>
            </button>
        </div>
        <div class="spotify-player-body">
            <div class="spotify-track-details">
                <div id="spotify-album-art"></div>
                <div id="spotify-track-info">
                    <div id="spotify-track-name">Nothing Playing</div>
                    <div id="spotify-track-artist"></div>
                </div>
            </div>

            <div class="spotify-controls">
                <button class="spotify-control-btn" id="spotify-prev-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M18,18V6L12,12L18,18M8,18V6H10V18H8Z" /></svg>
                </button>
                <button class="spotify-control-btn play-pause" id="spotify-play-pause-btn">
                    <svg class="play-icon" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>
                    <svg class="pause-icon" style="display: none;" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6" /></svg>
                </button>
                <button class="spotify-control-btn" id="spotify-next-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M16,18V6H14V18H16M6,18V6L12,12L6,18Z" /></svg>
                </button>
            </div>

            <div class="spotify-progress-container">
                <span id="spotify-current-time">0:00</span>
                <div class="spotify-slider-wrapper">
                    <input type="range" id="spotify-progress-bar" class="spotify-slider" min="0" value="0" step="1">
                </div>
                <span id="spotify-total-time">0:00</span>
            </div>
        </div>
    </div>
  `;
  attachSpotifyEventListeners();
}

// Attach event listeners for the player
function attachSpotifyEventListeners() {
    document.getElementById('spotify-search-btn').addEventListener('click', () => toggleSpotifyView());
    document.getElementById('spotify-search-input').addEventListener('input', debounce(handleSpotifySearch, 300));
    document.getElementById('play-pause-btn').addEventListener('click', togglePlayPause);
    document.getElementById('prev-btn').addEventListener('click', previousTrack);
    document.getElementById('next-btn').addEventListener('click', nextTrack);

    const progressBar = document.getElementById('spotify-progress-bar');
    progressBar.addEventListener('input', () => {
        if (spotifyPlayer) spotifyPlayer.currentTime = progressBar.value;
    });

    const volumeSlider = document.getElementById('spotify-volume-slider');
    volumeSlider.addEventListener('input', () => {
        if (spotifyPlayer) spotifyPlayer.volume = volumeSlider.value;
        updateVolumeIcon(volumeSlider.value);
        updateSliderFill(volumeSlider);
    });
}

// Toggle between the 'Now Playing' and 'Search' views with animation
function toggleSpotifyView() {
    const nowPlayingView = document.getElementById('spotify-now-playing-view');
    const searchView = document.getElementById('spotify-search-view');
    const title = document.getElementById('spotify-view-title');
    const searchBtn = document.getElementById('spotify-search-btn');

    if (!nowPlayingView || !searchView) return;

    const isSearchVisible = searchView.classList.contains('active');

    if (isSearchVisible) {
        // Switch to Now Playing view
        searchView.classList.remove('active');
        nowPlayingView.classList.add('active');
        title.textContent = 'Now Playing';
        searchBtn.textContent = '🔍';
        searchBtn.title = 'Search Songs';
    } else {
        // Switch to Search view
        nowPlayingView.classList.remove('active');
        searchView.classList.add('active');
        title.textContent = 'Search';
        searchBtn.textContent = '🎵';
        searchBtn.title = 'Now Playing';
    }
}

// Spotify Player Window Management
function toggleSpotifyWindow() {
  const spotifyWindow = document.getElementById('spotify-player-window');
  if (spotifyWindow.classList.contains('open')) {
    spotifyWindow.classList.remove('open');
    spotifyOpen = false;
  } else {
    if (!spotifyWindow.innerHTML.trim()) {
      renderSpotifyPlayer();
    }
    spotifyWindow.classList.add('open');
    spotifyOpen = true;
  }
}

// Search for tracks on Spotify
async function searchSpotifyTracks(query) {
  const token = await getSpotifyToken();
  if (!token) return [];

  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.ok) return [];
  const data = await response.json();
  return data.tracks ? data.tracks.items : [];
}

// Load popular tracks from a featured playlist
async function loadPopularTracks() {
  const tracksContainer = document.getElementById('spotify-tracks-container');
  if (tracksContainer) tracksContainer.innerHTML = '<div class="spotify-loading">Loading...</div>';

  const token = await getSpotifyToken();
  if (!token) return;
  
  try {
    const playlistResponse = await fetch('https://api.spotify.com/v1/browse/featured-playlists?limit=1', {
       headers: { 'Authorization': `Bearer ${token}` }
    });
    const playlistData = await playlistResponse.json();
    const playlistId = playlistData.playlists.items[0].id;
    
    const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=30`, {
       headers: { 'Authorization': `Bearer ${token}` }
    });
    const tracksData = await tracksResponse.json();
    const tracks = tracksData.items.map(item => item.track).filter(Boolean); 
    displayTracks(tracks);
  } catch (error) {
    console.error('Error loading popular tracks:', error);
    if(tracksContainer) tracksContainer.innerHTML = '<div class="spotify-error">Failed to load tracks.</div>';
  }
}

// Display a list of tracks in the search view
function displayTracks(tracks) {
  const tracksContainer = document.getElementById('spotify-tracks-container');
  if (!tracksContainer) return;
  
  if (!tracks || tracks.length === 0) {
    tracksContainer.innerHTML = '<div class="spotify-error">No tracks found.</div>';
    return;
  }

  const tracksHTML = tracks.map(track => {
    if (!track || !track.preview_url) return ''; // Skip tracks that can't be played
    
    const trackImage = track.album.images.length ? track.album.images[0].url : 'img-bg/main-logo.png';
    const trackName = track.name.replace(/'/g, "\\'");
    const trackArtist = track.artists.map(artist => artist.name).join(', ').replace(/'/g, "\\'");

    return `
    <div class="spotify-track" onclick="playTrack({id: '${track.id}', name: '${trackName}', artist: '${trackArtist}', image: '${trackImage}', url: '${track.preview_url}'})">
      <img class="spotify-track-image" src="${trackImage}" alt="${trackName}" />
      <div class="spotify-track-info">
        <div class="spotify-track-name">${track.name}</div>
        <div class="spotify-track-artist">${track.artists.map(a => a.name).join(', ')}</div>
      </div>
    </div>`;
  }).join('');

  tracksContainer.innerHTML = `<div class="spotify-tracks">${tracksHTML}</div>`;
}

// Player Core Functions
function playTrack(track) {
  if (!spotifyPlayer) {
      spotifyPlayer = new Audio();
      spotifyPlayer.volume = document.getElementById('spotify-volume-slider').value;
      updateSliderFill(document.getElementById('spotify-volume-slider'));
      
      spotifyPlayer.addEventListener('timeupdate', updateProgress);
      spotifyPlayer.addEventListener('loadedmetadata', () => {
        document.getElementById('spotify-duration').textContent = formatTime(spotifyPlayer.duration);
        document.getElementById('spotify-progress-bar').max = spotifyPlayer.duration;
      });
      spotifyPlayer.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayPauseButton();
      });
  }
  
  currentTrack = track;
  spotifyPlayer.src = currentTrack.url;

  // Update UI and trigger animation
  const albumArt = document.getElementById('spotify-album-art');
  albumArt.src = currentTrack.image;
  albumArt.classList.add('new-art');
  albumArt.addEventListener('animationend', () => albumArt.classList.remove('new-art'), { once: true });
  
  document.getElementById('spotify-track-name').textContent = currentTrack.name;
  document.getElementById('spotify-track-artist').textContent = currentTrack.artist;

  spotifyPlayer.play().then(() => {
      isPlaying = true;
      updatePlayPauseButton();
  }).catch(error => console.error("Playback Error:", error));

  // If search view is active, switch to player view
  if (document.getElementById('spotify-search-view').classList.contains('active')) {
      toggleSpotifyView();
  }
}

function togglePlayPause() {
  if (!spotifyPlayer || !spotifyPlayer.src) return;

  if (isPlaying) {
    spotifyPlayer.pause();
  } else {
    spotifyPlayer.play();
  }
  isPlaying = !isPlaying;
  updatePlayPauseButton();
}

function previousTrack() {
  if (spotifyPlayer) spotifyPlayer.currentTime = 0;
}

function nextTrack() {
    // In a real app, you'd play the next song in the list. Here, we just restart.
  if (spotifyPlayer) spotifyPlayer.currentTime = 0;
}

// UI Update Functions
function updateProgress() {
    if (!spotifyPlayer || !spotifyPlayer.duration) return;
    const progressBar = document.getElementById('spotify-progress-bar');
    progressBar.value = spotifyPlayer.currentTime;
    document.getElementById('spotify-current-time').textContent = formatTime(spotifyPlayer.currentTime);
    updateSliderFill(progressBar);
}

function updatePlayPauseButton() {
  const btn = document.getElementById('spotify-play-pause-btn');
  if (!btn) return;
  const playIcon = btn.querySelector('.play-icon');
  const pauseIcon = btn.querySelector('.pause-icon');
  
  if (isPlaying) {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline-block';
  } else {
    playIcon.style.display = 'inline-block';
    pauseIcon.style.display = 'none';
  }
}

function updateVolumeIcon(volume) {
    const icon = document.getElementById('spotify-volume-icon');
    if (volume == 0) icon.textContent = '🔈';
    else if (volume < 0.5) icon.textContent = '🔉';
    else icon.textContent = '🔊';
}

// New function to update the visual fill of sliders
function updateSliderFill(slider) {
    const min = slider.min || 0;
    const max = slider.max || 100;
    const value = slider.value;
    const percentage = ((value - min) / (max - min)) * 100;
    slider.style.setProperty('--fill-percent', `${percentage}%`);
}

// Search and Utility Functions
function handleSpotifySearch(event) {
  const query = event.target.value.trim();
  const tracksContainer = document.getElementById('spotify-tracks-container');
  
  if (tracksContainer) {
    tracksContainer.innerHTML = `<div class="spotify-loading">${query ? 'Searching...' : 'Loading...'}</div>`;
  }

  if (!query) {
    loadPopularTracks();
    return;
  }
  searchSpotifyTracks(query).then(displayTracks);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

// Attach Spotify icon handler to the widget button
function attachSpotifyIconHandler() {
  const spotifyIcon = document.querySelector('.widget-icon[title="Spotify"]');
  if (spotifyIcon) {
    spotifyIcon.onclick = function(e) {
      e.stopPropagation();
      toggleSpotifyWindow();
    };
  }
}

// Close Spotify window when clicking outside
function handleSpotifyWindowClose(e) {
  if (spotifyOpen) {
    const spotifyWindow = document.getElementById('spotify-player-window');
    const spotifyIcon = document.querySelector('.widget-icon[title="Spotify"]');
    if (!spotifyWindow.contains(e.target) && e.target !== spotifyIcon && !spotifyIcon.contains(e.target)) {
      toggleSpotifyWindow();
    }
  }
}
document.addEventListener('click', handleSpotifyWindowClose);

// Quick Settings Panel
const quickSettingsBtn = document.getElementById('taskbar-action-center-button');
const quickSettingsPanel = document.getElementById('quick-settings-panel');

quickSettingsBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    quickSettingsPanel.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    if (quickSettingsPanel.classList.contains('open') && !quickSettingsPanel.contains(event.target) && !quickSettingsBtn.contains(event.target)) {
        quickSettingsPanel.classList.remove('open');
    }
});

quickSettingsPanel.addEventListener('click', (event) => {
    const tile = event.target.closest('.quick-setting-tile');
    if (tile) {
        tile.classList.toggle('active');
        
        // Change text color and svg fill based on active state
        const icon = tile.querySelector('svg');
        if (tile.classList.contains('active')) {
            tile.style.color = 'black';
            if(icon) icon.style.fill = 'black';
        } else {
            tile.style.color = 'white';
            if(icon) icon.style.fill = 'white';
        }
    }
});

// Brightness and Volume Sliders
const brightnessSlider = document.querySelector('.quick-settings-sliders .slider-container:nth-child(1) input[type="range"]');
const brightnessOverlay = document.getElementById('screen-brightness-overlay');

function updateBrightness() {
    const brightnessValue = brightnessSlider.value;
    // As brightness goes from 0 to 100, opacity goes from 0.8 (dark) to 0 (bright)
    const opacity = (100 - brightnessValue) * 0.008;
    brightnessOverlay.style.opacity = opacity;
    // Save brightness to localStorage
    localStorage.setItem('desktopBrightness', brightnessValue);
}

// Restore brightness from localStorage on page load
const savedBrightness = localStorage.getItem('desktopBrightness');
if (savedBrightness !== null) {
    brightnessSlider.value = savedBrightness;
    updateBrightness();
} else {
    updateBrightness();
}

brightnessSlider.addEventListener('input', updateBrightness);

// Helper to generate unique folder name
function getUniqueFolderName() {
  const baseName = 'New Folder';
  let name = baseName;
  let counter = 1;
  const folders = getSavedFolders();
  const nameExists = n => folders.some(f => f.name === n) || document.querySelector(`.desktop-icon .icon-label[data-folder-name='${n}']`);
  while (nameExists(name)) {
    counter++;
    name = `${baseName} (${counter})`;
  }
  return name;
}

// Create a new folder icon on the desktop
function createNewFolderOnDesktop() {
  const baseLeft = 120;
  const baseTop = 20;
  const spacing = 100; // Space between folders
  const folders = getSavedFolders();
  
  // Find a free position
  let left = baseLeft;
  let top = baseTop;
  let occupied = true;
  const maxAttempts = 1000; // Prevent infinite loop
  let attempts = 0;
  
  while (occupied && attempts < maxAttempts) {
    attempts++;
    occupied = folders.some(folder => {
      const folderLeft = parseInt(folder.left);
      const folderTop = parseInt(folder.top);
      // Check if positions overlap (within spacing threshold)
      return Math.abs(folderLeft - left) < spacing && Math.abs(folderTop - top) < spacing;
    });
    
    if (occupied) {
      // Try next position: move right, and if at edge, move down and reset left
      left += spacing;
      if (left > window.innerWidth - 150) { // Account for folder width
        left = baseLeft;
        top += spacing;
      }
    }
  }
  
  const name = getUniqueFolderName();
  // Save to localStorage with the found position
  folders.push({ name, left: `${left}px`, top: `${top}px` });
  saveFolders(folders);
  // Render on desktop
  renderFolder({ name, left: `${left}px`, top: `${top}px` });
}

// Helper to get all folders from localStorage
function getSavedFolders() {
  try {
    return JSON.parse(localStorage.getItem('desktopFolders')) || [];
  } catch {
    return [];
  }
}

// Helper to save all folders to localStorage
function saveFolders(folders) {
  localStorage.setItem('desktopFolders', JSON.stringify(folders));
}

// Render a folder icon on the desktop from data
function renderFolder({ name, left, top }) {
  const desktop = document.getElementById('desktop');
  const folderIcon = document.createElement('div');
  folderIcon.className = 'desktop-icon';
  folderIcon.style.left = left;
  folderIcon.style.top = top;
  folderIcon.draggable = true;

  // SVG folder icon
  const iconImage = document.createElement('div');
  iconImage.className = 'icon-image';
  iconImage.innerHTML = `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="40" height="28" rx="4" fill="#f7b731"/>
      <path d="M4 14V10C4 7.79086 5.79086 6 8 6H20L24 10H40C42.2091 10 44 11.7909 44 14V14" fill="#f9ca5c"/>
      <rect x="4" y="14" width="40" height="28" rx="4" stroke="#e2a500" stroke-width="2"/>
    </svg>
  `;
  folderIcon.appendChild(iconImage);

  // Folder label
  const label = document.createElement('div');
  label.className = 'icon-label';
  label.textContent = name;
  label.setAttribute('data-folder-name', name);
  folderIcon.appendChild(label);

  // Drag and drop logic
  let isDragging = false;
  let startX, startY, originalLeft, originalTop;

  function dragStart(e) {
    e.preventDefault();
    const rect = folderIcon.getBoundingClientRect();
    originalLeft = rect.left;
    originalTop = rect.top;
    if (e.type === "touchstart") {
      startX = e.touches[0].clientX - originalLeft;
      startY = e.touches[0].clientY - originalTop;
    } else {
      startX = e.clientX - originalLeft;
      startY = e.clientY - originalTop;
    }
    isDragging = true;
    folderIcon.classList.add('dragging');
  }
  function dragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    folderIcon.classList.remove('dragging');
    let finalX, finalY;
    if (e.type === "touchend") {
      finalX = e.changedTouches[0].clientX - startX;
      finalY = e.changedTouches[0].clientY - startY;
    } else {
      finalX = e.clientX - startX;
      finalY = e.clientY - startY;
    }
    folderIcon.style.left = finalX + 'px';
    folderIcon.style.top = finalY + 'px';
    folderIcon.style.transform = 'none';
    // Save new position
    const folders = getSavedFolders();
    const idx = folders.findIndex(f => f.name === name);
    if (idx !== -1) {
      folders[idx].left = folderIcon.style.left;
      folders[idx].top = folderIcon.style.top;
      saveFolders(folders);
    }
  }
  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    let currentX, currentY;
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - startX;
      currentY = e.touches[0].clientY - startY;
    } else {
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
    }
    folderIcon.style.left = currentX + 'px';
    folderIcon.style.top = currentY + 'px';
  }
  folderIcon.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);
  folderIcon.addEventListener('touchstart', dragStart, { passive: false });
  document.addEventListener('touchmove', drag, { passive: false });
  document.addEventListener('touchend', dragEnd);

  desktop.appendChild(folderIcon);
}

// On page load, render all saved folders
window.addEventListener('DOMContentLoaded', function() {
  getSavedFolders().forEach(folder => renderFolder(folder));
});

let lastRightClickedFolderName = null;

// Update desktop icon right-click to track which folder was right-clicked
function attachFolderContextMenu(folderIcon, folderName) {
  folderIcon.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    lastRightClickedFolderName = folderName;
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.display = 'block';
    contextMenu.style.left = e.pageX + 'px';
    contextMenu.style.top = e.pageY + 'px';
    contextMenu.innerHTML = `
      <li id="cm-refresh">Refresh</li>
      <li id="cm-new">New</li>
      <li id="cm-del">Delete</li>
      <li id="cm-rename">Rename</li>
    `;
  });
}

// Update renderFolder to use attachFolderContextMenu
function renderFolder({ name, left, top }) {
  const desktop = document.getElementById('desktop');
  const folderIcon = document.createElement('div');
  folderIcon.className = 'desktop-icon';
  folderIcon.style.left = left;
  folderIcon.style.top = top;
  folderIcon.draggable = true;

  // SVG folder icon
  const iconImage = document.createElement('div');
  iconImage.className = 'icon-image';
  iconImage.innerHTML = `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="40" height="28" rx="4" fill="#f7b731"/>
      <path d="M4 14V10C4 7.79086 5.79086 6 8 6H20L24 10H40C42.2091 10 44 11.7909 44 14V14" fill="#f9ca5c"/>
      <rect x="4" y="14" width="40" height="28" rx="4" stroke="#e2a500" stroke-width="2"/>
    </svg>
  `;
  folderIcon.appendChild(iconImage);

  // Folder label
  const label = document.createElement('div');
  label.className = 'icon-label';
  label.textContent = name;
  label.setAttribute('data-folder-name', name);
  folderIcon.appendChild(label);

  // Drag and drop logic
  let isDragging = false;
  let startX, startY, originalLeft, originalTop;

  function dragStart(e) {
    e.preventDefault();
    const rect = folderIcon.getBoundingClientRect();
    originalLeft = rect.left;
    originalTop = rect.top;
    if (e.type === "touchstart") {
      startX = e.touches[0].clientX - originalLeft;
      startY = e.touches[0].clientY - originalTop;
    } else {
      startX = e.clientX - originalLeft;
      startY = e.clientY - originalTop;
    }
    isDragging = true;
    folderIcon.classList.add('dragging');
  }
  function dragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    folderIcon.classList.remove('dragging');
    let finalX, finalY;
    if (e.type === "touchend") {
      finalX = e.changedTouches[0].clientX - startX;
      finalY = e.changedTouches[0].clientY - startY;
    } else {
      finalX = e.clientX - startX;
      finalY = e.clientY - startY;
    }
    folderIcon.style.left = finalX + 'px';
    folderIcon.style.top = finalY + 'px';
    folderIcon.style.transform = 'none';
    // Save new position
    const folders = getSavedFolders();
    const idx = folders.findIndex(f => f.name === name);
    if (idx !== -1) {
      folders[idx].left = folderIcon.style.left;
      folders[idx].top = folderIcon.style.top;
      saveFolders(folders);
    }
  }
  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    let currentX, currentY;
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - startX;
      currentY = e.touches[0].clientY - startY;
    } else {
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
    }
    folderIcon.style.left = currentX + 'px';
    folderIcon.style.top = currentY + 'px';
  }
  folderIcon.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);
  folderIcon.addEventListener('touchstart', dragStart, { passive: false });
  document.addEventListener('touchmove', drag, { passive: false });
  document.addEventListener('touchend', dragEnd);

  // Attach right-click context menu
  attachFolderContextMenu(folderIcon, name);

  desktop.appendChild(folderIcon);
}

// Handle context menu actions
contextMenu.addEventListener('click', (event) => {
  if (event.target.id === 'cm-refresh') {
    window.location.reload();
  }
  if (event.target.id === 'cm-new') {
    createNewFolderOnDesktop();
  }
  if (event.target.id === 'cm-del' && lastRightClickedFolderName) {
    // Remove from DOM - improved selector
    const label = document.querySelector(`.desktop-icon .icon-label[data-folder-name='${lastRightClickedFolderName}']`);
    if (label) {
      const icon = label.closest('.desktop-icon');
      if (icon) {
        icon.remove();
        // Remove from localStorage
        let folders = getSavedFolders();
        folders = folders.filter(f => f.name !== lastRightClickedFolderName);
        saveFolders(folders);
        // Clear selection if this was the selected folder
        if (selectedFolderName === lastRightClickedFolderName) {
          selectedFolderName = null;
        }
        lastRightClickedFolderName = null;
        // Hide context menu
        contextMenu.style.display = 'none';
      }
    }
  }
  if (event.target.id === 'cm-rename' && lastRightClickedFolderName) {
    // Find the folder icon and label
    const label = document.querySelector(`.desktop-icon .icon-label[data-folder-name='${lastRightClickedFolderName}']`);
    if (!label) return;
    const folderIcon = label.parentElement;
    // Create input
    const input = document.createElement('input');
    input.type = 'text';
    input.value = lastRightClickedFolderName;
    input.className = 'rename-input';
    input.style.width = (label.offsetWidth + 20) + 'px';
    input.style.fontSize = '12px';
    input.style.padding = '2px 4px';
    input.style.borderRadius = '4px';
    input.style.border = '1px solid #aaa';
    input.style.outline = 'none';
    input.style.textAlign = 'center';
    label.style.display = 'none';
    folderIcon.appendChild(input);
    input.focus();
    input.select();
    // Save on Enter or blur
    function finishRename() {
      const newName = input.value.trim() || lastRightClickedFolderName;
      // Prevent duplicate names
      if (newName !== lastRightClickedFolderName && document.querySelector(`.desktop-icon .icon-label[data-folder-name='${newName}']`)) {
        input.focus();
        return;
      }
      // Update label
      label.textContent = newName;
      label.setAttribute('data-folder-name', newName);
      label.style.display = '';
      input.remove();
      // Update localStorage
      let folders = getSavedFolders();
      const idx = folders.findIndex(f => f.name === lastRightClickedFolderName);
      if (idx !== -1) {
        folders[idx].name = newName;
        saveFolders(folders);
      }
      // Update selection/context tracking
      if (selectedFolderName === lastRightClickedFolderName) selectedFolderName = newName;
      lastRightClickedFolderName = newName;
    }
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') finishRename();
      if (e.key === 'Escape') { label.style.display = ''; input.remove(); }
    });
    input.addEventListener('blur', finishRename);
  }
});

let selectedFolderName = null;

// Update renderFolder to allow selection and keyboard delete
function renderFolder({ name, left, top }) {
  const desktop = document.getElementById('desktop');
  const folderIcon = document.createElement('div');
  folderIcon.className = 'desktop-icon';
  folderIcon.style.left = left;
  folderIcon.style.top = top;
  folderIcon.draggable = true;
  folderIcon.setAttribute('data-folder-name', name);

  // SVG folder icon
  const iconImage = document.createElement('div');
  iconImage.className = 'icon-image';
  iconImage.innerHTML = `
    <svg width="48px" height="48px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1H6L9 4H16V14H0V1Z" fill="#ffffff"/></svg>
  `;
  folderIcon.appendChild(iconImage);

  // Folder label
  const label = document.createElement('div');
  label.className = 'icon-label';
  label.textContent = name;
  label.setAttribute('data-folder-name', name);
  folderIcon.appendChild(label);

  // Selection logic
  folderIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    // Deselect any previously selected folder
    document.querySelectorAll('.desktop-icon.selected').forEach(el => el.classList.remove('selected'));
    folderIcon.classList.add('selected');
    selectedFolderName = folderIcon.getAttribute('data-folder-name');
  });

  // Drag and drop logic
  let isDragging = false;
  let startX, startY, originalLeft, originalTop;

  function dragStart(e) {
    e.preventDefault();
    const rect = folderIcon.getBoundingClientRect();
    originalLeft = rect.left;
    originalTop = rect.top;
    if (e.type === "touchstart") {
      startX = e.touches[0].clientX - originalLeft;
      startY = e.touches[0].clientY - originalTop;
    } else {
      startX = e.clientX - originalLeft;
      startY = e.clientY - originalTop;
    }
    isDragging = true;
    folderIcon.classList.add('dragging');
  }
  function dragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    folderIcon.classList.remove('dragging');
    let finalX, finalY;
    if (e.type === "touchend") {
      finalX = e.changedTouches[0].clientX - startX;
      finalY = e.changedTouches[0].clientY - startY;
    } else {
      finalX = e.clientX - startX;
      finalY = e.clientY - startY;
    }
    folderIcon.style.left = finalX + 'px';
    folderIcon.style.top = finalY + 'px';
    folderIcon.style.transform = 'none';
    // Save new position
    const currentName = folderIcon.getAttribute('data-folder-name');
    const folders = getSavedFolders();
    const idx = folders.findIndex(f => f.name === name);
    if (idx !== -1) {
      folders[idx].left = folderIcon.style.left;
      folders[idx].top = folderIcon.style.top;
      saveFolders(folders);
    }
  }
  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    let currentX, currentY;
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - startX;
      currentY = e.touches[0].clientY - startY;
    } else {
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
    }
    folderIcon.style.left = currentX + 'px';
    folderIcon.style.top = currentY + 'px';
  }
  folderIcon.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);
  folderIcon.addEventListener('touchstart', dragStart, { passive: false });
  document.addEventListener('touchmove', drag, { passive: false });
  document.addEventListener('touchend', dragEnd);

  // Attach right-click context menu
  attachFolderContextMenu(folderIcon, name);
  desktop.appendChild(folderIcon);
}

// Deselect folder when clicking on desktop
if (desktop) {
  desktop.addEventListener('click', function(e) {
    if (e.target === desktop) {
      document.querySelectorAll('.desktop-icon.selected').forEach(el => el.classList.remove('selected'));
      selectedFolderName = null;
    }
  });
}

// Keyboard delete handler
window.addEventListener('keydown', function(e) {
  if ((e.key === 'Delete' || e.key === 'Del') && selectedFolderName) {
    // Remove from DOM - improved selector
    const label = document.querySelector(`.desktop-icon .icon-label[data-folder-name='${selectedFolderName}']`);
    if (label) {
      const icon = label.closest('.desktop-icon');
      if (icon) {
        icon.remove();
        // Remove from localStorage
        let folders = getSavedFolders();
        folders = folders.filter(f => f.name !== selectedFolderName);
        saveFolders(folders);
        selectedFolderName = null;
      }
    }
  }
});

// Close stocks window when clicking outside
function handleStocksWindowClose(e) {
  if (stocksSideWindow.classList.contains('open')) {
    if (!stocksSideWindow.contains(e.target) && !(e.target.closest('.widget-icon[title="Stocks"]'))) {
      stocksSideWindow.classList.remove('open');
    }
  }
}
document.addEventListener('click', handleStocksWindowClose);

// --- FOLDER WINDOW FUNCTIONALITY ---

/**
 * Create a new folder window (clone of App Store window UI, minus main-content)
 * @param {string} folderName - The name of the folder (for window title/id)
 */
function createFolderWindow(folderName) {
  const windowId = `folder-window-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  if (document.getElementById(windowId)) return;
  const appStoreWindow = document.getElementById('app-store-window');
  if (!appStoreWindow) return;
  const folderWindow = document.createElement('div');
  folderWindow.className = 'app-window folder-window';
  folderWindow.id = windowId;
  folderWindow.style.display = 'block';
  folderWindow.style.zIndex = windowManager._zIndexCounter + 1;
  folderWindow.innerHTML = `
    <div class="window-header">
      <div class="traffic-lights">
        <div class="light red"></div>
        <div class="light yellow"></div>
        <div class="light green"></div>
      </div>
      <div class="folder-title" style="color:white;font-size:15px;font-weight:500;">${folderName}</div>
    </div>
    <div class="window-body">
      <div class="sidebar">${appStoreWindow.querySelector('.sidebar').innerHTML}</div>
    </div>
    <div class="resize-handle-se"></div>
  `;
  document.body.appendChild(folderWindow);
  // Center on screen (only first open)
  centerWindowOnScreen(folderWindow);
  windowManager.register(windowId, folderWindow);
  // ... rest of createFolderWindow logic ...
  // --- Drag, z-index, and traffic light controls ---
  const headerEl = folderWindow.querySelector('.window-header');
  const closeBtn = folderWindow.querySelector('.light.red');
  const minimizeBtn = folderWindow.querySelector('.light.yellow');
  const maximizeBtn = folderWindow.querySelector('.light.green');
  const resizeHandle = folderWindow.querySelector('.resize-handle-se');
  closeBtn.addEventListener('click', () => {
    folderWindow.classList.remove('open', 'minimized', 'moved');
    setTimeout(() => folderWindow.remove(), 400);
  });
  if (maximizeBtn) maximizeBtn.addEventListener('click', () => toggleMaximizeWindow(windowId));
  if (minimizeBtn) minimizeBtn.addEventListener('click', () => minimizeWindow(windowId));
  let isDragging = false, offsetX, offsetY;
  let pendingUnmaximize = false, startX, startY;
  const dragStart = (e) => {
    const windowState = windowManager.get(windowId);
    if (e.target.classList.contains('light')) return;
    if (windowState && windowState.isMaximized) {
      pendingUnmaximize = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startY = e.clientY || (e.touches && e.touches[0].clientY);
    } else {
      pendingUnmaximize = false;
    }
    windowManager.bringToFront(windowId);
    if (!folderWindow.classList.contains('moved')) {
      const rect = folderWindow.getBoundingClientRect();
      folderWindow.style.left = `${rect.left}px`;
      folderWindow.style.top = `${rect.top}px`;
      folderWindow.classList.add('moved');
    }
    folderWindow.style.transition = 'none';
    isDragging = true;
    offsetX = (e.clientX || (e.touches && e.touches[0].clientX)) - folderWindow.offsetLeft;
    offsetY = (e.clientY || (e.touches && e.touches[0].clientY)) - folderWindow.offsetTop;
    document.addEventListener('mousemove', dragMove, { passive: false });
    document.addEventListener('touchmove', dragMove, { passive: false });
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
  };
  const dragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (pendingUnmaximize) {
      if (Math.abs(clientX - startX) > 5 || Math.abs(clientY - startY) > 5) {
        const windowState = windowManager.get(windowId);
        if (windowState && windowState.isMaximized) {
          windowState.isMaximized = false;
          folderWindow.classList.remove('maximized');
          if (headerEl) headerEl.style.cursor = 'move';
        }
        pendingUnmaximize = false;
      } else {
        return;
      }
    }
    e.preventDefault();
    folderWindow.style.left = `${clientX - offsetX}px`;
    folderWindow.style.top = `${clientY - offsetY}px`;
  };
  const dragEnd = () => {
    folderWindow.style.transition = '';
    isDragging = false;
    pendingUnmaximize = false;
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('touchmove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchend', dragEnd);
  };
  if (headerEl) {
    headerEl.addEventListener('mousedown', dragStart);
    headerEl.addEventListener('touchstart', dragStart, { passive: false });
    headerEl.addEventListener('dblclick', () => toggleMaximizeWindow(windowId));
  }
  // Resize logic (optional, similar to App Store)
  let isResizing = false, originalWidth, originalHeight, originalX, originalY;
  const resizeStart = (e) => {
    const windowState = windowManager.get(windowId);
    if (windowState && windowState.isMaximized) return;
    e.preventDefault();
    isResizing = true;
    originalWidth = parseFloat(getComputedStyle(folderWindow, null).getPropertyValue('width').replace('px', ''));
    originalHeight = parseFloat(getComputedStyle(folderWindow, null).getPropertyValue('height').replace('px', ''));
    originalX = e.clientX || (e.touches && e.touches[0].clientX);
    originalY = e.clientY || (e.touches && e.touches[0].clientY);
    folderWindow.style.transition = 'none';
    document.addEventListener('mousemove', resizeMove);
    document.addEventListener('touchmove', resizeMove);
    document.addEventListener('mouseup', resizeEnd);
    document.addEventListener('touchend', resizeEnd);
  };
  const resizeMove = (e) => {
    if (isResizing) {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const width = originalWidth + (clientX - originalX);
      const height = originalHeight + (clientY - originalY);
      if (width > 300) folderWindow.style.width = width + 'px';
      if (height > 200) folderWindow.style.height = height + 'px';
    }
  };
  const resizeEnd = () => {
    isResizing = false;
    folderWindow.style.transition = '';
    document.removeEventListener('mousemove', resizeMove);
    document.removeEventListener('touchmove', resizeMove);
    document.removeEventListener('mouseup', resizeEnd);
    document.removeEventListener('touchend', resizeEnd);
  };
  if (resizeHandle) {
    resizeHandle.addEventListener('mousedown', resizeStart);
    resizeHandle.addEventListener('touchstart', resizeStart, { passive: false });
  }
  setTimeout(() => folderWindow.classList.add('open'), 10);
}

// Bind double-click to open folder window on all folder icons
function bindFolderWindowOpen(folderIcon, folderName) {
  folderIcon.addEventListener('dblclick', function(e) {
    e.preventDefault();
    createFolderWindow(folderName);
  });
}

// Patch renderFolder to bind double-click event
const originalRenderFolder = renderFolder;
renderFolder = function({ name, left, top }) {
  const desktop = document.getElementById('desktop');
  const folderIcon = document.createElement('div');
  folderIcon.className = 'desktop-icon';
  folderIcon.style.left = left;
  folderIcon.style.top = top;
  folderIcon.draggable = true;
  // SVG folder icon
  const iconImage = document.createElement('div');
  iconImage.className = 'icon-image';
  iconImage.innerHTML = `
    <svg width="48px" height="48px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 1H6L9 4H16V14H0V1Z" fill="#ffffff"/>
</svg>
  `;
  folderIcon.appendChild(iconImage);
  // Folder label
  const label = document.createElement('div');
  label.className = 'icon-label';
  label.textContent = name;
  label.setAttribute('data-folder-name', name);
  folderIcon.appendChild(label);
  // Selection logic
  folderIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    document.querySelectorAll('.desktop-icon.selected').forEach(el => el.classList.remove('selected'));
    folderIcon.classList.add('selected');
    selectedFolderName = name;
  });
  // Drag and drop logic (same as before)
  let isDragging = false;
  let startX, startY, originalLeft, originalTop;
  function dragStart(e) {
    e.preventDefault();
    const rect = folderIcon.getBoundingClientRect();
    originalLeft = rect.left;
    originalTop = rect.top;
    if (e.type === "touchstart") {
      startX = e.touches[0].clientX - originalLeft;
      startY = e.touches[0].clientY - originalTop;
    } else {
      startX = e.clientX - originalLeft;
      startY = e.clientY - originalTop;
    }
    isDragging = true;
    folderIcon.classList.add('dragging');
  }
  function dragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    folderIcon.classList.remove('dragging');
    let finalX, finalY;
    if (e.type === "touchend") {
      finalX = e.changedTouches[0].clientX - startX;
      finalY = e.changedTouches[0].clientY - startY;
    } else {
      finalX = e.clientX - startX;
      finalY = e.clientY - startY;
    }
    folderIcon.style.left = finalX + 'px';
    folderIcon.style.top = finalY + 'px';
    folderIcon.style.transform = 'none';
    // Save new position
    const folders = getSavedFolders();
    const idx = folders.findIndex(f => f.name === name);
    if (idx !== -1) {
      folders[idx].left = folderIcon.style.left;
      folders[idx].top = folderIcon.style.top;
      saveFolders(folders);
    }
  }
  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    let currentX, currentY;
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - startX;
      currentY = e.touches[0].clientY - startY;
    } else {
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
    }
    folderIcon.style.left = currentX + 'px';
    folderIcon.style.top = currentY + 'px';
  }
  folderIcon.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);
  folderIcon.addEventListener('touchstart', dragStart, { passive: false });
  document.addEventListener('touchmove', drag, { passive: false });
  document.addEventListener('touchend', dragEnd);
  // Attach right-click context menu
  attachFolderContextMenu(folderIcon, name);
  // Bind double-click to open folder window
  bindFolderWindowOpen(folderIcon, name);
  desktop.appendChild(folderIcon);
};

// Utility: Center a window on the screen (only if not moved)
function centerWindowOnScreen(windowEl) {
  if (!windowEl.classList.contains('moved')) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = windowEl.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const left = Math.max(0, (vw - width) / 2);
    const top = Math.max(0, (vh - height) / 2);
    windowEl.style.left = left + 'px';
    windowEl.style.top = top + 'px';
  }
}

// --- FOLDER WINDOW FUNCTIONALITY ---
function createFolderWindow(folderName) {
  const windowId = `folder-window-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  if (document.getElementById(windowId)) return;
  const appStoreWindow = document.getElementById('app-store-window');
  if (!appStoreWindow) return;
  const folderWindow = document.createElement('div');
  folderWindow.className = 'app-window folder-window';
  folderWindow.id = windowId;
  folderWindow.style.display = 'block';
  folderWindow.style.zIndex = windowManager._zIndexCounter + 1;
  folderWindow.innerHTML = `
    <div class="window-header">
      <div class="traffic-lights">
        <div class="light red"></div>
        <div class="light yellow"></div>
        <div class="light green"></div>
      </div>
      <div class="folder-title" style="color:white;font-size:15px;font-weight:500;">${folderName}</div>
    </div>
    <div class="window-body">
      <div class="sidebar">${appStoreWindow.querySelector('.sidebar').innerHTML}</div>
    </div>
    <div class="resize-handle-se"></div>
  `;
  document.body.appendChild(folderWindow);
  // Center on screen (only first open)
  centerWindowOnScreen(folderWindow);
  windowManager.register(windowId, folderWindow);
  // ... rest of createFolderWindow logic ...
  // --- Drag, z-index, and traffic light controls ---
  const headerEl = folderWindow.querySelector('.window-header');
  const closeBtn = folderWindow.querySelector('.light.red');
  const minimizeBtn = folderWindow.querySelector('.light.yellow');
  const maximizeBtn = folderWindow.querySelector('.light.green');
  const resizeHandle = folderWindow.querySelector('.resize-handle-se');
  closeBtn.addEventListener('click', () => {
    folderWindow.classList.remove('open', 'minimized', 'moved');
    setTimeout(() => folderWindow.remove(), 400);
  });
  if (maximizeBtn) maximizeBtn.addEventListener('click', () => toggleMaximizeWindow(windowId));
  if (minimizeBtn) minimizeBtn.addEventListener('click', () => minimizeWindow(windowId));
  let isDragging = false, offsetX, offsetY;
  let pendingUnmaximize = false, startX, startY;
  const dragStart = (e) => {
    const windowState = windowManager.get(windowId);
    if (e.target.classList.contains('light')) return;
    if (windowState && windowState.isMaximized) {
      pendingUnmaximize = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startY = e.clientY || (e.touches && e.touches[0].clientY);
    } else {
      pendingUnmaximize = false;
    }
    windowManager.bringToFront(windowId);
    if (!folderWindow.classList.contains('moved')) {
      const rect = folderWindow.getBoundingClientRect();
      folderWindow.style.left = `${rect.left}px`;
      folderWindow.style.top = `${rect.top}px`;
      folderWindow.classList.add('moved');
    }
    folderWindow.style.transition = 'none';
    isDragging = true;
    offsetX = (e.clientX || (e.touches && e.touches[0].clientX)) - folderWindow.offsetLeft;
    offsetY = (e.clientY || (e.touches && e.touches[0].clientY)) - folderWindow.offsetTop;
    document.addEventListener('mousemove', dragMove, { passive: false });
    document.addEventListener('touchmove', dragMove, { passive: false });
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
  };
  const dragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (pendingUnmaximize) {
      if (Math.abs(clientX - startX) > 5 || Math.abs(clientY - startY) > 5) {
        const windowState = windowManager.get(windowId);
        if (windowState && windowState.isMaximized) {
          windowState.isMaximized = false;
          folderWindow.classList.remove('maximized');
          if (headerEl) headerEl.style.cursor = 'move';
        }
        pendingUnmaximize = false;
      } else {
        return;
      }
    }
    e.preventDefault();
    folderWindow.style.left = `${clientX - offsetX}px`;
    folderWindow.style.top = `${clientY - offsetY}px`;
  };
  const dragEnd = () => {
    folderWindow.style.transition = '';
    isDragging = false;
    pendingUnmaximize = false;
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('touchmove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchend', dragEnd);
  };
  if (headerEl) {
    headerEl.addEventListener('mousedown', dragStart);
    headerEl.addEventListener('touchstart', dragStart, { passive: false });
    headerEl.addEventListener('dblclick', () => toggleMaximizeWindow(windowId));
  }
  // Resize logic (optional, similar to App Store)
  let isResizing = false, originalWidth, originalHeight, originalX, originalY;
  const resizeStart = (e) => {
    const windowState = windowManager.get(windowId);
    if (windowState && windowState.isMaximized) return;
    e.preventDefault();
    isResizing = true;
    originalWidth = parseFloat(getComputedStyle(folderWindow, null).getPropertyValue('width').replace('px', ''));
    originalHeight = parseFloat(getComputedStyle(folderWindow, null).getPropertyValue('height').replace('px', ''));
    originalX = e.clientX || (e.touches && e.touches[0].clientX);
    originalY = e.clientY || (e.touches && e.touches[0].clientY);
    folderWindow.style.transition = 'none';
    document.addEventListener('mousemove', resizeMove);
    document.addEventListener('touchmove', resizeMove);
    document.addEventListener('mouseup', resizeEnd);
    document.addEventListener('touchend', resizeEnd);
  };
  const resizeMove = (e) => {
    if (isResizing) {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const width = originalWidth + (clientX - originalX);
      const height = originalHeight + (clientY - originalY);
      if (width > 300) folderWindow.style.width = width + 'px';
      if (height > 200) folderWindow.style.height = height + 'px';
    }
  };
  const resizeEnd = () => {
    isResizing = false;
    folderWindow.style.transition = '';
    document.removeEventListener('mousemove', resizeMove);
    document.removeEventListener('touchmove', resizeMove);
    document.removeEventListener('mouseup', resizeEnd);
    document.removeEventListener('touchend', resizeEnd);
  };
  if (resizeHandle) {
    resizeHandle.addEventListener('mousedown', resizeStart);
    resizeHandle.addEventListener('touchstart', resizeStart, { passive: false });
  }
  setTimeout(() => folderWindow.classList.add('open'), 10);
}

// Patch openAppStoreWindow to center on first open
const originalOpenAppStoreWindow = openAppStoreWindow;
openAppStoreWindow = function() {
  const windowState = windowManager.get('app-store');
  if (!windowState) return;
  const windowEl = windowState.el;
  if (windowState.isMinimized) {
    restoreWindow('app-store');
  } else {
    windowEl.style.display = 'block';
    // Center on screen if not moved
    centerWindowOnScreen(windowEl);
    windowManager.bringToFront('app-store');
    setTimeout(() => {
      windowEl.classList.add('open');
    }, 10);
  }
};

// ... existing code ...
function createChromeSearchWindow() {
  // Only one Chrome window at a time
  const existing = document.getElementById('chrome-search-window');
  if (existing) {
    existing.style.display = 'block';
    setTimeout(() => existing.classList.add('open'), 10);
    windowManager.bringToFront('chrome-search');
    return;
  }
  const appStoreWindow = document.getElementById('app-store-window');
  if (!appStoreWindow) return;
  const chromeWindow = document.createElement('div');
  chromeWindow.className = 'app-window chrome-search-window moved open';
  chromeWindow.id = 'chrome-search-window';
  chromeWindow.style.display = 'block';
  chromeWindow.style.zIndex = windowManager._zIndexCounter + 1;
  chromeWindow.style.width = '80vw';
  chromeWindow.style.overflow = 'auto';

  const headerHTML = appStoreWindow.querySelector('.window-header').outerHTML;
  chromeWindow.innerHTML = `
    ${headerHTML}
    <div class="window-body" style="background:#222;display:flex;align-items:center;justify-content:center;padding:0;">
      <div style="width:100%;height:100%;background:#222;overflow:auto;">
        <div id="chrome-search-embed" style="width:100%;height:100%;padding:0;margin:0;"></div>
      </div>
    </div>
    <div class="resize-handle-se"></div>
  `;
  document.body.appendChild(chromeWindow);
  centerWindowOnScreen(chromeWindow);
  windowManager.register('chrome-search', chromeWindow);
  // --- Drag, z-index, and traffic light controls ---
  const headerEl = chromeWindow.querySelector('.window-header');
  const closeBtn = chromeWindow.querySelector('.light.red');
  const minimizeBtn = chromeWindow.querySelector('.light.yellow');
  const maximizeBtn = chromeWindow.querySelector('.light.green');
  const resizeHandle = chromeWindow.querySelector('.resize-handle-se');
  closeBtn.addEventListener('click', () => {
    chromeWindow.classList.remove('open', 'minimized', 'moved');
    setTimeout(() => chromeWindow.remove(), 400);
  });
  if (maximizeBtn) maximizeBtn.addEventListener('click', () => toggleMaximizeWindow('chrome-search'));
  if (minimizeBtn) minimizeBtn.addEventListener('click', () => minimizeWindow('chrome-search'));
  // Drag logic
  let isDragging = false, offsetX, offsetY;
  let pendingUnmaximize = false, startX, startY;
  const dragStart = (e) => {
    const windowState = windowManager.get('chrome-search');
    if (e.target.classList.contains('light')) return;
    if (windowState && windowState.isMaximized) {
      pendingUnmaximize = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startY = e.clientY || (e.touches && e.touches[0].clientY);
    } else {
      pendingUnmaximize = false;
    }
    windowManager.bringToFront('chrome-search');
    if (!chromeWindow.classList.contains('moved')) {
      const rect = chromeWindow.getBoundingClientRect();
      chromeWindow.style.left = `${rect.left}px`;
      chromeWindow.style.top = `${rect.top}px`;
      chromeWindow.classList.add('moved');
    }
    chromeWindow.style.transition = 'none';
    isDragging = true;
    offsetX = (e.clientX || (e.touches && e.touches[0].clientX)) - chromeWindow.offsetLeft;
    offsetY = (e.clientY || (e.touches && e.touches[0].clientY)) - chromeWindow.offsetTop;
    document.addEventListener('mousemove', dragMove, { passive: false });
    document.addEventListener('touchmove', dragMove, { passive: false });
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
  };
  const dragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (pendingUnmaximize) {
      if (Math.abs(clientX - startX) > 5 || Math.abs(clientY - startY) > 5) {
        const windowState = windowManager.get('chrome-search');
        if (windowState && windowState.isMaximized) {
          windowState.isMaximized = false;
          chromeWindow.classList.remove('maximized');
          if (headerEl) headerEl.style.cursor = 'move';
        }
        pendingUnmaximize = false;
      } else {
        return;
      }
    }
    e.preventDefault();
    chromeWindow.style.left = `${clientX - offsetX}px`;
    chromeWindow.style.top = `${clientY - offsetY}px`;
  };
  const dragEnd = () => {
    chromeWindow.style.transition = '';
    isDragging = false;
    pendingUnmaximize = false;
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('touchmove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchend', dragEnd);
  };
  if (headerEl) {
    headerEl.addEventListener('mousedown', dragStart);
    headerEl.addEventListener('touchstart', dragStart, { passive: false });
    headerEl.addEventListener('dblclick', () => toggleMaximizeWindow('chrome-search'));
  }
  // Resize logic
  let isResizing = false, originalWidth, originalHeight, originalX, originalY;
  const resizeStart = (e) => {
    const windowState = windowManager.get('chrome-search');
    if (windowState && windowState.isMaximized) return;
    e.preventDefault();
    isResizing = true;
    originalWidth = parseFloat(getComputedStyle(chromeWindow, null).getPropertyValue('width').replace('px', ''));
    originalHeight = parseFloat(getComputedStyle(chromeWindow, null).getPropertyValue('height').replace('px', ''));
    originalX = e.clientX || (e.touches && e.touches[0].clientX);
    originalY = e.clientY || (e.touches && e.touches[0].clientY);
    chromeWindow.style.transition = 'none';
    document.addEventListener('mousemove', resizeMove);
    document.addEventListener('touchmove', resizeMove);
    document.addEventListener('mouseup', resizeEnd);
    document.addEventListener('touchend', resizeEnd);
  };
  const resizeMove = (e) => {
    if (isResizing) {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const width = originalWidth + (clientX - originalX);
      const height = originalHeight + (clientY - originalY);
      if (width > 300) chromeWindow.style.width = width + 'px';
      if (height > 200) chromeWindow.style.height = height + 'px';
    }
  };
  const resizeEnd = () => {
    isResizing = false;
    chromeWindow.style.transition = '';
    document.removeEventListener('mousemove', resizeMove);
    document.removeEventListener('touchmove', resizeMove);
    document.removeEventListener('mouseup', resizeEnd);
    document.removeEventListener('touchend', resizeEnd);
  };
  if (resizeHandle) {
    resizeHandle.addEventListener('mousedown', resizeStart);
    resizeHandle.addEventListener('touchstart', resizeStart, { passive: false });
  }
  setTimeout(() => chromeWindow.classList.add('open'), 10);
  // Inject Bing Search Engine
  const searchContainer = chromeWindow.querySelector('#chrome-search-embed');
  searchContainer.innerHTML = `
    <div style="width:100%;height:100%;display:flex;flex-direction:column;background:#222;">
      <div style="padding:20px;text-align:center;background:#333;">
        <div style="margin:0 auto;">
          <div style="position:relative;display:flex;align-items:center;background:#fff;border-radius:24px;padding:8px 16px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:12px;">
              <path d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2Z" stroke="#666" stroke-width="2"/>
              <path d="M16 16L22 22" stroke="#666" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <input type="text" id="bing-search-input" placeholder="Search the web" style="flex:1;border:none;outline:none;font-size:16px;background:transparent;" />
            <button id="bing-search-button" style="background:#0078d4;color:#fff;border:none;border-radius:20px;padding:8px 16px;cursor:pointer;font-size:14px;font-weight:500;">Search</button>
          </div>
        </div>
      </div>
      <div id="bing-search-results" style="flex:1;padding:20px;overflow-y:auto;background:#fff;">
        <div style="text-align:center;color:#666;margin-top:50px;">
          <p>Enter a search term above to get started</p>
        </div>
      </div>
    </div>
  `;

  // Add Bing search functionality
  const searchInput = searchContainer.querySelector('#bing-search-input');
  const searchButton = searchContainer.querySelector('#bing-search-button');
  const resultsContainer = searchContainer.querySelector('#bing-search-results');

  function performBingSearch(query) {
    if (!query.trim()) return;
    
    resultsContainer.innerHTML = '<div style="text-align:center;padding:20px;"><div style="color:#666;">Searching...</div></div>';
    
    // Use Bing search URL with query parameters
    const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
    
    // Create an iframe to display Bing search results
    resultsContainer.innerHTML = `
      <iframe 
        src="${searchUrl}" 
        style="width:100%;height:100%;border:none;background:#fff;"
        title="Bing Search Results">
      </iframe>
    `;
  }

  // Handle search button click
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    performBingSearch(query);
  });

  // Handle Enter key press
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      performBingSearch(query);
    }
  });

  // Focus on search input when window opens
  setTimeout(() => {
    searchInput.focus();
  }, 100);
}

function attachChromeAppHandler() {
  // Attach after rendering start menu
  const observer = new MutationObserver(() => {
    const chromeApp = Array.from(document.querySelectorAll('.start-app')).find(app => app.textContent.trim() === 'Chrome');
    if (chromeApp && !chromeApp._chromeHandlerAttached) {
      chromeApp.addEventListener('click', function(e) {
        e.stopPropagation();
        createChromeSearchWindow();
        startMenuWindow.classList.remove('open');
      });
      chromeApp._chromeHandlerAttached = true;
    }
  });
  observer.observe(startMenuWindow, { childList: true, subtree: true });
}

// Call this after DOMContentLoaded
attachChromeAppHandler();

/**
 * Animate a widget icon with slide-in/slide-out effect
 * @param {HTMLElement} widgetEl - The .widget-icon element
 * @param {boolean} show - true for slide in, false for slide out
 * @param {Function} [callback] - Optional callback after animation
 */
function animateWidgetIcon(widgetEl, show, callback) {
  if (!widgetEl) return;
  widgetEl.classList.remove('slide-in-widget', 'slide-out-widget');
  // Force reflow to restart animation
  void widgetEl.offsetWidth;
  if (show) {
    widgetEl.classList.add('slide-in-widget');
    widgetEl.classList.remove('slide-out-widget');
  } else {
    widgetEl.classList.add('slide-out-widget');
    widgetEl.classList.remove('slide-in-widget');
  }
  if (callback) {
    widgetEl.addEventListener('animationend', function handler() {
      widgetEl.removeEventListener('animationend', handler);
      callback();
    });
  }
}

// Apply to all widget icons on panel open/close
function applyWidgetAnimations(show) {
  const widgetIcons = document.querySelectorAll('.widget-icon');
  widgetIcons.forEach(icon => animateWidgetIcon(icon, show));
}

// Patch toggleWidgetsPanel to use animation
const originalToggleWidgetsPanel = toggleWidgetsPanel;
toggleWidgetsPanel = function(e) {
  const isOpen = widgetsPanel.classList.contains('open');
  if (!isOpen) {
    applyWidgetAnimations(true);
  } else {
    applyWidgetAnimations(false);
  }
  // Call original logic
  originalToggleWidgetsPanel.call(this, e);
};

// Optionally, animate on initial render
function animateWidgetsOnRender() {
  applyWidgetAnimations(true);
}
// Call after widgetsPanel is rendered
  
// --- NOTEPAD WINDOW FUNCTIONALITY ---
function createNotepadWindow() {
  if (document.getElementById('notepad-window')) {
    // If already open, bring to front
    windowManager.bringToFront('notepad');
    const win = document.getElementById('notepad-window');
    win.style.display = 'block';
    setTimeout(() => win.classList.add('open'), 10);
    return;
  }
  const appStoreWindow = document.getElementById('app-store-window');
  const notepadWindow = document.createElement('div');
  notepadWindow.className = 'app-window notepad-window moved open';
  notepadWindow.id = 'notepad-window';
  notepadWindow.style.zIndex = windowManager._zIndexCounter + 1;
  notepadWindow.style.width = '500px';
  notepadWindow.style.height = '400px';
  notepadWindow.innerHTML = `
    <div class="window-header">
      <div class="traffic-lights">
        <div class="light red"></div>
        <div class="light yellow"></div>
        <div class="light green"></div>
      </div>
      <div class="notepad-title" style="color:white;font-size:15px;font-weight:500;">Notepad</div>
    </div>
    <div class="font-resizer-bar" style="display:flex;align-items:center;justify-content:flex-end;padding:6px 16px 2px 16px;background:#f7f7f7;border-bottom:1px solid #eee;gap:8px;">
      <span style="font-size:0.95em;color:#444;margin-right:8px;">Font size:</span>
      <button id="notepad-font-decrease" style="font-size:1em;padding:2px 8px;">A-</button>
      <button id="notepad-font-increase" style="font-size:1.15em;padding:2px 8px;">A+</button>
      <button id="notepad-bold-btn" title="Bold" style="font-weight:bold;font-size:1.1em;padding:2px 8px;">B</button>
      <button id="notepad-italic-btn" title="Italic" style="font-style:italic;font-size:1.1em;padding:2px 8px;">I</button>
      <input id="notepad-color-input" type="color" title="Text Color" style="width:28px;height:28px;padding:0;border:none;background:none;cursor:pointer;" />
    </div>
    <div class="window-body" style="background:#fff;display:flex;align-items:stretch;justify-content:center;padding:0;">
      <textarea id="notepad-textarea" style="width:100%;height:100%;border:none;outline:none;resize:none;font-size:1em;padding:16px;background:#fff;color:#222;font-family:monospace;"></textarea>
    </div>
    <div class="resize-handle-se"></div>
  `;
  document.body.appendChild(notepadWindow);
  centerWindowOnScreen(notepadWindow);
  windowManager.register('notepad', notepadWindow);
  // Font resizer logic
  let fontSize = 1.0;
  const textarea = notepadWindow.querySelector('#notepad-textarea');
  const btnInc = notepadWindow.querySelector('#notepad-font-increase');
  const btnDec = notepadWindow.querySelector('#notepad-font-decrease');
  const btnBold = notepadWindow.querySelector('#notepad-bold-btn');
  const btnItalic = notepadWindow.querySelector('#notepad-italic-btn');
  const colorInput = notepadWindow.querySelector('#notepad-color-input');
  btnInc.addEventListener('click', () => {
    if (fontSize < 3.0) fontSize += 0.1;
    textarea.style.fontSize = fontSize.toFixed(2) + 'em';
  });
  btnDec.addEventListener('click', () => {
    if (fontSize > 0.5) fontSize -= 0.1;
    textarea.style.fontSize = fontSize.toFixed(2) + 'em';
  });
  // Font style logic
  let isBold = false;
  let isItalic = false;
  btnBold.addEventListener('click', () => {
    isBold = !isBold;
    textarea.style.fontWeight = isBold ? 'bold' : 'normal';
    btnBold.style.background = isBold ? '#e0e0e0' : '';
  });
  btnItalic.addEventListener('click', () => {
    isItalic = !isItalic;
    textarea.style.fontStyle = isItalic ? 'italic' : 'normal';
    btnItalic.style.background = isItalic ? '#e0e0e0' : '';
  });
  colorInput.addEventListener('input', (e) => {
    textarea.style.color = e.target.value;
  });
  // --- Drag, z-index, and traffic light controls ---
  const headerEl = notepadWindow.querySelector('.window-header');
  const closeBtn = notepadWindow.querySelector('.light.red');
  const minimizeBtn = notepadWindow.querySelector('.light.yellow');
  const maximizeBtn = notepadWindow.querySelector('.light.green');
  const resizeHandle = notepadWindow.querySelector('.resize-handle-se');
  closeBtn.addEventListener('click', () => {
    notepadWindow.classList.remove('open', 'minimized', 'moved');
    setTimeout(() => notepadWindow.remove(), 400);
    const taskbarIcon = document.getElementById('taskbar-icon-notepad');
    if (taskbarIcon) taskbarIcon.remove();
  });
  if (maximizeBtn) maximizeBtn.addEventListener('click', () => toggleMaximizeWindow('notepad'));
  if (minimizeBtn) minimizeBtn.addEventListener('click', () => minimizeWindow('notepad'));
  // Drag logic
  let isDragging = false, offsetX, offsetY;
  let pendingUnmaximize = false, startX, startY;
  const dragStart = (e) => {
    const windowState = windowManager.get('notepad');
    if (e.target.classList.contains('light')) return;
    if (windowState && windowState.isMaximized) {
      pendingUnmaximize = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startY = e.clientY || (e.touches && e.touches[0].clientY);
    } else {
      pendingUnmaximize = false;
    }
    windowManager.bringToFront('notepad');
    if (!notepadWindow.classList.contains('moved')) {
      const rect = notepadWindow.getBoundingClientRect();
      notepadWindow.style.left = `${rect.left}px`;
      notepadWindow.style.top = `${rect.top}px`;
      notepadWindow.classList.add('moved');
    }
    notepadWindow.style.transition = 'none';
    isDragging = true;
    offsetX = (e.clientX || (e.touches && e.touches[0].clientX)) - notepadWindow.offsetLeft;
    offsetY = (e.clientY || (e.touches && e.touches[0].clientY)) - notepadWindow.offsetTop;
    document.addEventListener('mousemove', dragMove, { passive: false });
    document.addEventListener('touchmove', dragMove, { passive: false });
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
  };
  const dragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (pendingUnmaximize) {
      if (Math.abs(clientX - startX) > 5 || Math.abs(clientY - startY) > 5) {
        const windowState = windowManager.get('notepad');
        if (windowState && windowState.isMaximized) {
          windowState.isMaximized = false;
          notepadWindow.classList.remove('maximized');
          if (headerEl) headerEl.style.cursor = 'move';
        }
        pendingUnmaximize = false;
      } else {
        return;
      }
    }
    e.preventDefault();
    notepadWindow.style.left = `${clientX - offsetX}px`;
    notepadWindow.style.top = `${clientY - offsetY}px`;
  };
  const dragEnd = () => {
    notepadWindow.style.transition = '';
    isDragging = false;
    pendingUnmaximize = false;
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('touchmove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchend', dragEnd);
  };
  if (headerEl) {
    headerEl.addEventListener('mousedown', dragStart);
    headerEl.addEventListener('touchstart', dragStart, { passive: false });
    headerEl.addEventListener('dblclick', () => toggleMaximizeWindow('notepad'));
  }
  // Resize logic
  let isResizing = false, originalWidth, originalHeight, originalX, originalY;
  const resizeStart = (e) => {
    const windowState = windowManager.get('notepad');
    if (windowState && windowState.isMaximized) return;
    e.preventDefault();
    isResizing = true;
    originalWidth = parseFloat(getComputedStyle(notepadWindow, null).getPropertyValue('width').replace('px', ''));
    originalHeight = parseFloat(getComputedStyle(notepadWindow, null).getPropertyValue('height').replace('px', ''));
    originalX = e.clientX || (e.touches && e.touches[0].clientX);
    originalY = e.clientY || (e.touches && e.touches[0].clientY);
    notepadWindow.style.transition = 'none';
    document.addEventListener('mousemove', resizeMove);
    document.addEventListener('touchmove', resizeMove);
    document.addEventListener('mouseup', resizeEnd);
    document.addEventListener('touchend', resizeEnd);
  };
  const resizeMove = (e) => {
    if (isResizing) {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const width = originalWidth + (clientX - originalX);
      const height = originalHeight + (clientY - originalY);
      if (width > 300) notepadWindow.style.width = width + 'px';
      if (height > 200) notepadWindow.style.height = height + 'px';
    }
  };
  const resizeEnd = () => {
    isResizing = false;
    notepadWindow.style.transition = '';
    document.removeEventListener('mousemove', resizeMove);
    document.removeEventListener('touchmove', resizeMove);
    document.removeEventListener('mouseup', resizeEnd);
    document.removeEventListener('touchend', resizeEnd);
  };
  if (resizeHandle) {
    resizeHandle.addEventListener('mousedown', resizeStart);
    resizeHandle.addEventListener('touchstart', resizeStart, { passive: false });
  }
  setTimeout(() => notepadWindow.classList.add('open'), 10);
  // Add to taskbar
  createTaskbarIcon('notepad');
}

function attachNotepadAppHandler() {
  // Attach after rendering start menu
  const observer = new MutationObserver(() => {
    const notepadApp = document.querySelector('.notepad-app');
    if (notepadApp && !notepadApp._notepadHandlerAttached) {
      notepadApp.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        createNotepadWindow();
        startMenuWindow.classList.remove('open');
      });
      notepadApp._notepadHandlerAttached = true;
    }
  });
  observer.observe(startMenuWindow, { childList: true, subtree: true });
}

// --- APP STORE FOLDER NAVIGATION ---

// Simulated file system
const appStoreFileSystem = {
  "Applications": {
    "Photoshop": {},
    "Linkedin": {},
    "VS Code": {},
    "Slack": {},
    "Figma": {},
    "Zoom": {},
    "Spotify": {},
    "Notion": {},
    "GitHub Desktop": {},
    // Add more apps as needed
  },
  "User Cloud": {
    "Pratik Personal": {
      "Documents": {},
    },
    "Music": {
      "Favourites": {},
    },
    "Videos": {
      "Saved": {},
    }
  }
};

let appStoreCurrentPath = [];

function renderAppStoreFolderContents() {
  const appStoreWindow = document.getElementById('app-store-window');
  if (!appStoreWindow) return;
  const storageList = appStoreWindow.querySelector('.storage-list');
  if (!storageList) return;

  // Clear previous contents
  storageList.innerHTML = '';

  if (appStoreCurrentPath.length === 0) {
    // Render the original static HTML for the root
    storageList.innerHTML = `
      <div class="storage-item">
        <div class="item-icon user-folder">
          <svg width="800px" height="800px" viewBox="0 -4 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                  <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-519.000000, -781.000000)" fill="white">
                      <path d="M542.067,786.028 C540.599,783.053 537.543,781 534,781 C529.251,781 525.37,784.682 525.033,789.345 C521.542,790.34 519,793.39 519,797 C519,801.26 522.54,804.755 527,805 L542,805 C546.966,805 551,800.747 551,795.5 C551,790.444 547.049,786.323 542.067,786.028" id="cloud" sketch:type="MSShapeGroup"></path>
                  </g>
              </g>
          </svg>
        </div>
        <div class="item-details">
            <div class="item-name">User Cloud</div>
            <div class="item-description">Personal files & documents</div>
        </div>
        <div class="item-progress">
            <div class="item-progress-bar">
                <div class="item-progress-fill" style="width: 80%;"></div>
            </div>
            <div class="item-progress-text">80%</div>
        </div>
        <div class="item-size">200 GB</div>
      </div>
      <div class="storage-item">
        <div class="item-icon app-folder"><svg width="800px" height="800px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <title>apps-large-solid</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="invisible_box" data-name="invisible box">
              <rect width="48" height="48" fill="none"/>
            </g>
            <g id="Q3_icons" data-name="Q3 icons">
              <g>
                <path d="M20,4H6A2,2,0,0,0,4,6V20a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V6A2,2,0,0,0,20,4Z"/>
                <path d="M42,4H28a2,2,0,0,0-2,2V20a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V6A2,2,0,0,0,42,4Z"/>
                <path d="M20,26H6a2,2,0,0,0-2,2V42a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V28A2,2,0,0,0,20,26Z"/>
                <path d="M42,26H28a2,2,0,0,0-2,2V42a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V28A2,2,0,0,0,42,26Z"/>
              </g>
            </g>
          </g>
        </svg></div>
        <div class="item-details">
            <div class="item-name">Applications</div>
            <div class="item-description">Installed Applications</div>
        </div>
        <div class="item-progress">
            <div class="item-progress-bar">
                <div class="item-progress-fill" style="width: 20%;"></div>
            </div>
            <div class="item-progress-text">20%</div>
        </div>
        <div class="item-size">100 GB</div>
      </div>
    `;
    // Add double-click handlers for root items
    const items = storageList.querySelectorAll('.storage-item');
    items[0].ondblclick = () => {
      appStoreCurrentPath.push('User Cloud');
      renderAppStoreFolderContents();
    };
    items[1].ondblclick = () => {
      appStoreCurrentPath.push('Applications');
      renderAppStoreFolderContents();
    };
    return;
  }

  // Back button
  const existingBackBtn = storageList.querySelector('.start-over-link');
  if (existingBackBtn) existingBackBtn.remove();
  if (appStoreCurrentPath.length > 0) {
    const backBtn = document.createElement('a');
    backBtn.href = '#';
    backBtn.textContent = '← Back';
    backBtn.className = 'start-over-link';
    backBtn.onclick = (e) => {
      e.preventDefault();
      appStoreCurrentPath.pop();
      renderAppStoreFolderContents();
    };
    storageList.appendChild(backBtn);
  }

  // Breadcrumb
  const breadcrumb = document.createElement('div');
  breadcrumb.className = 'storage-nav';
  breadcrumb.style.margin = '8px 0';
  breadcrumb.innerHTML = '<span class="path-item">' + (['Root', ...appStoreCurrentPath].join(' / ')) + '</span>';
  storageList.appendChild(breadcrumb);

  // Get current folder object
  let currentFolder = appStoreFileSystem;
  for (const key of appStoreCurrentPath) {
    currentFolder = currentFolder[key];
  }

  // Render folders
  Object.keys(currentFolder).forEach(folderName => {
    const folderDiv = document.createElement('div');
    folderDiv.className = 'storage-item';
    let iconHTML = '<div class="item-icon user-folder"></div>';
    if (folderName === 'Pratik Personal') {
      iconHTML = `<div class="item-icon user-folder">` +
        `<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"style=fill\"><g id=\"profile\"><path id=\"vector (Stroke)\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z\" fill=\"#fff\"/><path id=\"rec (Stroke)\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z\" fill=\"#fff\"/></g></g></svg>` +
        `</div>`;
    } else if (folderName === 'Music') {
      iconHTML = `<div class=\"item-icon user-folder\">` +
        `<svg width=\"24\" height=\"24\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15 1H4V9H3C1.34315 9 0 10.3431 0 12C0 13.6569 1.34315 15 3 15C4.65685 15 6 13.6569 6 12V5H13V9H12C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V1Z\" fill=\"#fff\"/></svg>` +
        `</div>`;
    } else if (folderName === 'Videos') {
      iconHTML = `<div class=\"item-icon user-folder\">` +
        `<svg width=\"24\" height=\"24\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16 2H0V14H16V2ZM6.5 5V11H7.5L11 8L7.5 5H6.5Z\" fill=\"#fff\"/></svg>` +
        `</div>`;
    }
    folderDiv.innerHTML = `
      ${iconHTML}
      <div class="item-details">
        <div class="item-name">${folderName}</div>
      </div>
    `;
    folderDiv.ondblclick = () => {
      appStoreCurrentPath.push(folderName);
      renderAppStoreFolderContents();
    };
    storageList.appendChild(folderDiv);
  });
}

// Attach navigation to app-store-window when opened
function attachAppStoreFolderNavigation() {
  const appStoreWindow = document.getElementById('app-store-window');
  if (!appStoreWindow) return;
  const storageList = appStoreWindow.querySelector('.storage-list');
  if (!storageList) return;
  // Only attach once
  if (storageList._folderNavAttached) return;
  storageList._folderNavAttached = true;
  renderAppStoreFolderContents();
}

// Patch openAppStoreWindow to initialize navigation
if (!window.originalOpenAppStoreWindow) {
  window.originalOpenAppStoreWindow = openAppStoreWindow;
  openAppStoreWindow = function() {
    window.originalOpenAppStoreWindow.apply(this, arguments);
    setTimeout(attachAppStoreFolderNavigation, 50);
  };
}
  
// --- CAMERA APP FUNCTIONALITY ---
function createCameraWindow() {
  if (document.getElementById('camera-window')) {
    // If already open, bring to front
    windowManager.bringToFront('camera');
    const win = document.getElementById('camera-window');
    win.style.display = 'block';
    setTimeout(() => win.classList.add('open'), 10);
    return;
  }
  const cameraWindow = document.createElement('div');
  cameraWindow.className = 'app-window camera-window moved open';
  cameraWindow.id = 'camera-window';
  cameraWindow.style.zIndex = windowManager._zIndexCounter + 1;
  cameraWindow.style.width = '480px';
  cameraWindow.style.height = '380px';
  cameraWindow.innerHTML = `
    <div class="window-header">
      <div class="traffic-lights">
        <div class="light red"></div>
        <div class="light yellow"></div>
        <div class="light green"></div>
      </div>
      <div class="camera-title" style="color:white;font-size:15px;font-weight:500;">Camera</div>
    </div>
    <div class="window-body" style="background:#111;display:flex;align-items:center;justify-content:center;padding:0;position:relative;flex-direction:column;">
      <video id="camera-video" autoplay playsinline style="width:100%;height:100%;object-fit:cover;border-radius:8px;"></video>
      <button id="take-picture-btn" style="position:absolute;bottom:18px;left:50%;transform:translateX(-50%);padding:10px 24px;background:#fff;color:#222;border:none;border-radius:20px;font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,0.15);cursor:pointer;z-index:2;">Take Picture</button>
    </div>
    <div class="resize-handle-se"></div>
  `;
  document.body.appendChild(cameraWindow);
  centerWindowOnScreen(cameraWindow);
  windowManager.register('camera', cameraWindow);
  // Close logic
  const closeBtn = cameraWindow.querySelector('.light.red');
  closeBtn.addEventListener('click', () => {
    cameraWindow.classList.remove('open', 'minimized', 'moved');
    setTimeout(() => {
      // Stop the camera stream
      const video = cameraWindow.querySelector('#camera-video');
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
      }
      cameraWindow.remove();
    }, 400);
    const taskbarIcon = document.getElementById('taskbar-icon-camera');
    if (taskbarIcon) taskbarIcon.remove();
  });
  // Drag, z-index, and traffic light controls (reuse from notepad)
  const headerEl = cameraWindow.querySelector('.window-header');
  const minimizeBtn = cameraWindow.querySelector('.light.yellow');
  const maximizeBtn = cameraWindow.querySelector('.light.green');
  const resizeHandle = cameraWindow.querySelector('.resize-handle-se');
  if (maximizeBtn) maximizeBtn.addEventListener('click', () => toggleMaximizeWindow('camera'));
  if (minimizeBtn) minimizeBtn.addEventListener('click', () => minimizeWindow('camera'));
  let isDragging = false, offsetX, offsetY;
  let pendingUnmaximize = false, startX, startY;
  const dragStart = (e) => {
    const windowState = windowManager.get('camera');
    if (e.target.classList.contains('light')) return;
    if (windowState && windowState.isMaximized) {
      pendingUnmaximize = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startY = e.clientY || (e.touches && e.touches[0].clientY);
    } else {
      pendingUnmaximize = false;
    }
    windowManager.bringToFront('camera');
    if (!cameraWindow.classList.contains('moved')) {
      const rect = cameraWindow.getBoundingClientRect();
      cameraWindow.style.left = `${rect.left}px`;
      cameraWindow.style.top = `${rect.top}px`;
      cameraWindow.classList.add('moved');
    }
    cameraWindow.style.transition = 'none';
    isDragging = true;
    offsetX = (e.clientX || (e.touches && e.touches[0].clientX)) - cameraWindow.offsetLeft;
    offsetY = (e.clientY || (e.touches && e.touches[0].clientY)) - cameraWindow.offsetTop;
    document.addEventListener('mousemove', dragMove, { passive: false });
    document.addEventListener('touchmove', dragMove, { passive: false });
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
  };
  const dragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (pendingUnmaximize) {
      if (Math.abs(clientX - startX) > 5 || Math.abs(clientY - startY) > 5) {
        const windowState = windowManager.get('camera');
        if (windowState && windowState.isMaximized) {
          windowState.isMaximized = false;
          cameraWindow.classList.remove('maximized');
          if (headerEl) headerEl.style.cursor = 'move';
        }
        pendingUnmaximize = false;
      } else {
        return;
      }
    }
    e.preventDefault();
    cameraWindow.style.left = `${clientX - offsetX}px`;
    cameraWindow.style.top = `${clientY - offsetY}px`;
  };
  const dragEnd = () => {
    cameraWindow.style.transition = '';
    isDragging = false;
    pendingUnmaximize = false;
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('touchmove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchend', dragEnd);
  };
  if (headerEl) {
    headerEl.addEventListener('mousedown', dragStart);
    headerEl.addEventListener('touchstart', dragStart, { passive: false });
    headerEl.addEventListener('dblclick', () => toggleMaximizeWindow('camera'));
  }
  // Resize logic (reuse from notepad)
  let isResizing = false, originalWidth, originalHeight, originalX, originalY;
  const resizeStart = (e) => {
    const windowState = windowManager.get('camera');
    if (windowState && windowState.isMaximized) return;
    e.preventDefault();
    isResizing = true;
    originalWidth = parseFloat(getComputedStyle(cameraWindow, null).getPropertyValue('width').replace('px', ''));
    originalHeight = parseFloat(getComputedStyle(cameraWindow, null).getPropertyValue('height').replace('px', ''));
    originalX = e.clientX || (e.touches && e.touches[0].clientX);
    originalY = e.clientY || (e.touches && e.touches[0].clientY);
    cameraWindow.style.transition = 'none';
    document.addEventListener('mousemove', resizeMove);
    document.addEventListener('touchmove', resizeMove);
    document.addEventListener('mouseup', resizeEnd);
    document.addEventListener('touchend', resizeEnd);
  };
  const resizeMove = (e) => {
    if (isResizing) {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const width = originalWidth + (clientX - originalX);
      const height = originalHeight + (clientY - originalY);
      if (width > 300) cameraWindow.style.width = width + 'px';
      if (height > 200) cameraWindow.style.height = height + 'px';
    }
  };
  const resizeEnd = () => {
    isResizing = false;
    cameraWindow.style.transition = '';
    document.removeEventListener('mousemove', resizeMove);
    document.removeEventListener('touchmove', resizeMove);
    document.removeEventListener('mouseup', resizeEnd);
    document.removeEventListener('touchend', resizeEnd);
  };
  if (resizeHandle) {
    resizeHandle.addEventListener('mousedown', resizeStart);
    resizeHandle.addEventListener('touchstart', resizeStart, { passive: false });
  }
  setTimeout(() => cameraWindow.classList.add('open'), 10);
  // Start webcam
  const video = cameraWindow.querySelector('#camera-video');
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        video.srcObject = stream;
      })
      .catch(err => {
        video.poster = '';
        video.style.background = '#222';
        video.style.display = 'flex';
        video.style.alignItems = 'center';
        video.style.justifyContent = 'center';
        video.style.color = '#fff';
        video.style.fontSize = '1.1em';
        video.style.textAlign = 'center';
        video.srcObject = null;
        video.innerHTML = 'Camera access denied or not available.';
      });
  } else {
    video.innerHTML = 'Camera not supported.';
  }
  // Add to taskbar (optional)
  createTaskbarIcon('camera');

  // Take Picture functionality
  const takePictureBtn = cameraWindow.querySelector('#take-picture-btn');
  takePictureBtn.addEventListener('click', () => {
    // Create a canvas to capture the frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Get image data URL
    const imageData = canvas.toDataURL('image/png');
    // Save to simulated file system
    if (!appStoreFileSystem['User Cloud']['Pratik Personal']['Pictures']) {
      appStoreFileSystem['User Cloud']['Pratik Personal']['Pictures'] = {};
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    appStoreFileSystem['User Cloud']['Pratik Personal']['Pictures'][`Photo_${timestamp}.png`] = imageData;
    // Feedback to user
    takePictureBtn.textContent = 'Saved!';
    setTimeout(() => { takePictureBtn.textContent = 'Take Picture'; }, 1200);
  });
}

// Attach double-click to Camera icon in Start Menu
function attachCameraAppHandler() {
  document.addEventListener('dblclick', function(e) {
    const cameraApp = e.target.closest('.start-app[title="Camera"]');
    if (cameraApp) {
      e.stopPropagation();
      createCameraWindow();
    }
  });
}
attachCameraAppHandler();

// --- IMAGE VIEWER FUNCTIONALITY ---
function createImageViewerWindow(imageName, imageDataUrl) {
  const windowId = `image-viewer-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  const imageWindow = document.createElement('div');
  imageWindow.className = 'app-window image-viewer-window moved open';
  imageWindow.id = windowId;
  imageWindow.style.zIndex = windowManager._zIndexCounter + 1;
  imageWindow.style.width = '520px';
  imageWindow.style.height = '420px';
  imageWindow.innerHTML = `
    <div class="window-header">
      <div class="traffic-lights">
        <div class="light red"></div>
        <div class="light yellow"></div>
        <div class="light green"></div>
      </div>
      <div class="image-title" style="color:white;font-size:15px;font-weight:500;">${imageName}</div>
    </div>
    <div class="window-body" style="background:#222;display:flex;align-items:center;justify-content:center;padding:0;position:relative;flex-direction:column;">
      <img id="image-viewer-img" src="${imageDataUrl}" alt="${imageName}" style="max-width:100%;max-height:100%;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,0.25);background:#222;transition:transform 0.2s;" />
      <div id="image-viewer-controls" style="position:absolute;bottom:18px;left:50%;transform:translateX(-50%);display:flex;gap:12px;z-index:2;">
        <button id="zoom-in-btn" style="padding:7px 14px;border-radius:16px;border:none;background:#fff;color:#222;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.10);">+</button>
        <button id="zoom-out-btn" style="padding:7px 14px;border-radius:16px;border:none;background:#fff;color:#222;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.10);">-</button>
        <button id="rotate-left-btn" style="padding:7px 14px;border-radius:16px;border:none;background:#fff;color:#222;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.10);">⟲</button>
        <button id="rotate-right-btn" style="padding:7px 14px;border-radius:16px;border:none;background:#fff;color:#222;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.10);">⟳</button>
      </div>
    </div>
    <div class="resize-handle-se"></div>
  `;
  document.body.appendChild(imageWindow);
  centerWindowOnScreen(imageWindow);
  windowManager.register(windowId, imageWindow);
  // Close logic
  const closeBtn = imageWindow.querySelector('.light.red');
  closeBtn.addEventListener('click', () => {
    imageWindow.classList.remove('open', 'minimized', 'moved');
    setTimeout(() => imageWindow.remove(), 400);
    const taskbarIcon = document.getElementById(`taskbar-icon-${windowId}`);
    if (taskbarIcon) taskbarIcon.remove();
  });
  // Drag, z-index, and traffic light controls (reuse from notepad)
  const headerEl = imageWindow.querySelector('.window-header');
  const minimizeBtn = imageWindow.querySelector('.light.yellow');
  const maximizeBtn = imageWindow.querySelector('.light.green');
  const resizeHandle = imageWindow.querySelector('.resize-handle-se');
  if (maximizeBtn) maximizeBtn.addEventListener('click', () => toggleMaximizeWindow(windowId));
  if (minimizeBtn) minimizeBtn.addEventListener('click', () => minimizeWindow(windowId));
  let isDragging = false, offsetX, offsetY;
  let pendingUnmaximize = false, startX, startY;
  const dragStart = (e) => {
    const windowState = windowManager.get(windowId);
    if (e.target.classList.contains('light')) return;
    if (windowState && windowState.isMaximized) {
      pendingUnmaximize = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startY = e.clientY || (e.touches && e.touches[0].clientY);
    } else {
      pendingUnmaximize = false;
    }
    windowManager.bringToFront(windowId);
    if (!imageWindow.classList.contains('moved')) {
      const rect = imageWindow.getBoundingClientRect();
      imageWindow.style.left = `${rect.left}px`;
      imageWindow.style.top = `${rect.top}px`;
      imageWindow.classList.add('moved');
    }
    imageWindow.style.transition = 'none';
    isDragging = true;
    offsetX = (e.clientX || (e.touches && e.touches[0].clientX)) - imageWindow.offsetLeft;
    offsetY = (e.clientY || (e.touches && e.touches[0].clientY)) - imageWindow.offsetTop;
    document.addEventListener('mousemove', dragMove, { passive: false });
    document.addEventListener('touchmove', dragMove, { passive: false });
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
  };
  const dragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (pendingUnmaximize) {
      if (Math.abs(clientX - startX) > 5 || Math.abs(clientY - startY) > 5) {
        const windowState = windowManager.get(windowId);
        if (windowState && windowState.isMaximized) {
          windowState.isMaximized = false;
          imageWindow.classList.remove('maximized');
          if (headerEl) headerEl.style.cursor = 'move';
        }
        pendingUnmaximize = false;
      } else {
        return;
      }
    }
    e.preventDefault();
    imageWindow.style.left = `${clientX - offsetX}px`;
    imageWindow.style.top = `${clientY - offsetY}px`;
  };
  const dragEnd = () => {
    imageWindow.style.transition = '';
    isDragging = false;
    pendingUnmaximize = false;
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('touchmove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchend', dragEnd);
  };
  if (headerEl) {
    headerEl.addEventListener('mousedown', dragStart);
    headerEl.addEventListener('touchstart', dragStart, { passive: false });
    headerEl.addEventListener('dblclick', () => toggleMaximizeWindow(windowId));
  }
  // Resize logic (reuse from notepad)
  let isResizing = false, originalWidth, originalHeight, originalX, originalY;
  const resizeStart = (e) => {
    const windowState = windowManager.get(windowId);
    if (windowState && windowState.isMaximized) return;
    e.preventDefault();
    isResizing = true;
    originalWidth = parseFloat(getComputedStyle(imageWindow, null).getPropertyValue('width').replace('px', ''));
    originalHeight = parseFloat(getComputedStyle(imageWindow, null).getPropertyValue('height').replace('px', ''));
    originalX = e.clientX || (e.touches && e.touches[0].clientX);
    originalY = e.clientY || (e.touches && e.touches[0].clientY);
    imageWindow.style.transition = 'none';
    document.addEventListener('mousemove', resizeMove);
    document.addEventListener('touchmove', resizeMove);
    document.addEventListener('mouseup', resizeEnd);
    document.addEventListener('touchend', resizeEnd);
  };
  const resizeMove = (e) => {
    if (isResizing) {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const width = originalWidth + (clientX - originalX);
      const height = originalHeight + (clientY - originalY);
      if (width > 300) imageWindow.style.width = width + 'px';
      if (height > 200) imageWindow.style.height = height + 'px';
    }
  };
  const resizeEnd = () => {
    isResizing = false;
    imageWindow.style.transition = '';
    document.removeEventListener('mousemove', resizeMove);
    document.removeEventListener('touchmove', resizeMove);
    document.removeEventListener('mouseup', resizeEnd);
    document.removeEventListener('touchend', resizeEnd);
  };
  if (resizeHandle) {
    resizeHandle.addEventListener('mousedown', resizeStart);
    resizeHandle.addEventListener('touchstart', resizeStart, { passive: false });
  }
  setTimeout(() => imageWindow.classList.add('open'), 10);

  // Image controls logic
  const img = imageWindow.querySelector('#image-viewer-img');
  let zoom = 1;
  let rotation = 0;
  const updateTransform = () => {
    img.style.transform = `scale(${zoom}) rotate(${rotation}deg)`;
  };
  imageWindow.querySelector('#zoom-in-btn').onclick = () => {
    zoom = Math.min(zoom + 0.2, 5);
    updateTransform();
  };
  imageWindow.querySelector('#zoom-out-btn').onclick = () => {
    zoom = Math.max(zoom - 0.2, 0.2);
    updateTransform();
  };
  imageWindow.querySelector('#rotate-left-btn').onclick = () => {
    rotation -= 90;
    updateTransform();
  };
  imageWindow.querySelector('#rotate-right-btn').onclick = () => {
    rotation += 90;
    updateTransform();
  };
}

// Patch renderAppStoreFolderContents to add double-click for images in Pratik Personal / Pictures
const originalRenderAppStoreFolderContents = renderAppStoreFolderContents;
renderAppStoreFolderContents = function() {
  originalRenderAppStoreFolderContents.apply(this, arguments);
  // After rendering, add double-click for images if in Pictures folder
  const appStoreWindow = document.getElementById('app-store-window');
  if (!appStoreWindow) return;
  const storageList = appStoreWindow.querySelector('.storage-list');
  if (!storageList) return;
  // Check if current path is Root / User Cloud / Pratik Personal / Pictures
  if (Array.isArray(appStoreCurrentPath) && appStoreCurrentPath.join('/') === 'User Cloud/Pratik Personal/Pictures') {
    // Find all image items (folders/files)
    Array.from(storageList.querySelectorAll('.storage-item')).forEach(item => {
      const nameEl = item.querySelector('.item-name');
      if (nameEl && nameEl.textContent.startsWith('Photo_')) {
        item.ondblclick = () => {
          const imageName = nameEl.textContent;
          const imageDataUrl = appStoreFileSystem['User Cloud']['Pratik Personal']['Pictures'][imageName];
          if (imageDataUrl) {
            createImageViewerWindow(imageName, imageDataUrl);
          }
        };
      }
    });
  }
};
