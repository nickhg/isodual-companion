# Why trust the computer

Nine billion leaves is too many for anyone to read. So why should anyone believe the proof?

The answer is the way the work is split up. The part that does the hard thinking, the searching, is not trusted at all. The part that is trusted is small, simple and separately written, and it has been run on every leaf.

## Producer and checker

Two different kinds of program are involved. The **producers** (`certify` for the shadow searches, `stage2` for the lifts) do the searching. They decide where to split, which flag to try and which weights to mix. They are written for speed, use plain floating point, and may contain bugs. Their output is a log, a list of boxes, each with a claimed reason for closing. A log is only a *candidate*.

The **checkers** (`check_phi` and `check_lift`) read a log and re-prove every leaf from scratch, with their own bounds, in interval arithmetic. They share nothing with the producers except the coordinates and the log format. A checker may cut a leaf into smaller pieces if its own bounds need that, but it never trusts the producer's word.

In the paper: Appendices C and E.
{ .paper-ref }

If the producer is wrong, the checker rejects the log and the work is redone. This happened, as it should. Some leaves that the producer closed with a mixture of flags couldn't be followed by the one-flag-per-box checker of the shadow searches, and those pieces were redone without mixtures. The paper describes this as the system working as intended.

## Interval arithmetic in one picture

A computer can't store most real numbers exactly. It rounds them to the nearest *double*, and rounding errors can pile up. A proof can't afford even one.

