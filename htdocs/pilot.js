(() => {
  const securityItems = [
    ['CSP', 'self-only policy, no framing'],
    ['HSTS', 'HTTPS forced at edge'],
    ['NoSniff', 'MIME hardening'],
    ['Permissions', 'device APIs locked'],
    ['COOP/CORP', 'origin isolation'],
    ['Cache', 'HTML never stale']
  ];

  function text(id, fallback = '-') {
    return document.getElementById(id)?.textContent?.trim() || fallback;
  }

  function activePhase() {
    const activeCard = document.querySelector('.card.active');
    if (!activeCard) return 'Standby';
    return activeCard.querySelector('.s-title')?.textContent?.trim() || 'Active';
  }

  function activeTimer() {
    const activeCard = document.querySelector('.card.active');
    if (!activeCard) return text('slotTime');
    return activeCard.querySelector('.time-left')?.textContent?.trim() || text('slotTime');
  }

  function createRibbon() {
    if (document.getElementById('pilot-command-ribbon')) return;

    document.body.classList.add('pilot-commercial');
    const ribbon = document.createElement('section');
    ribbon.id = 'pilot-command-ribbon';
    ribbon.setAttribute('aria-label', 'Pilot command status');
    ribbon.innerHTML = `
      <div class="pilot-metric">
        <span class="k">Current Mission</span>
        <span class="v" id="pilot-current-class">-</span>
        <span class="s" id="pilot-current-sub">-</span>
      </div>
      <div class="pilot-metric">
        <span class="k">Phase Lock</span>
        <span class="v" id="pilot-phase">-</span>
        <span class="s" id="pilot-phase-sub">-</span>
      </div>
      <div class="pilot-metric">
        <span class="k">Calendar Signal</span>
        <span class="v" id="pilot-calendar">-</span>
        <span class="s" id="pilot-clock">-</span>
      </div>
      <div class="pilot-metric security">
        <span class="k">Security Posture</span>
        <span class="v"><span class="pilot-live-dot"></span>Hardened</span>
        <span class="s">CSP / HSTS / Frame lock / API denylist</span>
      </div>`;

    const miniSchedule = document.getElementById('mini-schedule');
    miniSchedule?.insertAdjacentElement('afterend', ribbon);
  }

  function setShieldOpen(open) {
    const panel = document.getElementById('pilot-shield-panel');
    const button = document.getElementById('pilot-shield-button');
    if (!panel) return;

    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    panel.toggleAttribute('inert', !open);
    button?.setAttribute('aria-expanded', String(open));
  }

  function setFocusMode(open) {
    document.body.classList.toggle('pilot-focus-mode', open);
    document.getElementById('pilot-focus-button')?.setAttribute('aria-pressed', String(open));
  }

  function createShieldPanel() {
    if (document.getElementById('pilot-shield-panel')) return;

    const panel = document.createElement('aside');
    panel.id = 'pilot-shield-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Pilot security console');
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('inert', '');
    panel.innerHTML = `
      <div class="pilot-shield-title">
        <span>Pilot Security Console</span>
        <button class="pilot-shield-close" type="button" aria-label="Close security console">&times;</button>
      </div>
      <div class="pilot-shield-grid">
        ${securityItems.map(([label, value]) => `
          <div class="pilot-shield-item">
            <b>${label}</b>
            <span>${value}</span>
          </div>
        `).join('')}
      </div>`;
    document.body.appendChild(panel);

    panel.querySelector('.pilot-shield-close')?.addEventListener('click', () => {
      setShieldOpen(false);
    });
  }

  function createFocusExit() {
    if (document.getElementById('pilot-exit-focus')) return;

    const exit = document.createElement('button');
    exit.id = 'pilot-exit-focus';
    exit.type = 'button';
    exit.dataset.pilotAction = 'exit-focus';
    exit.textContent = 'Exit Focus';
    exit.addEventListener('click', () => {
      setFocusMode(false);
    });
    document.body.appendChild(exit);
  }

  function addPilotControls() {
    const modeSwitch = document.querySelector('.mode-switch');
    if (modeSwitch && !document.getElementById('pilot-shield-button')) {
      const shield = document.createElement('button');
      shield.className = 'sw-btn';
      shield.id = 'pilot-shield-button';
      shield.type = 'button';
      shield.dataset.pilotAction = 'shield';
      shield.setAttribute('aria-controls', 'pilot-shield-panel');
      shield.setAttribute('aria-expanded', 'false');
      shield.textContent = 'Shield';
      shield.addEventListener('click', () => {
        const panel = document.getElementById('pilot-shield-panel');
        setShieldOpen(!panel.classList.contains('open'));
      });
      modeSwitch.appendChild(shield);
    }

    const tools = document.getElementById('mode-tools');
    if (tools && !document.getElementById('pilot-focus-button')) {
      const focus = document.createElement('button');
      focus.className = 'pilot-command-button';
      focus.id = 'pilot-focus-button';
      focus.type = 'button';
      focus.dataset.pilotAction = 'focus';
      focus.setAttribute('aria-pressed', 'false');
      focus.textContent = 'Focus';
      focus.addEventListener('click', () => {
        setFocusMode(!document.body.classList.contains('pilot-focus-mode'));
      });
      tools.prepend(focus);

      const full = document.createElement('button');
      full.className = 'pilot-command-button';
      full.type = 'button';
      full.dataset.pilotAction = 'fullscreen';
      full.textContent = 'Full';
      full.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      });
      tools.prepend(full);
    }
  }

  function updateRibbon() {
    const mode = text('mode-title', 'REAL');
    const status = text('status-text', 'SYNC');
    const badge = text('class-badge', '');
    const current = badge || (status.includes('READY') ? 'Simulation Standby' : 'Campus Standby');
    const phase = activePhase();
    const timer = activeTimer();

    const currentClass = document.getElementById('pilot-current-class');
    const currentSub = document.getElementById('pilot-current-sub');
    const phaseEl = document.getElementById('pilot-phase');
    const phaseSub = document.getElementById('pilot-phase-sub');
    const calendar = document.getElementById('pilot-calendar');
    const clock = document.getElementById('pilot-clock');

    if (currentClass) currentClass.textContent = current;
    if (currentSub) currentSub.textContent = `${mode} / ${status}`;
    if (phaseEl) phaseEl.textContent = phase;
    if (phaseSub) phaseSub.textContent = `Timer ${timer}`;
    if (calendar) calendar.textContent = text('mini-schedule-day');
    if (clock) clock.textContent = `${text('dDisp')} / ${text('tDisp')}`;
  }

  function bootPilot() {
    createRibbon();
    createShieldPanel();
    createFocusExit();
    addPilotControls();
    updateRibbon();
    window.setInterval(updateRibbon, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootPilot);
  } else {
    bootPilot();
  }
})();
