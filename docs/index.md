# The question

When [LLL](https://en.wikipedia.org/wiki/Lenstra%E2%80%93Lenstra%E2%80%93Lov%C3%A1sz_lattice_basis_reduction_algorithm) finishes, it is because a single number has stopped going down.

That number is the product of the squared volumes of the first one, two, three, … basis vectors: the squared length of $b_1$, times the squared area of the parallelogram on $b_1, b_2$, times the squared volume of the box on $b_1, b_2, b_3$, and so on up to the whole basis. It is essentially the quantity [Arjen Lenstra](https://en.wikipedia.org/wiki/Arjen_Lenstra), [Hendrik Lenstra](https://en.wikipedia.org/wiki/Hendrik_Lenstra) and [László Lovász](https://en.wikipedia.org/wiki/L%C3%A1szl%C3%B3_Lov%C3%A1sz) call $D$ (theirs leaves out the volume of the whole lattice, which never changes), and they used it as the "potential" in their proof that the algorithm terminates. Every swap LLL makes shrinks it by a constant factor, and it cannot shrink forever, so LLL stops.

A 2007 paper, *Isodual reduction of lattices*, asked a simple question about it. If you are allowed to pick the best possible basis, how large can that number be forced to be? Put differently, which lattice is the most stubborn, the one whose best basis still has the largest potential?

This is a cousin of a question [Hermite](https://en.wikipedia.org/wiki/Charles_Hermite) asked in 1850, and in five dimensions its answer is exactly 6. This site is a tour of that answer, of the lattice that got in the way of the obvious proof, and of how a computer was made to check about nine billion small cases, and how that check was itself checked.

## A cousin of Hermite's question

Hermite's question is about a single vector. Take a lattice in $n$ dimensions, scale it so that its fundamental cell has volume 1, and look at its shortest nonzero vector. How long can that shortest vector be? The answer, squared, is [Hermite's constant](https://en.wikipedia.org/wiki/Hermite_constant) $\gamma_n$. The lattice that attains it is the one that keeps its points as far apart as possible: the densest lattice packing of spheres.

In two dimensions the answer is the [hexagonal lattice](https://en.wikipedia.org/wiki/Hexagonal_lattice), the pattern of a honeycomb, and $\gamma_2 = 2/\sqrt3$. Lagrange and Gauss knew it. In 1873 and 1877 [Korkine](https://en.wikipedia.org/wiki/Aleksandr_Korkin) and [Zolotarev](https://en.wikipedia.org/wiki/Yegor_Ivanovich_Zolotaryov) settled dimensions four and five. The answers there are [D₄](https://en.wikipedia.org/wiki/D4_lattice) and [D₅](https://en.wikipedia.org/wiki/D5_lattice), two "checkerboard" lattices that we will meet properly in a later chapter. Beyond that, [Hermite's constant](https://en.wikipedia.org/wiki/Hermite_constant) is known only in dimensions 6, 7, 8 and 24.

The 2007 question is the same kind of question, but about the whole basis rather than its first vector. A basis gives you a nested chain of subspaces: the line through $b_1$, the plane through $b_1$ and $b_2$, the 3-space through the first three, and so on. That chain is called a *flag*. Hermite asks how big the first step of the best flag can be forced to be. The LLL potential multiplies all the steps together.

Why care about all the steps? Because reduction algorithms do. LLL, and the deeper algorithms built on it (PotLLL, DeepBKZ and their relatives), don't only want a short first vector. They want every step of the basis to be reasonably small, not just the first.

## The number we are after

Here is the definition, informally first. Take a lattice $L$ and look over all its bases for the one whose potential is smallest. Divide by the right power of the volume, so that scaling the lattice changes nothing. That gives a number $\eta(L)$ attached to the lattice. Then ask for the largest value of $\eta(L)$ over all $n$-dimensional lattices. That is $\eta_n$.

In symbols, with $G_k$ the squared volume (the Gram determinant) of the first $k$ basis vectors and $\Delta = G_n$ that of the whole lattice:

$$
\Psi^2(B) = \prod_{k=1}^{n} G_k, \qquad
\eta(L) = \min_B \frac{\Psi^2(B)}{\Delta^{(n+1)/2}}, \qquad
\eta_n = \sup_L \eta(L).
$$

In the paper: §2, Definition 1. All lengths on this site are squared, as in the paper, so that the arithmetic stays exact.
{ .paper-ref }

One feature of $\eta$ is easy to state and drives everything that follows. If you take the dual lattice and read the dual basis backwards, the potential comes out the same, up to the volume factor. So $\eta(L) = \eta(L^*)$: a lattice and its dual are equally stubborn. That is where the 2007 paper got its title, and it is why, in dimension five, there turn out to be two winners rather than one.

## Try it in two dimensions

In two dimensions everything is visible. The potential of a basis $b_1, b_2$ is $|b_1|^2$ times the area squared, and the area is fixed by the lattice. So the only thing a basis can do is choose its first vector, and the best it can do is choose a shortest one. That makes $\eta_2 = \gamma_2 = 2/\sqrt3$, attained by the hexagonal lattice.

Drag the arrowheads below. They snap to lattice points. Try to make $\Psi^2$ as small as you can, then press *Best basis* to see the exact answer. Notice that moving $b_2$ alone never changes $\Psi^2$.

<div class="widget" data-widget="lattice2d" data-config='{"lattice": "hex"}'></div>

In two dimensions the flag has only one interesting step, so $\eta$ is just Hermite's question again. From three dimensions on, the steps pull against each other. A very short first vector can force the later steps to be large, and the best basis has to balance them.

## The answers so far

| $n$ | $\eta_n$ | attained by | who |
|---|---|---|---|
| 2 | $2/\sqrt3 \approx 1.155$ | the hexagonal lattice [A₂](https://en.wikipedia.org/wiki/Hexagonal_lattice) | Lagrange, Gauss (it is $\gamma_2$) |
| 3 | $3/2$ | [A₃](https://en.wikipedia.org/wiki/Close-packing_of_equal_spheres) (fcc) and A₃* ([bcc](https://en.wikipedia.org/wiki/Cubic_crystal_system)) | the 2007 paper; Meyer independently, 2008 |
| 4 | $3$ | D₄ | Meyer's thesis (2008); uniqueness in the new paper |
| 5 | $6$ | D₅ and D₅*, and only them | the new paper |
| 8 | $2304$ | [E₈](https://en.wikipedia.org/wiki/E8_lattice) | the new paper |
{ .values }

In the paper: Theorems A, 7, 8 and 14, Proposition 6.
{ .paper-ref }

Five is the dimension where Korkine and Zolotarev settled Hermite's constant, with D₅. Ask their question about the whole basis instead of its first vector, and dimension five gives the same answer, D₅, except that now its dual D₅* ties with it.

Dimensions 6 and 7 are open. There is a conjecture, that the answers are attained by [E₆](https://en.wikipedia.org/wiki/E6_lattice) and [E₇](https://en.wikipedia.org/wiki/E7_lattice) with values $128\sqrt3/9 \approx 24.63$ and $144$. Both are proved to be strict local maxima, but nobody has shown that nothing else does better. Chapter 11 has the details.

Bertrand Meyer, in his 2008 thesis, put these constants inside a larger family, the *generalized Hermite constants* of Watanabe and Meyer, one for each way of chopping up a flag. The constant here is the "staircase" case, the one that uses every step. Meyer observed that very little was known about explicit values of these constants. For the staircase, no explicit value seems to have been known in dimension five or higher.

## How to read this site

The chapters build on each other, but you can dip in. Chapters 2–4 cover lattices, duals, flags and the potential, then the small dimensions; if you know what a Gram matrix is, skim them. Chapters 5–7 are the heart of it: why D₅ and its dual both win, the natural proof, and the strange lattice M\* that stops the natural proof just short. Chapters 8–10 explain the computer-assisted part, from branch and bound in a dimension you can watch to the two stages of the real search and what you have to trust. Chapters 11 and 12 cover the E-lattices, growth in high dimension, what all this means for lattice reduction, and the open problems.

Hover over or tap a lattice name like D₄ anywhere on the site for a one-line reminder, or see the [glossary](glossary.md). Small grey notes like the ones above point to the theorem in the paper that backs each claim. Everything here comes from the paper or from the certificate repository. Where something is numerical evidence rather than proof, the text says so.

The paper is *The isodual constant of the LLL potential: exact values and structure*, [Cryptology ePrint Archive 2026/2846](https://eprint.iacr.org/2026/2846). The code, checkers and exact certificates are at [github.com/nickhg/isodual_constant](https://github.com/nickhg/isodual_constant), archived on Zenodo as [doi:10.5281/zenodo.23650216](https://doi.org/10.5281/zenodo.23650216). The 263 GB of certificate logs are on Hugging Face as [doi:10.57967/hf/11260](https://doi.org/10.57967/hf/11260). The 2007 paper is [ePrint 2007/105](https://eprint.iacr.org/2007/105).
