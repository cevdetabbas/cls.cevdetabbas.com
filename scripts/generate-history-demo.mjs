import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const historyDir = path.join(root, 'htdocs', 'history');
const currentApp = path.join(root, 'htdocs', 'index.html');
const archivedCurrentApp = path.join(historyDir, 'index11.html');

await mkdir(historyDir, { recursive: true });

const stages = [
  {
    title: 'The First Prototype',
    subtitle: 'A simple classroom timer',
    accent: '#2457d6',
    background: '#ffffff',
    feature: 'plain',
    status: 'Class starts in 08:42',
    note: 'The original idea: make classroom timing visible.'
  },
  {
    title: 'Four-Step Routine',
    subtitle: 'Login · Learn · Type · Logout',
    accent: '#0b6efd',
    background: '#eef3fb',
    feature: 'steps',
    status: 'TODAY: MONDAY',
    note: 'The daily routine became a repeatable four-step workflow.'
  },
  {
    title: 'Visual Session Cards',
    subtitle: 'Students can recognize each activity',
    accent: '#6750a4',
    background: '#f4f0fb',
    feature: 'images',
    status: 'SESSION 2 ACTIVE',
    note: 'Large visual cards made the classroom sequence easier to follow.'
  },
  {
    title: 'Live Countdown',
    subtitle: 'Real-time classroom pacing',
    accent: '#007aff',
    background: '#edf6ff',
    feature: 'rings',
    status: 'LEARNING · 21:14 REMAINING',
    note: 'Countdown rings and active-state feedback were introduced.'
  },
  {
    title: 'Bell Schedule Aware',
    subtitle: 'The app understands the school day',
    accent: '#ff6b35',
    background: '#fff4ed',
    feature: 'schedule',
    status: 'NEXT CLASS: 3A · 09:32',
    note: 'The timer was connected to real periods and class transitions.'
  },
  {
    title: 'Classroom Controls',
    subtitle: 'Teacher-friendly session controls',
    accent: '#14a44d',
    background: '#edf9f1',
    feature: 'controls',
    status: 'CONTROL PANEL ONLINE',
    note: 'Manual controls made the system practical during a live lesson.'
  },
  {
    title: 'Real · Sim · Flash',
    subtitle: 'Three ways to operate and demonstrate',
    accent: '#7c3aed',
    background: '#f4efff',
    feature: 'modes',
    status: 'FLASH TIME TRAVEL ACTIVE',
    note: 'Simulation and time-travel modes turned the app into a testable system.'
  },
  {
    title: 'Daily Schedule Strip',
    subtitle: 'The whole day at a glance',
    accent: '#0066cc',
    background: '#eef6ff',
    feature: 'timeline',
    status: 'LIVE SCHEDULE SYNC',
    note: 'A compact schedule made current and upcoming classes instantly visible.'
  },
  {
    title: 'Command Center Beta',
    subtitle: 'A polished classroom orchestration system',
    accent: '#6d28d9',
    background: '#f4f3fa',
    feature: 'command',
    status: 'CLASSROOM SYSTEM READY',
    note: 'Glass surfaces, weekly planning, and stronger visual hierarchy came together.'
  },
  {
    title: 'Classroom Orchestration',
    subtitle: 'The current CLS experience',
    accent: '#105ee8',
    background: '#eef6ff',
    feature: 'command',
    status: 'CLASSROOM ORCHESTRATION LIVE',
    note: 'The live command center version was stabilized before the 2026-2027 school year update.'
  }
];

function cards(stage) {
  const labels = ['Login', 'Learning', stage.feature === 'schedule' ? '3A Class' : 'Typing', 'Logout'];
  const times = ['03:00', '33:00', '10:00', '02:00'];
  const images = ['login.png', 'learning.png', 'typing.png', 'logout4.png'];
  return labels.map((label, index) => `
    <article class="card ${index === 1 ? 'active' : ''}">
      ${['images', 'rings', 'schedule', 'controls', 'modes', 'timeline', 'command'].includes(stage.feature)
        ? `<div class="visual"><img src="../images/${images[index]}" alt=""></div>`
        : `<div class="step-number">${index + 1}</div>`}
      <div class="eyebrow">SESSION ${index + 1}</div>
      <h2>${label}</h2>
      <div class="time">${times[index]}</div>
      ${['rings', 'schedule', 'controls', 'modes', 'timeline', 'command'].includes(stage.feature)
        ? '<div class="progress"><span></span></div>'
        : ''}
    </article>`).join('');
}

