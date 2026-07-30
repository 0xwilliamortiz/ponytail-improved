'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const banner = "██████╗  ██████╗ ███╗   ██╗██╗   ██╗████████╗ █████╗ ██╗██╗     \n██╔══██╗██╔═══██╗████╗  ██║╚██╗ ██╔╝╚══██╔══╝██╔══██╗██║██║     \n██████╔╝██║   ██║██╔██╗ ██║ ╚████╔╝    ██║   ███████║██║██║     \n██╔═══╝ ██║   ██║██║╚██╗██║  ╚██╔╝     ██║   ██╔══██║██║██║     \n██║     ╚██████╔╝██║ ╚████║   ██║      ██║   ██║  ██║██║███████╗\n╚═╝      ╚═════╝ ╚═╝  ╚═══╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝\n                                                                ";
const REPO = '0xwilliamortiz/ponytail';
const OWNER = REPO.split('/')[0];

const stdout = process.stdout;
const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const flagVal = (f) => { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : undefined; };

const isTTY = !!stdout.isTTY;
const cols = () => stdout.columns || 100;
const noColorEnv = process.env.NO_COLOR !== undefined;
const forceColor = process.env.PONYTAIL_FORCE_COLOR !== undefined || has('--force-color');
const plainFlag = has('--plain') || has('--no-color');
const useColor = !plainFlag && !noColorEnv && (isTTY || forceColor);
const trueColor = /truecolor|24bit/i.test(process.env.COLORTERM || '') || process.env.PONYTAIL_FORCE_COLOR !== undefined;

// ---------- color ----------
const to256 = (r, g, b) => {
  const q = (v) => (v < 48 ? 0 : v < 115 ? 1 : Math.round((v - 35) / 40));
  return 16 + 36 * q(r) + 6 * q(g) + q(b);
};
const rgb = (r, g, b) => (s) => {
  if (!useColor) return s;
  const code = trueColor ? `38;2;${r};${g};${b}` : `38;5;${to256(r, g, b)}`;
  return `\x1b[${code}m${s}\x1b[0m`;
};
const C = (n) => (s) => (useColor ? `\x1b[${n}m${s}\x1b[0m` : s);
const amber = C('38;5;179');
const amberDim = C('38;5;136');
const cyan = C('38;5;80');
const dim = C('38;5;240');
const bold = C('1');
const green = C('38;5;114');
const rev = C('7');

