# Notes on the first pass (18 Nov 2026)

Built from `notes/companion_site_build_for_cc.md` and `notes/companion_flag_definitions_for_cc.md` (Web Claude), with
Nick's corrections during the build. Every number comes from the paper (ePrint 2026/2846, the Math Comp submission
version, commit 0b3340c of the paper repo) or from the certificate repository (release v1.2).

## Decisions that differ from the spec
- **Voice.** The spec asked for Nick's first person. Nick asked instead for an impersonal voice ("the 2007 paper asked…",
  "it is interesting to look at…"), with an occasional inclusive "we". All chapters follow that.
- **"Flag version".** Nick pointed out that "the flag version of Korkine–Zolotarev" explains nothing. It is replaced
  everywhere by plain wording ("their question asked about the whole basis instead of its first vector").
- **projectlift.** The spec says φ lives "on the 1D torus". For fcc → 2D the lifting form is two numbers mod 1, so the
  widget has two φ sliders and an r slider.
- **Leaf counts** are in Appendix E of the paper (the spec says Appendix D).
- **bnb3d** (optional in the spec) is not built.
- **bnb2d** adds a "threshold 1.15 (too low)" mode, in which boxes around the hexagonal lattice get *collected*. It
  makes the hand-off to stage 2 visible. The root box uses Minkowski's bound $|b_1|^2\le4/\pi$ (non-circular, unlike
  $\mu_2=\gamma_2$). The (B) ball has radius 0.02, chosen for the picture. In 2D it is a piece of Lagrange's theorem,
  standing in for Theorem 13, and the chapter says so.
- **Tooltips.** Python-Markdown's abbreviation matcher can't end a term on `*`, so D₅\*, E₆\*, M\* etc. have no tooltips of
  their own. The D₅, A₃, E₆ and E₇ tooltips describe the dual too. M\* is in the glossary only.
- **Brian Moulton** is not credited on the site (Nick, 18 Nov). Chapter 11 states the exact D₄/D₅ first-order rates
  without names.

## Chapter by chapter: sources, and what Nick should check
1. **index.md (The question).** §1, Definition 1, Theorems A/7/8/14, Proposition 6. Check the history sentences: LLL's
   name $D$ for the potential; Lagrange/Gauss for $\gamma_2$; KZ 1873/1877. "For the staircase, no explicit value seems
   to have been known in dimension five or higher" paraphrases the paper's "we are not aware of any explicit value for
   $n\ge5$".
2. **lattices.md.** §2. Standard material. The A₂ dual computation is worked by hand.
3. **flags.md.** §2, §9 ($r_{i+1}\ge\frac34r_i$), Lemma 4, Theorem 5. The flagpole etymology is from WC's note. The "two
   ends" diagram is new. The claim that a Ψ-minimal $b_1$ need not be shortest is from the 2007 paper (dimension 3
   example).
4. **small.md.** Lemma 3, Theorems 5/7/8, §4.3, Table 3. Check: "Meyer has this one for these constants" (paper: the
   $k=1$ split is exactly [Mey09, Prop. 40]).
5. **two-ends.md.** The remark after Theorem 14; §4.3 dual-side split; §6 shadows. The doubled D₅\* staircase
   $2,2,\frac32,\frac43,1$ is *derived* (reversed reciprocals of D₅'s), not printed in the paper; the arithmetic is shown.
   This is meant to be the emotional centre. Check the tone.
6. **project-lift.md.** §5.1 (Lemma 9, Prop. 10, Cor. 11, Prop. 12), Prop. 28. The 3D widget's κ and Φ₃ come from a
   grid search (labelled numerical): the best φ is fcc's own form (½, ½) and Φ₃ = 3/2 = η₃. This is an illustration,
   not a claim of the paper.
7. **mstar.md.** §6: Def. 16, Prop. 17, Rem. 18, Thm 20, Prop. 22, Rem. 23–24, Figures 1–2. The geodesic widget plots
   `numerics/geodesic_phi5.txt` (lower Φ₅ bracket, s = t ln 2) with the three exact marks. Note that the curve dips
   slightly after D₄ before climbing to M\*. That is in the data, though the intro of the paper says only "climbs".
   Check the "hexagonal lattice of hexagonal lattices" gloss for $\mathbb Z[\omega]$-structure.
   **Added after the first pass:** the paper's Figure 2 contour map (image `phi5_contour.png` from `runs/landscape` of
   the working repo) and a 3D surface widget `landscape3d` built from the same grid (221 × 181 points, step 0.005,
   `docs/assets/data/landscape_phi5.json`). The values are numerical, as the paper says; warm colours mark Φ₅ > 6. That
   grid is not in the public certificate repo's `numerics/`. Nick: add it there?
8. **bnb.md.** App. C coordinates and leaf types, cut to n = 2. Floating point with margin 1e-9, labelled illustration.
9. **two-stages.md.** Thm 14 proof, Thms 19–20, Apps C–E. The stage-1 leaf count is 3.25×10⁸ (App. E); the intro of the
   paper rounds it to 3.2×10⁸.
10. **trust.md.** App. C "Arithmetic", App. E (checkers, coverage incident, final re-check, check_lift2, tests,
    trusted base, independence of authorship), VERIFY.md tiers. The interval picture is a static SVG.
11. **e-lattices.md.** Conj. 25, Prop. 26 (radii 1/10, 3/50, 1/20; rates √70/40, 2√7/27, √42/35), Table 3, Conj. 30,
    §7.2, Thm 13 / App. A (720 flags, r ≥ 0.2392, 4 ⊕ 10). The Schur/averaging explanation is informal. Check it.
12. **growth.md.** Thm 31, Cor. 32 (a ≈ 0.8345, b ≈ 0.6955), Thm 35, Cor. 36–37, §9 numerics, §10 open problems
    (paraphrased, all nine).

## Unsure about
- Density of the "flag" tooltip: every occurrence of "flag" is underlined. It may be too much. It's easy to drop from
  `includes/abbreviations.md`.
- Chapter lengths are 1,000–2,000 words, below the 1,500–3,000 in the spec, by design (the spec also said don't over-polish).
- The lattice2d and lattice3d widgets start from deliberately poor bases. They may need gentler starting points.
- On a phone the geodesic chart's axis labels are small (the SVG scales down with the screen).

## Testing done
- `mkdocs build --strict` passes. Every external link resolved (curl) at build time; one Wikipedia target
  (Korkine–Zolotarev lattice basis reduction) does not exist and was dropped.
- Headless Chromium (Playwright), desktop 1280×900 and phone 390×844 with touch: every page loads with no JS errors, all
  maths renders, every widget mounts. Tested: Find best, view the dual, project/lift animation, bnb in both modes.
- Live site (after deploy): phone-sized screenshots of chapters 1, 3 and 7 look right, with no errors.
- Not tested: real Safari and Firefox, real phones. The WebGL fallback images exist (`docs/assets/img/`) but the
  fallback path was not exercised.
