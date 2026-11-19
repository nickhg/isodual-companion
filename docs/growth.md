# Growth, reduction, and what's next

The exact values stop at dimension 8, but the large-scale behaviour is known. This last chapter covers how fast $\eta_n$ grows, what the constants say about lattice reduction, and which questions are still open.

## How fast η grows

The answer is

$$
\log \eta_n = \left(\tfrac14 + o(1)\right) n^2 \log n.
$$

In the paper: Theorem 31.
{ .paper-ref }

The upper bound is the splitting inequality used over and over. Peel off one shortest vector at a time and you get $\eta_n \le \prod_{m \le n}\gamma_m^{m/2}$. Hermite's constant grows roughly linearly, $\gamma_m \le 1 + m/4$, so the logs add up to about $\tfrac14 n^2\log n$.

The lower bound comes from random lattices. A *random* lattice of determinant 1, chosen according to the natural uniform measure on lattices, is a surprisingly stubborn object: even its best basis has a large potential. Kim's mean-value formula counts, on average, how many complete flags a random lattice has with all their volumes below given bounds. Laarhoven used it to study enumeration on random lattices. Ask for flags whose potential is a little below $n^{n^2/4}$, and the expected number of them is tiny. So, with high probability, a random lattice has *no* basis with a smaller potential than that. The paper adds only the uniformity over all staircase shapes that this needs.

So the extremal lattices and typical random lattices agree to leading order. The worst case is, roughly, the typical case.

The next term is pinned down to an interval:

$$
\tfrac14 n^2\log n - (a + o(1))\,n^2 \;\le\; \log\eta_n \;\le\; \tfrac14 n^2\log n - (b + o(1))\,n^2,
$$

with $a \approx 0.8345$ and $b \approx 0.6955$. The gap between $a$ and $b$ is exactly the classical gap in what is known about Hermite's constant for large $m$, between the Minkowski–Hlawka lower bound and the Kabatiansky–Levenshtein upper bound.

In the paper: Corollary 32.
{ .paper-ref }

One consequence: the pattern $\eta_m = H_m$ from chapter 4 has to fail eventually. $\log H_m$ grows like $m^2/4$, without the $\log m$, so it falls behind. Somewhere above dimension 8, the densest lattice stops being the most stubborn one.

## What it means for reduction

Reduction algorithms built on the potential, such as PotLLL, DeepBKZ and PotBKZ, come with proofs that they terminate. But the quality guarantees known for them were those of the algorithms they extend. For PotLLL, for instance, the guarantee was LLL's. None of them used the potential condition itself.

The paper introduces a constant for that. The **Ψ-Hermite constant** $\mu_m$ is the largest possible first Gram–Schmidt norm $|b_1|^2$ in a Ψ-minimal basis of an $m$-dimensional lattice of determinant 1. Since a Ψ-minimal basis need not start with a shortest vector, $\mu_m$ could in principle be larger than $\gamma_m$. A "key inequality" bounds it in terms of $\eta_m$:

$$
\mu_m^{\,m(m-1)/2} \;\le\; \eta_m \prod_{k<m}\mu_k^{\,k}.
$$

In the paper: Theorem 35.
{ .paper-ref }

Feed in the exact values. Whenever $\eta_m = H_m$ and the smaller cases are already known, the right-hand side is exactly $\gamma_m^{m(m-1)/2}$, so $\mu_m = \gamma_m$. That gives

$$
\mu_m = \gamma_m \quad \text{for } m \le 5,
$$

the last case using $\eta_5 = 6$. In words: a basis whose blocks of up to five consecutive vectors are potential-minimal loses nothing, in the first vector of each block, compared with the best possible, Hermite's bound. If the conjectures for dimensions 6 and 7 hold, the same is true up to 8.

In the paper: Corollary 36.
{ .paper-ref }

For large $m$ the inequality gives only $\mu_m \le \exp\big((\tfrac12+o(1))\log^2 m\big)$. That is quasi-polynomial, much better than LLL's exponential $(4/3)^{(m-1)/2}$, but still far from the linear growth of $\gamma_m$. Numerically, in hill climbs over perturbations of root lattices in dimensions 6–8, no Ψ-minimal basis was found whose first vector beat Hermite's bound. In about 7–8% of the lattices tried, though, the first vector of some Ψ-minimal basis was not a shortest vector.

In the paper: Corollary 37, §9.
{ .paper-ref }

The paper doesn't propose a new algorithm. Its contribution to reduction is structural: blocks of up to five consecutive vectors can be reduced by minimising the potential without giving anything up, and the constant $\mu_m$ is what a blockwise analysis needs.

## Open problems, in plain language

1. A shorter proof that $\eta_5 = 6$. Almost all of the nine billion leaves are spent on lifts over a region where, numerically, $\eta$ stays far from 6. A sharper version of the project-and-lift bound, one that sees how loose it is over $M_*$, or a local argument at D₅\*, might replace most of the computation.
2. $\eta_6$ and $\eta_7$. Prove the conjecture. In dimension 6 the reduction to $\Phi_6$ may be enough on its own.
3. Why torsion points? At every known peak of $\Phi_5$ and $\Phi_6$, the best lifting forms are torsion points: of order 2 at the shadow of D₅, 3 at $M_*$, 6 at D₄. Is that always so?
4. Hermitian and symplectic structure. $M_*$ turned out to be Hermitian over the Eisenstein integers and symplectic. Do the lattices that block the reduction in other dimensions have the same kind of structure?
5. Is E₈ the only lattice with $\eta = 2304$? It is the only one nearby.
6. Exact local rates for E₆ and E₇. These are known for D₄ and D₅. For E₆ and E₇ only bounds are known, and numerically the upper bounds are the truth.
7. The second-order term in the growth of $\eta_n$, which is tied to the same question for Hermite's constant.
8. Is $\mu_m = \gamma_m$ for all $m$? Failing that, is $\mu_m$ polynomial in $m$? And is there a direct proof that $\mu_5 = \gamma_5$, one that doesn't go through the whole computer search?
9. Symplectic bases. For symplectic lattices, such as NTRU lattices, one can restrict to symplectic bases. Does every symplectic lattice have a symplectic basis of minimal potential?

In the paper: §10.
{ .paper-ref }

## Where to go next

The [glossary](glossary.md) collects every term used on this site. The [map to the paper](paper-map.md) lists, for each chapter, the sections and results it draws on. The paper itself is [ePrint 2026/2846](https://eprint.iacr.org/2026/2846).