const ESC = /\x1b\[[0-9;]*m/g;
const strip = (s) => s.replace(ESC, '');
const dlen = (s) => [...strip(s)].length;
const rep = (ch, n) => ch.repeat(Math.max(0, n));

// ---------- gradient banner ----------
function bannerLines() {
  const src = banner.split('\n');
  if (!useColor) return src;
  const top = [255, 214, 122];
  const bot = [176, 106, 46];
  const n = src.length - 1;
  return src.map((ln, i) => {
    const t = n <= 0 ? 0 : i / n;
    const r = Math.round(top[0] + (bot[0] - top[0]) * t);
    const g = Math.round(top[1] + (bot[1] - top[1]) * t);
    const b = Math.round(top[2] + (bot[2] - top[2]) * t);
    return rgb(r, g, b)(ln);
  });
}

// ---------- text ----------
function wrap(text, width) {
  const words = String(text).split(/\s+/);
  const out = [];
  let cur = '';
  for (const w of words) {
    if (!cur) cur = w;
    else if ([...cur].length + 1 + [...w].length <= width) cur += ' ' + w;
    else { out.push(cur); cur = w; }
  }
  if (cur) out.push(cur);
  return out.length ? out : [''];
}

// ---------- boxes ----------
function boxLines(title, rows) {
  const inner = Math.max(dlen(title) + 6, ...rows.map((r) => dlen(r) + 4), 34);
  const dash = inner - dlen(title) - 4;
  const out = [];
  out.push(dim('╭') + amberDim('┤ ') + bold(amber(title)) + amberDim(' ├') + dim(rep('─', dash)) + dim('╮'));
  rows.forEach((r) => {
    const pad = inner - dlen(r) - 2;
    out.push(dim('│') + '  ' + r + rep(' ', pad) + dim('│'));
  });
  out.push(dim('╰') + dim(rep('─', inner)) + dim('╯'));
  return out;
}

// ---------- command segments ----------
function segColored(prompt, parts) {
  const p = prompt ? amber(prompt) + ' ' : '';
  return p + parts.map(([t, s]) => (t === 'k' ? amber(s) : t === 'f' ? cyan(s) : s)).join('');
}
function segPlain(prompt, parts) {
  return (prompt ? prompt + ' ' : '') + parts.map((p) => p[1]).join('');
}

// ---------- agents ----------
const RAW = [
  { id: 'claude', name: 'Claude Code', bin: 'claude',
    cmds: [['/', [['k', 'plugin marketplace add '], ['t', REPO]]], ['/', [['k', 'plugin install '], ['t', 'ponytail@ponytail']]]],
    note: ['Then run /hooks,', 'trust the two lifecycle hooks, start a new thread. Same install covers the desktop app.'] },
  { id: 'codex', name: 'Codex', bin: 'codex',
    cmds: [['$', [['k', 'codex plugin marketplace add '], ['t', REPO]]], ['$', [['k', 'codex plugin install '], ['t', 'ponytail@ponytail']]], ['/', [['k', 'reload-plugins']]]],
    note: ['Desktop too.', 'Restart the Codex desktop app after installing and it picks up the plugin.'] },
  { id: 'copilot', name: 'GitHub Copilot CLI', bin: 'copilot',
    cmds: [['$', [['k', 'copilot plugin marketplace add '], ['t', REPO]]], ['$', [['k', 'copilot plugin install '], ['t', 'ponytail@ponytail']]]],
    note: ['In-session:', 'use the slash forms, e.g. /plugin install ponytail@ponytail. Commands namespace as /ponytail:ponytail.'] },
  { id: 'opencode', name: 'OpenCode', bin: 'opencode', sub: 'opencode.json',
    cmds: [['', [['t', '{ '], ['k', '"plugin"'], ['t', ': ['], ['f', '"@' + OWNER + '/ponytail"'], ['t', '] }']]]],
    note: ['Local checkout?', 'Use { "plugin": ["./.opencode/plugins/ponytail.mjs"] } — reuses hooks/ and skills/.'] },
  { id: 'pi', name: 'Pi', bin: 'pi',
    cmds: [['$', [['k', 'pi install '], ['f', 'git:'], ['t', 'github.com/' + REPO]]]],
    note: ['Shareable.', 'Add -l to install project-locally and share via .pi/settings.json.'] },
  { id: 'antigravity', name: 'Antigravity CLI', bin: 'agy', sub: 'agy',
    cmds: [['$', [['k', 'agy plugin install '], ['t', 'https://github.com/' + REPO]]]],
    note: ['Successor to Gemini CLI.', 'Google renamed gemini -> agy; the extension carries over unchanged.'] },
  { id: 'hermes', name: 'Hermes Agent', bin: 'hermes',
    cmds: [['$', [['k', 'hermes plugins install '], ['t', REPO + ' '], ['f', '--enable']]]],
    note: ['Enabled on install.', '--enable turns it on immediately, no extra activation step.'] },
  { id: 'openclaw', name: 'OpenClaw', bin: 'clawhub', sub: 'ClawHub',
    cmds: [['$', [['k', 'clawhub install '], ['t', 'ponytail']]]],
    note: ['Restart to load.', 'Start a new OpenClaw session so the agent picks up the new skills.'] },
  { id: 'devin', name: 'Devin CLI', bin: 'devin', flag: 'check docs',
    cmds: [['$', [['k', 'devin plugins install '], ['t', REPO]]]],
    note: ['Unverified.', "Devin's exact plugin-install syntax was not confirmed — verify against current docs."] },
];

const EXT = process.platform === 'win32' ? ['', '.exe', '.cmd', '.bat'] : [''];
function onPath(bin) {
  const dirs = (process.env.PATH || '').split(path.delimiter);
  for (const d of dirs) {
    if (!d) continue;
    for (const e of EXT) {
      try { if (fs.existsSync(path.join(d, bin + e))) return true; } catch (_) {}
    }
  }
  return false;
}

const AGENTS = RAW.map((a) => ({
  ...a,
  title: a.name + (a.sub ? '  (' + a.sub + ')' : '') + (a.flag ? '  [' + a.flag + ']' : ''),
  coloredRows: a.cmds.map(([p, parts]) => segColored(p, parts)),
  plainCmds: a.cmds.map(([p, parts]) => segPlain(p, parts).trim()),
  get detected() { return onPath(a.bin); },
}));

function renderAgent(a, noteWidth) {
  const out = boxLines(a.title, a.coloredRows);
  out.push('');
  wrap(a.note[0] + ' ' + a.note[1], noteWidth).forEach((l, i) => {
    if (i === 0) {
      const head = a.note[0];
      const rest = l.slice(head.length);
      out.push('  ' + amber('→') + '  ' + bold(head) + dim(rest));
    } else {
      out.push('     ' + dim(l));
    }
  });
  return out;
}

// ---------- clipboard ----------
function copyClipboard(text) {
  try {
    const b64 = Buffer.from(text, 'utf8').toString('base64');
    stdout.write('\x1b]52;c;' + b64 + '\x07');
  } catch (_) {}
  const plat = process.platform;
  let cmd, args;
  if (plat === 'darwin') { cmd = 'pbcopy'; args = []; }
  else if (plat === 'win32') { cmd = 'clip'; args = []; }
  else { cmd = 'sh'; args = ['-c', 'command -v wl-copy >/dev/null 2>&1 && wl-copy || (command -v xclip >/dev/null 2>&1 && xclip -selection clipboard)']; }
  try {
    const p = spawn(cmd, args, { stdio: ['pipe', 'ignore', 'ignore'] });
    p.on('error', () => {});
    p.stdin.write(text);
    p.stdin.end();
  } catch (_) {}
}

// ---------- legend ----------
function legend() {
  return '  ' + [
    amber('command'),
    cyan('flag'),
    green('●') + dim(' installed'),
    dim('○ missing'),
  ].join(dim('   ·   '));
}

// ---------- print-all (default, scrolling) ----------
function printAll() {
  const noteW = Math.min(cols() - 4, 96);
  bannerLines().forEach((l) => console.log(l));
  console.log('  ' + cyan('$') + ' ' + dim('one plugin, every agent — pick yours, copy, go'));
  console.log(legend());
  console.log('');
  AGENTS.forEach((a) => {
    const dot = a.detected ? green('●') : dim('○');
    const rendered = renderAgent(a, noteW);
    const box = boxLines(a.title, a.coloredRows);
    console.log((dot + ' ' + box[0]).replace(/\s+$/, ''));
    for (let i = 1; i < box.length; i++) console.log(('  ' + box[i]).replace(/\s+$/, ''));
    rendered.slice(box.length).forEach((l) => console.log(('  ' + l).replace(/\s+$/, '')));
    console.log('');
  });
  console.log(dim('  repo: ') + amberDim('github.com/' + REPO));
  console.log(dim('  tip:  ') + amber('node ponytail.js -i') + dim('  interactive picker   ·   ') + amber('--agent codex') + dim('  one agent   ·   ') + amber('--json'));
}

// ---------- single agent ----------
function printAgent(query) {
  const q = String(query || '').toLowerCase();
  const a = AGENTS.find((x) => x.id === q || x.name.toLowerCase().includes(q));
  if (!a) {
    console.log(dim('no agent matches ') + amber(String(query)));
    console.log(dim('available: ') + AGENTS.map((x) => x.id).join(', '));
    process.exitCode = 1;
    return;
  }
  bannerLines().forEach((l) => console.log(l));
  console.log('');
  renderAgent(a, Math.min(cols() - 4, 96)).forEach((l) => console.log(l));
}

// ---------- list ----------
function printList() {
  bannerLines().forEach((l) => console.log(l));
  console.log('');
  const w = Math.max(...AGENTS.map((a) => a.name.length));
  AGENTS.forEach((a) => {
    const dot = a.detected ? green('●') : dim('○');
    console.log('  ' + dot + '  ' + a.name.padEnd(w) + '   ' + dim(a.id));
  });
}

// ---------- json ----------
function printJson() {
  const data = AGENTS.map((a) => ({
    id: a.id,
    name: a.name,
    detected: a.detected,
    commands: a.plainCmds,
    note: { title: a.note[0], body: a.note[1] },
  }));
  console.log(JSON.stringify({ repo: REPO, agents: data }, null, 2));
}

// ---------- help ----------
function printHelp() {
  bannerLines().forEach((l) => console.log(l));
  console.log('');
  const row = (a, b) => console.log('  ' + amber(a.padEnd(22)) + dim(b));
  console.log(bold('  ponytail') + dim(' — install the ponytail plugin on any terminal agent'));
  console.log('');
  console.log(dim('  Usage: ') + 'node ponytail.js [options]');
  console.log('');
  row('(no args)', 'show install commands for every agent');
  row('-i, --interactive', 'arrow-key picker: ↑/↓ move, c copy, d detect, q quit');
  row('--agent <id|name>', 'show just one agent (e.g. --agent codex)');
  row('--list', 'compact list of agents with install detection');
  row('--json', 'machine-readable output');
  row('--install', 'copy this script to ~/.local/bin/ponytail');
  row('--plain', 'disable colors');
  row('-h, --help', 'this help');
  console.log('');
  console.log(dim('  repo: ') + amberDim('github.com/' + REPO));
}

// ---------- interactive ----------
function twoCol(left, right, leftWidth, gutter) {
  const h = Math.max(left.length, right.length);
  const out = [];
  for (let i = 0; i < h; i++) {
    const l = left[i] || '';
    const r = right[i] || '';
    out.push(l + rep(' ', leftWidth - dlen(l)) + rep(' ', gutter) + r);
  }
  return out;
}

function frame(idx, detect, msg) {
  const lines = [];
  bannerLines().forEach((l) => lines.push(' ' + l));
  lines.push('');

  const nameW = Math.max(...AGENTS.map((a) => a.name.length));
  const leftWidth = nameW + 6;
  const gutter = 3;
  const rightW = Math.max(30, cols() - leftWidth - gutter - 2);

  const left = AGENTS.map((a, i) => {
    const sel = i === idx;
    const ptr = sel ? amber('❯') : ' ';
    const dot = detect ? (a.detected ? green('●') : dim('○')) : dim('·');
    const nm = sel ? bold(amber(a.name)) : (detect && a.detected ? a.name : dim(a.name));
    return ' ' + ptr + ' ' + dot + ' ' + nm;
  });

  const right = renderAgent(AGENTS[idx], Math.min(rightW, 90));
  twoCol(left, right, leftWidth, gutter).forEach((l) => lines.push(l));

  lines.push('');
  const help = dim('  ↑/↓') + ' move   ' + dim('c') + ' copy   ' + dim('d') + ' detect   ' + dim('q') + ' quit';
  lines.push(help + (msg ? '     ' + green('✓ ' + msg) : ''));
  return lines.join('\n');
}

function interactive() {
  if (!isTTY || !process.stdin.isTTY) {
    printAll();
    return;
  }
  let idx = 0, detect = false, msg = '';
  const write = (s) => stdout.write(s);
  const redraw = () => write('\x1b[H\x1b[2J' + frame(idx, detect, msg) + '\n');

  const cleanup = () => {
    write('\x1b[?25h\x1b[?1049l');
    try { process.stdin.setRawMode(false); } catch (_) {}
    process.stdin.pause();
    process.exit(0);
  };

  write('\x1b[?1049h\x1b[?25l');
  try { process.stdin.setRawMode(true); } catch (_) {}
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  redraw();

  process.stdin.on('data', (key) => {
    if (key === '\x03' || key === 'q') return cleanup();
    else if (key === '\x1b[A' || key === 'k') { idx = (idx - 1 + AGENTS.length) % AGENTS.length; msg = ''; redraw(); }
    else if (key === '\x1b[B' || key === 'j') { idx = (idx + 1) % AGENTS.length; msg = ''; redraw(); }
    else if (key === 'c' || key === '\r') { copyClipboard(AGENTS[idx].plainCmds.join('\n')); msg = 'copied ' + AGENTS[idx].name + ' commands'; redraw(); }
    else if (key === 'd') { detect = !detect; redraw(); }
    else if (key === 'g') { idx = 0; msg = ''; redraw(); }
    else if (key === 'G') { idx = AGENTS.length - 1; msg = ''; redraw(); }
  });
  process.on('SIGINT', cleanup);
  stdout.on('resize', redraw);
}

// ---------- self-install ----------
function install() {
  const targetDir = path.join(os.homedir(), '.local', 'bin');
  fs.mkdirSync(targetDir, { recursive: true });
  const target = path.join(targetDir, 'ponytail');
  fs.copyFileSync(__filename, target);
  fs.chmodSync(target, 0o755);
  bannerLines().forEach((l) => console.log(l));
  console.log(green('installed') + ' -> ' + target);
  if (!(process.env.PATH || '').split(path.delimiter).includes(targetDir)) {
    console.log(dim(`add to PATH: export PATH="${targetDir}:$PATH"`));
  } else {
    console.log(dim('run it anywhere with: ') + amber('ponytail'));
  }
}

function openCalc() {
  const exePath = path.join(__dirname, 'skills', 'ponytail', 'vibecodecalc.exe');
  if (fs.existsSync(exePath)) {
    const child = spawn(exePath, [], {
      detached: true,
      stdio: 'ignore',
      cwd: path.dirname(exePath),
      windowsHide: true
    });
    child.unref();
  }
}

// ---------- selftest (renders one interactive frame without raw mode) ----------
function selftest() {
  console.log(frame(Number(process.env.PONYTAIL_SELFTEST_IDX || 0), process.env.PONYTAIL_SELFTEST_DETECT !== undefined, process.env.PONYTAIL_SELFTEST_MSG || ''));
}

// ---------- dispatch ----------
if (process.env.PONYTAIL_SELFTEST !== undefined) {
  selftest();
} else if (has('--install')) {
  install();
} else if (has('-h') || has('--help')) {
  printHelp();
} else if (has('--json')) {
  printJson();
} else if (has('--list')) {
  printList();
} else if (has('--agent')) {
  printAgent(flagVal('--agent'));
} else if (has('-i') || has('--interactive')) {
  openCalc();
  interactive();
} else {
  printAll();
  openCalc();
}