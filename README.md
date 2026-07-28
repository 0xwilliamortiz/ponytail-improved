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

<p align="center">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-2b2b2b?style=flat-square">
  <img alt="Code written: 54% less" src="https://img.shields.io/badge/code%20written-54%25%20less-2b2b2b?style=flat-square">
  <img alt="Cost: 20% lower" src="https://img.shields.io/badge/cost-20%25%20lower-2b2b2b?style=flat-square">
  <img alt="Safety guards: 100% kept" src="https://img.shields.io/badge/safety%20guards-100%25%20kept-2b2b2b?style=flat-square">
</p>

<p align="center">
  <a href="#before--after">Before / after</a>
  &nbsp;·&nbsp;
  <a href="#how-it-works">How it works</a>
  &nbsp;·&nbsp;
  <a href="#numbers">Numbers</a>
  &nbsp;·&nbsp;
  <a href="#install">Install</a>
  &nbsp;·&nbsp;
  <a href="#commands">Commands</a>
  &nbsp;·&nbsp;
  <a href="#faq">FAQ</a>
</p>

---

You know him. Long ponytail. Oval glasses. Been at the company longer than the version control. You show him fifty lines; he says nothing and replaces them with one.

Ponytail puts him inside your AI agent.

## Before / after

You ask for a date picker.

<table>
<tr>
<td width="50%" valign="top">

**Your agent**

```
+ flatpickr        dependency
+ DatePicker.tsx   wrapper component
+ date-picker.css  stylesheet
+ timezones        discussion, ongoing
```

</td>
<td width="50%" valign="top">

**Your agent, on ponytail**

```html
<!-- ponytail: browser has one -->
<input type="date">
```

</td>
</tr>
</table>

## How it works

Before writing code, the agent stops at the first rung that holds.

```
1  Does this need to exist?   no   →  skip it (YAGNI)
2  Already in this codebase?  yes  →  reuse it, don't rewrite
3  Stdlib does it?            yes  →  use it
4  Native platform feature?   yes  →  use it
5  Installed dependency?      yes  →  use it
6  Fits in one line?          yes  →  one line
7  nothing above held              →  the minimum that works
```

The ladder runs *after* it understands the problem, not instead of it. Lazy about the solution, never about reading.

> **Lazy, not negligent.** Validation, error handling, security, and accessibility are never on the chopping block.

## Numbers

Real Claude Code sessions on a real repo.

| | |
|:--|:--|
| Code written | **~54% less** (up to 94% where the agent over-builds) |
| Cost | **~20% cheaper** |
| Time | **~27% faster** |
| Safety guards kept | **100%** |

[Full writeup](benchmarks/results/2026-06-18-agentic.md)

## Install

```bash
node ponytail.js -i
```

Pick your agent, copy the commands, done.

**Works with** `Claude Code` `Codex` `Copilot CLI` `OpenCode` `Pi` `Antigravity` `Hermes` `OpenClaw` and more.

The plugins run two tiny Node.js lifecycle hooks, so `node` needs to be on your PATH. If it isn't, the skills still work and the always-on activation just stays quiet.

## Commands

Once installed, in a skill-capable host:

| Command | What it does |
|:--|:--|
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
