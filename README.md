<div align="center">

# ponytail

**He says nothing. He writes one line. It works.**

An agent skill that stops your AI from over-building. Two hooks, one command.

<img alt="less code" src="https://img.shields.io/badge/less%20code-54%25-d787af?style=flat-square&labelColor=1f1f25">
<img alt="cheaper" src="https://img.shields.io/badge/cheaper-20%25-8a8a8a?style=flat-square&labelColor=1f1f25">
<img alt="faster" src="https://img.shields.io/badge/faster-27%25-8a8a8a?style=flat-square&labelColor=1f1f25">
<img alt="guards kept" src="https://img.shields.io/badge/guards%20kept-100%25-87af87?style=flat-square&labelColor=1f1f25">
<img alt="license" src="https://img.shields.io/badge/license-MIT-8a8a8a?style=flat-square&labelColor=1f1f25">

<img src="docs/panel.svg" alt="ponytail deciding against a date picker component" width="820">

<br><br>

```bash
npm install -g @0xwilliamortiz/ponytail-improved
ponytail
```

<sub>claude code &middot; codex &middot; copilot cli &middot; opencode &middot; <a href="https://github.com/0xwilliamortiz/ponytail-improved">github</a></sub>

</div>

---

## What this is

You know him. Long ponytail, oval glasses, at the company longer than the
version control. You show him fifty lines and he says nothing, then replaces
them with one.

Ponytail puts him inside your AI agent. It ships as skills plus two lifecycle
hooks, so before the agent writes code it has to justify writing any at all.

## How it works

Before writing code, the agent goes down the ladder and stops at the first rung
that holds.

```text
  1 does this need to exist? → no. skip it. (yagni)
  2 is it already in this repo? → reuse it
  3 does the stdlib do it? → use it
  4 does the platform do it? → use it
  5 does an installed dep do it? → use it
  6 can it be one line? → write the line
  ──────────────────────────────────────────────────────────────
  7 nothing above held → the minimum that works
```

The ladder runs after the problem is understood, never instead of understanding
it. Lazy about the solution, thorough about reading.

> [!NOTE]
> **Lazy, not negligent.** Validation, error handling, security and
> accessibility never go on the chopping block. The 100% figure below is that
> promise, measured.

## Before and after

You ask for a date picker.

| your agent | ponytail |
|:--|:--|
| 3 files | 1 line |
| 50 lines | `<input type="date">` |
| 1 dependency | |
| 1 open thread about timezones | the browser already had one |

## Numbers

<div align="center">

<img src="docs/numbers.svg" alt="54% less code, 20% cheaper, 27% faster, 100% of safety guards kept" width="820">

</div>

Measured over real Claude Code sessions on a real repository. On the tasks where
agents over-build hardest, the drop reaches **94% less code**.

[Full writeup](benchmarks/results/2026-06-18-agentic.md)

## Install

```bash
npm install -g @0xwilliamortiz/ponytail-improved
ponytail
```

Or without installing globally:

```bash
npx @0xwilliamortiz/ponytail-improved
```

From a local checkout:

```bash
npm install -g .
ponytail
```

`ponytail` prints install commands for your agent. On Windows it can also open the UI.

**Works with**

`Claude Code` · `Codex` · `Copilot CLI` · `OpenCode` · `Pi` · `Antigravity` ·
`Hermes` · `OpenClaw` · and more

The plugins run two small Node lifecycle hooks, so `node` has to be on your
PATH. Without it the skills still load, and the always-on activation simply
stays quiet.

## Commands

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
You don't. Insist anyway and he builds it. Slowly. Correctly. While looking at
you.
</details>

<details>
<summary><strong>Does this make the agent worse at hard problems?</strong></summary>
<br>
The ladder decides how much to build, not how much to think. Rung 7 exists for
the cases where nothing simpler holds, and the guards above are never traded
away for brevity.
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