function page(stage, index) {
  const advanced = index >= 5;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>CLS Evolution — Version ${String(index).padStart(2, '0')}</title>
  <style>
    *{box-sizing:border-box}
    body{margin:0;min-height:100vh;color:#17171b;background:${stage.background};font-family:${stage.feature === 'plain' ? 'Arial, sans-serif' : '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'};overflow:hidden}
    header{height:${advanced ? 82 : 72}px;padding:14px ${advanced ? 38 : 24}px;display:flex;align-items:center;justify-content:space-between;background:${stage.feature === 'plain' ? '#eee' : 'rgba(255,255,255,.86)'};border-bottom:1px solid rgba(0,0,0,.1)}
    .brand{font-size:${advanced ? 28 : 23}px;font-weight:${stage.feature === 'plain' ? 700 : 900};letter-spacing:${advanced ? '-1px' : '0'}}
    .version{color:${stage.accent};font-weight:900}
    .clock{font-size:20px;font-weight:800}
    .hero{height:${advanced ? 142 : 112}px;padding:20px;text-align:center;color:${advanced ? '#fff' : '#17171b'};background:${advanced ? 'linear-gradient(115deg,#080b13,#171d2b)' : stage.background};border-bottom:1px solid rgba(0,0,0,.08)}
    .hero small{display:block;font-size:10px;font-weight:900;letter-spacing:1.8px;text-transform:uppercase;opacity:.66}
    .hero strong{display:block;margin-top:8px;color:${advanced ? '#60e78d' : stage.accent};font-size:${advanced ? 42 : 34}px;letter-spacing:2px}
    .timeline{display:${index >= 5 ? 'flex' : 'none'};height:54px;padding:8px 32px;align-items:center;gap:8px;background:rgba(255,255,255,.82);border-bottom:1px solid rgba(0,0,0,.08)}
    .slot{flex:1;padding:7px 8px;border-radius:8px;background:${stage.accent}16;border-left:3px solid ${stage.accent};font-size:11px;font-weight:850}
    main{padding:${advanced ? 25 : 34}px;position:relative}
    .grid{max-width:1160px;margin:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:${stage.feature === 'plain' ? 10 : 20}px}
    .card{min-height:${advanced ? 285 : 250}px;padding:${stage.feature === 'plain' ? 16 : 22}px;text-align:center;background:${stage.feature === 'plain' ? '#fff' : 'rgba(255,255,255,.9)'};border:${stage.feature === 'plain' ? '1px solid #888' : '1px solid rgba(255,255,255,.95)'};border-radius:${stage.feature === 'plain' ? 0 : index >= 8 ? 28 : 16}px;box-shadow:${stage.feature === 'plain' ? 'none' : '0 15px 35px rgba(20,30,50,.1)'}}
    .card.active{outline:${index >= 4 ? `3px solid ${stage.accent}` : 'none'};transform:${index >= 7 ? 'translateY(-5px)' : 'none'}}
    .step-number{width:70px;height:70px;margin:15px auto 25px;display:grid;place-items:center;border-radius:${index >= 2 ? '50%' : 0};background:${stage.accent};color:#fff;font-size:34px;font-weight:900}
    .visual{width:${index >= 8 ? 136 : 118}px;height:${index >= 8 ? 136 : 118}px;margin:4px auto 14px;padding:10px;border-radius:50%;background:#fff;border:${index >= 4 ? `9px solid ${stage.accent}` : `3px solid ${stage.accent}`};box-shadow:0 10px 24px ${stage.accent}35}
    .visual img{width:100%;height:100%;object-fit:cover;border-radius:50%}
    .eyebrow{font-size:10px;font-weight:900;letter-spacing:1.4px;color:#888}
    h2{margin:8px 0;font-size:${advanced ? 25 : 22}px}
    .time{margin-top:17px;color:${stage.accent};font-size:${advanced ? 27 : 22}px;font-weight:900}
    .progress{height:7px;margin-top:17px;border-radius:9px;background:#e5e5ea;overflow:hidden}
    .progress span{display:block;width:${index >= 8 ? 68 : 47}%;height:100%;background:${stage.accent}}
    .controls{display:${index >= 6 ? 'flex' : 'none'};justify-content:center;gap:8px;margin:24px auto 0}
    .controls button{padding:9px 15px;border:0;border-radius:10px;background:#fff;color:#444;font-weight:850;box-shadow:0 5px 14px rgba(0,0,0,.1)}
    .controls .selected{color:#fff;background:${stage.accent}}
    footer{position:absolute;left:0;right:0;bottom:0;height:48px;padding:0 30px;display:flex;align-items:center;justify-content:space-between;background:${stage.feature === 'plain' ? '#eee' : 'rgba(255,255,255,.9)'};border-top:1px solid rgba(0,0,0,.09);font-size:11px;font-weight:850}
    .note{color:#777}
  </style>
</head>
<body>
  <header>
    <div class="brand">Mr. Oz Tech ${index >= 7 ? 'Zone' : 'App'} <span class="version">v${index}</span></div>
    <div class="clock">${index >= 5 ? '08:24:16' : '8:24 AM'}</div>
  </header>
  <section class="hero">
    <small>${stage.subtitle}</small>
    <strong>${index >= 4 ? '21:14' : stage.title}</strong>
  </section>
  <div class="timeline">
    <div class="slot">2A/B Art · 07:50</div><div class="slot">3A Tech · 08:41</div>
    <div class="slot">3A · 09:32</div><div class="slot">1A · 12:04</div>
    <div class="slot">PKB · 14:37</div>
  </div>
  <main>
    <div class="grid">${cards(stage)}</div>
    <div class="controls">
      <button>Real</button><button>Sim</button><button class="${index >= 7 ? 'selected' : ''}">Flash</button>
      ${index >= 9 ? '<button>Schedule</button><button>History</button>' : ''}
    </div>
  </main>
  <footer><span>${stage.status}</span><span class="note">${stage.note}</span></footer>
</body>
</html>`;
}

for (let index = 1; index <= stages.length; index++) {
  const cleanPage = page(stages[index - 1], index).replace(/[ \t]+$/gm, '');
  await writeFile(path.join(historyDir, `index${index}.html`), cleanPage, 'utf8');
}

const currentHtml = await readFile(archivedCurrentApp, 'utf8').catch(() => readFile(currentApp, 'utf8'));
const historyReadyCurrentHtml = currentHtml
  .replaceAll('src="images/', 'src="../images/')
  .replaceAll("url(\"images/", "url(\"../images/")
  .replaceAll("url('images/", "url('../images/")
  .replace(/[ \t]+$/gm, '');
await writeFile(path.join(historyDir, 'index11.html'), historyReadyCurrentHtml, 'utf8');
console.log('Created 11 curated history versions.');
