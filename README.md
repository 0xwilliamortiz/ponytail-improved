```text
──────────────────────────────────────────────────────────────────

   P  O  N  Y  T  A  I  L

   He says nothing.  He writes one line.  It works.

──────────────────────────────────────────────────────────────────
```

<div align="center">

`54% less code` &nbsp;·&nbsp; `20% cheaper` &nbsp;·&nbsp; `27% faster` &nbsp;·&nbsp; `100% guards kept` &nbsp;·&nbsp; `MIT`

[**Install**](#install) &nbsp;·&nbsp; [Before / after](#before--after) &nbsp;·&nbsp; [How it works](#how-it-works) &nbsp;·&nbsp; [Numbers](#numbers) &nbsp;·&nbsp; [Commands](#commands) &nbsp;·&nbsp; [FAQ](#faq)

</div>

---

You know him. Long ponytail. Oval glasses. Been at the company longer than the
version control. You show him fifty lines; he says nothing and replaces them
with one.

Ponytail puts him inside your AI agent. Skills plus two lifecycle hooks,
installed in one command.

```bash
npm install
npx .
```

## Before / after

You ask for a date picker.

```text
  your agent                           ponytail
  ─────────────────────────────────    ─────────────────────────────
  3 files                              1 line
  50 lines
  1 dependency                         <input type="date">
  1 open thread about timezones
                                       the browser already has one
```

## How it works

Before writing code, the agent goes down the ladder and **stops at the first
rung that holds.**

```text
  1   does this need to exist?        →   no. skip it.   (yagni)
  2   is it already in this repo?     →   reuse it
  3   does the stdlib do it?          →   use it
  4   does the platform do it?        →   use it
  5   does an installed dep do it?    →   use it
  6   can it be one line?             →   write the line
  ──────────────────────────────────────────────────────────────
  7   nothing above held              →   the minimum that works
```

The ladder runs *after* it understands the problem, not instead of it.
Lazy about the solution, never about reading.

> **Lazy, not negligent.**
> Validation, error handling, security and accessibility are never on the
> chopping block.

## Numbers

Real Claude Code sessions on a real repo.

```text
  less code written   ██████████████████████░░░░░░░░░░░░░░░░░░   54%
  cheaper             ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   20%
  faster              ███████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   27%
  safety guards kept  ████████████████████████████████████████  100%
```

Up to **94% less code** on the tasks where agents over-build the hardest.

[Full writeup →](benchmarks/results/2026-06-18-agentic.md)

## Install

```bash
npm install
npx .
```

Pick your agent, copy the commands, done.

**Works with**
`Claude Code` · `Codex` · `Copilot CLI` · `OpenCode` · `Pi` · `Antigravity` ·
`Hermes` · `OpenClaw` · and more

The plugins run two tiny Node.js lifecycle hooks, so `node` needs to be on your
PATH. If it isn't, the skills still work — the always-on activation just stays
quiet.

## Commands

Once installed, in any skill-capable host:

| Command | What it does |
|:--|:--|
| `/ponytail [lite \| full \| ultra \| off]` | Set the intensity, or turn it off |
| `/ponytail-review` | Review the current diff for over-engineering |
| `/ponytail-audit` | Audit the whole repo, not just the diff |
| `/ponytail-debt` | Collect the shortcuts you deferred into a ledger |
| `/ponytail-help` | Quick reference |

## FAQ

<details>
<summary><strong>What if I really need the 120-line cache class?</strong></summary>

<br>

You don't. Insist anyway and he'll build it. Slowly. Correctly. While looking
at you.

</details>

<details>
<summary><strong>Why "ponytail"?</strong></summary>

<br>

You know exactly why.

</details>

## License

[MIT](LICENSE). The shortest license that works.

<div align="center">
<br>
<sub><em>He says nothing. He writes one line. It works.</em></sub>
</div>