[Interval arithmetic](https://en.wikipedia.org/wiki/Interval_arithmetic) handles this by computing with intervals instead of numbers. Each quantity is an interval $[\mathrm{lo}, \mathrm{hi}]$ that is guaranteed to contain the true value. Every operation rounds its lower end down and its upper end up, so the guarantee survives every step.

<figure>
<svg viewBox="0 0 640 120" class="wsvg wide" role="img" aria-label="A true value enclosed by an interval with outward-rounded ends">
  <line x1="20" y1="60" x2="620" y2="60" class="axis"/>
  <g class="tick">
    <line x1="140" y1="52" x2="140" y2="68" class="axis"/><line x1="260" y1="52" x2="260" y2="68" class="axis"/>
    <line x1="380" y1="52" x2="380" y2="68" class="axis"/><line x1="500" y1="52" x2="500" y2="68" class="axis"/>
  </g>
  <text x="320" y="100" class="tick" text-anchor="middle">the doubles near the answer (tick marks)</text>
  <rect x="140" y="44" width="360" height="32" fill="#4daf4a" opacity="0.25"/>
  <circle cx="331" cy="60" r="6" class="mark"/>
  <text x="331" y="34" class="mlbl" text-anchor="middle">true value</text>
  <text x="140" y="34" class="tick" text-anchor="middle">lo, rounded down</text>
  <text x="500" y="34" class="tick" text-anchor="middle">hi, rounded up</text>
  <circle cx="380" cy="60" r="4" fill="none" stroke="#999" stroke-width="2"/>
  <text x="400" y="88" class="tick">nearest double (not safe on its own)</text>
</svg>
<figcaption>Every quantity is an interval whose ends are rounded outwards, so the true value is always inside. A leaf passes only if the whole interval is on the right side of the threshold.</figcaption>
</figure>

A leaf test such as "$\Phi_5 < 6$ on this box" then becomes "the upper end of the interval for $\Phi_5$ is below 6". If it is, the claim is true at every real point of the box, whatever the rounding did.

Getting this right takes care with details. The checkers run with the processor's rounding mode set upwards and compute lower ends as $-((-a)\circ b)$. Their $\exp$ and $\log$ come from the CORE-MATH library, which is correctly rounded in every mode, and are widened by one more unit for safety. They are compiled so that the compiler can't fuse multiplications and additions behind their back. The paper spells all of this out, down to the compiler flags.

In the paper: Appendix C, "Arithmetic".
{ .paper-ref }

## Coverage

Proving every leaf isn't enough. The leaves also have to *cover* everything, with no gaps. A missing log would simply be invisible to a checker, which only sees the logs it's given.

So separate coverage scripts check that the root boxes tile the starting box exactly, that every split was done the way the manifests say, and that every collected box of stage 1 is exactly the root of some stage-2 log. They compare floating-point endpoints in hexadecimal, so no arithmetic can blur them. The starting box itself is checked in exact rational arithmetic.

This is not hypothetical. During stage 2, one box was missed by a bisection fallback in the orchestration scripts. The checker couldn't see it, but the coverage script did. The box was then proved separately.

In the paper: Appendix E, "The producer" and "Coverage".
{ .paper-ref }

## The final re-check, and an independent one

At the end, every log of all the computer-assisted theorems was re-checked by one single build of the two checkers. The binaries were statically linked and byte-identical on every machine. Each log's SHA-256 was compared with the one recorded when it was produced. Everything passed.

Then a second stage-2 checker, `check_lift2`, was written from the written specification of the log format, not from the first checker's code. It is in Python, uses the Arb library's ball arithmetic and a different enclosure method, and shares no code with `check_lift`. It re-proved every (B) leaf and a random sample of the rest, fixed in advance by a seed: $47{,}437$ (B), $508{,}521$ (F), $1{,}485{,}204$ (P) and $362{,}365$ (N) leaves from 604 archives, with no failures.

There are also tests that make sure the checkers say *no* when they should: deliberately broken certificates of every leaf type, tiny boxes around $M_*$ and $\pi_vD_5$ that must be rejected at their true thresholds, and 30 damaged inputs to the coverage scripts, from a deleted line to an endpoint shifted by one unit in the last place. All were rejected.

In the paper: Appendix E, "An independent check" and "Tests".
{ .paper-ref }

## What you still have to trust

The paper is explicit about this. The trusted base for the computer-assisted theorems is:

- the two checkers, `check_phi` (696 lines of C) and `check_lift` (557 lines), with CORE-MATH's $\exp$ and $\log$, the C compiler, and IEEE-754 arithmetic with directed rounding;
- for Theorem 13, the ball around [D₅](https://en.wikipedia.org/wiki/D5_lattice), SageMath's exact rational arithmetic and its interval arithmetic;
- the coverage and merge scripts, about 240 lines of Python;
- the mathematics on paper: the starting box, what each leaf type means, and the theorems the leaves call on.

In the paper: Appendix E, "What has to be trusted".
{ .paper-ref }

The paper adds one more honest point. The checks are independent as code, but not in authorship. All the components were written with the same AI tools. A shared misreading of the specification, such as the meaning of a leaf type, would not be caught by the programs agreeing with each other. That is why the paper states every leaf test and the starting box as plain mathematics, so that a reader can check them against the text, and why the checkers are kept short enough to read. In principle they could be replaced by a formal proof in a proof assistant, which would take the compiler and the C code out of the trusted base.

## Checking it yourself

The certificate repository has a guide, [VERIFY.md](https://github.com/nickhg/isodual_constant/blob/main/VERIFY.md), with four levels of effort.

| level | what you check | time |
|---|---|---|
| 1 | every exact (non-search) certificate, including Theorem 13 | about 3.5 hours on a laptop with SageMath |
| 2 | a complete worked example: checker, then coverage, plus the checker's own tests | about 3 minutes |
| 3 | a sample of the published logs, against the hash lists | 1–2 hours, a few GB of download |
| 4 | every log, plus full coverage | about 620 vCPU-hours, 263 GB |

Level 2 is the place to start. It builds both checkers exactly as in the final re-check, re-proves a stage-1 log and a stage-2 archive, and runs the coverage scripts on one piece of the search.

The code is at [github.com/nickhg/isodual_constant](https://github.com/nickhg/isodual_constant) (archived as [doi:10.5281/zenodo.23650216](https://doi.org/10.5281/zenodo.23650216)), and the logs are on Hugging Face ([doi:10.57967/hf/11260](https://doi.org/10.57967/hf/11260)).
