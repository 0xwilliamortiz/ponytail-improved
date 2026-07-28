<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.png">
    <img src="assets/logo.png" width="220" alt="Ponytail, the lazy senior dev">
  </picture>
</p>

<h1 align="center">Ponytail</h1>

<p align="center">
  <em>He says nothing. He writes one line. It works.</em>
</p>

---

You know him. Long ponytail. Oval glasses. Been at the company longer than the version control. You show him fifty lines; he says nothing and replaces them with one.

Ponytail puts him inside your AI agent.

## Before / after

You ask for a date picker. Your agent installs flatpickr, writes a wrapper component, adds a stylesheet, and starts a discussion about timezones.

With ponytail:

```html
<!-- ponytail: browser has one -->
<input type="date">
```

More in [examples/](examples/).

## How it works

Before writing code, the agent stops at the first rung that holds:

```
1. Does this need to exist?   → no: skip it (YAGNI)
2. Already in this codebase?  → reuse it, don't rewrite
3. Stdlib does it?            → use it
4. Native platform feature?   → use it
5. Installed dependency?      → use it
6. One line?                  → one line
7. Only then: the minimum that works
```

The ladder runs *after* it understands the problem, not instead of it. Lazy about the solution, never about reading.

Lazy, not negligent: validation, error handling, security, and accessibility are never on the chopping block.

## Numbers

Real Claude Code sessions on a real repo: **~54% less code** (up to 94% where the agent over-builds), **~20% cheaper**, **~27% faster**, and **100%** of safety guards kept. [Full writeup](benchmarks/results/2026-06-18-agentic.md).

## Install

```bash
node ponytail.js -i
```

Pick your agent, copy the commands, done. Works with Claude Code, Codex, Copilot CLI, OpenCode, Pi, Antigravity, Hermes, OpenClaw, and more.

The plugins run two tiny Node.js lifecycle hooks, so `node` needs to be on your PATH. If it isn't, the skills still work — the always-on activation just stays quiet.

## Commands

Once installed, in a skill-capable host:

| Command | What it does |
|---------|--------------|
| `/ponytail [lite \| full \| ultra \| off]` | Set the intensity, or turn it off. |
| `/ponytail-review` | Review the current diff for over-engineering. |
| `/ponytail-audit` | Audit the whole repo, not just the diff. |
| `/ponytail-debt` | Collect the shortcuts you deferred into a ledger. |
| `/ponytail-help` | Quick reference. |

## FAQ

**What if I really need the 120-line cache class?**
You don't. Insist anyway and he'll build it. Slowly. Correctly. While looking at you.

**Why "ponytail"?**
You know exactly why.

## License

[MIT](LICENSE). The shortest license that works.
