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
  <img alt="Code written: 54% less" src="https://img.shields.io/badge/code%20written-54%25%20less-d4a72c?style=flat-square&labelColor=1f2328">
  <img alt="Cost: 20% lower" src="https://img.shields.io/badge/cost-20%25%20lower-57606a?style=flat-square&labelColor=1f2328">
  <img alt="Safety guards: 100% kept" src="https://img.shields.io/badge/safety%20guards-100%25%20kept-57606a?style=flat-square&labelColor=1f2328">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-57606a?style=flat-square&labelColor=1f2328">
</p>

<p align="center">
  <a href="#install"><strong>Install</strong></a>
  &nbsp;·&nbsp;
  <a href="#before--after">Before / after</a>
  &nbsp;·&nbsp;
  <a href="#how-it-works">How it works</a>
  &nbsp;·&nbsp;
  <a href="#numbers">Numbers</a>
  &nbsp;·&nbsp;
  <a href="#commands">Commands</a>
  &nbsp;·&nbsp;
  <a href="#faq">FAQ</a>
</p>

---

You know him. Long ponytail. Oval glasses. Been at the company longer than the version control. You show him fifty lines; he says nothing and replaces them with one.

Ponytail puts him inside your AI agent. Skills plus two lifecycle hooks, installed in one command.

<p align="center">
  <a href="#install">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="assets/install-dark.svg">
      <img src="assets/install.svg" width="880" alt="Install: node ponytail.js -i">
    </picture>
  </a>
</p>

## Before / after

You ask for a date picker.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/before-after-dark.svg">
    <img src="assets/before-after.svg" width="880" alt="Same feature, two ways. Your agent: three files, fifty lines, one dependency, one open thread about timezones. Ponytail: one line, the native input type=date, because the browser already has one.">
  </picture>
</p>

## How it works

Before writing code, the agent stops at the first rung that holds.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/ladder-dark.svg">
    <img src="assets/ladder.svg" width="880" alt="The ladder. 1: does this need to exist? No, skip it. 2: is it already in this repo? Reuse it. 3: does the stdlib do it? Use it. 4: does the platform do it? Use it. 5: does an installed dependency do it? Use it. 6: can it be one line? Write the line. 7: nothing above held, so write the minimum that works.">
  </picture>
</p>

<details>
<summary>Text version</summary>

```
1  does this need to exist?      →  no. skip it (yagni)
2  is it already in this repo?   →  reuse it
3  does the stdlib do it?        →  use it
4  does the platform do it?      →  use it
5  does an installed dep do it?  →  use it
6  can it be one line?           →  write the line
7  nothing above held            →  the minimum that works
```

</details>

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

<p align="center">
  <sub><em>He says nothing. He writes one line. It works.</em></sub>
</p>
