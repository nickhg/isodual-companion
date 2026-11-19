# Map to the paper

Theorem numbers refer to *The isodual constant of the LLL potential: exact values and structure*, [ePrint 2026/2846](https://eprint.iacr.org/2026/2846).

| chapter | paper |
|---|---|
| [The question](index.md) | §1; Theorems A, 7, 8, 14; Proposition 6 |
| [Lattices, bases and duals](lattices.md) | §2 (Gram matrices, isoduality) |
| [Flags and the potential](flags.md) | §2 (definition, heredity); Lemma 4, Theorem 5, Table 2; §9 ($r_{i+1}\ge\frac34r_i$) |
| [Small dimensions](small.md) | Lemma 3; Theorems 5, 7, 8; §4.3 ($H_m$); Table 3 |
| [Why a flag has two ends](two-ends.md) | Theorem 14 and the remark after it; §4.3 (dual-side split); §6 (shadows of D₅, D₅\*) |
| [Project and lift](project-lift.md) | §5.1: Lemma 9, Proposition 10, Corollary 11, Proposition 12; Proposition 28 |
| [The surprise: M\*](mstar.md) | §6: Figure 1, Definition 16, Proposition 17, Remark 18, Theorem 20, Proposition 22, Remarks 23–24, Figure 2 |
| [Branch and bound you can watch](bnb.md) | Appendix C (coordinates, root box, leaf types); Theorem 13 (miniature only, not a result of the paper) |
| [Two stages](two-stages.md) | Theorem 14 and its proof; Theorems 19, 20; Appendices C–E |
| [Why trust the computer](trust.md) | Appendix C ("Arithmetic"); Appendix E (checkers, coverage, final re-check, check_lift2, tests, trusted base); VERIFY.md |
| [E₆, E₇, E₈](e-lattices.md) | Conjecture 25, Proposition 26, Remark 27, Table 3, Conjecture 30, §7.2; Theorem 13 and Appendix A |
| [Growth and what's next](growth.md) | Theorem 31, Corollary 32 (§8); Theorem 35, Corollaries 36–37 (§9); §10 |

The certificate repository is [github.com/nickhg/isodual_constant](https://github.com/nickhg/isodual_constant). Its `numerics/` folder holds the data for the geodesic figure, and [VERIFY.md](https://github.com/nickhg/isodual_constant/blob/main/VERIFY.md) explains how to check the certificates.
