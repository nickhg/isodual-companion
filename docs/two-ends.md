# Why a flag has two ends

In 1877 Korkine and Zolotarev found the densest lattice in five dimensions. It is D₅, the five-dimensional checkerboard: all integer points $(x_1, \dots, x_5)$ with an even coordinate sum. Its Hermite constant is $\gamma_5 = 8^{1/5} \approx 1.516$, and no other five-dimensional lattice attains it.

The main theorem of the paper asks their question about the whole basis instead of its first vector, and gets the same lattice back.

> **$\eta_5 = 6$.** A five-dimensional lattice has $\eta(L) = 6$ if and only if it is similar to D₅ or to its dual D₅\*.

In the paper: Theorem A (Theorem 14).
{ .paper-ref }

The answer is the same lattice, but with a partner. This chapter is about the partner, and why it has to be there.

## Meet D₅\*

The dual of D₅ is easy to describe. It is the cubic lattice $\mathbb Z^5$ together with a second copy of it shifted by $(\tfrac12, \tfrac12, \tfrac12, \tfrac12, \tfrac12)$:

$$
D_5^* = \mathbb Z^5 \,\cup\, \left(\mathbb Z^5 + \tfrac12\mathbf 1\right).
$$

Its shortest vectors are the ten unit vectors $\pm e_i$, of squared length 1. The half-integer points have squared length at least $5/4$, so they are longer. As a sphere packing D₅\* is mediocre. Its Hermite invariant is $\gamma(D_5^*) = 2^{2/5} \approx 1.32$, well below $\gamma_5 \approx 1.52$. If you only care about the first vector, D₅\* is nowhere near the top.

Yet for the whole flag, D₅\* does exactly as well as D₅. Their best staircases are side by side below, with D₅\* scaled by 2 so that its first step matches.

<div class="widget" data-widget="staircase" data-config='{"lattices": ["D5", "D5*"]}'></div>

They are mirror images. Take the D₅ staircase $2, \tfrac32, \tfrac43, 1, 1$, reverse it, and take reciprocals: $1, 1, \tfrac34, \tfrac23, \tfrac12$. Doubling every entry gives the D₅\* staircase $2, 2, \tfrac32, \tfrac43, 1$. That is the rule $G^*_k = G_{n-k}/\Delta$ from chapter 2, seen one step at a time. D₅ is steep at the start and flat at the end. D₅\* is flat at the start and steep at the end.

Check the arithmetic. For D₅ the volumes are $G = (2, 3, 4, 4, 4)$, with $\Delta = 4$:

$$
\eta(D_5) = \frac{2\cdot3\cdot4\cdot4\cdot4}{4^{3}} = \frac{384}{64} = 6.
$$

For D₅\* (doubled), $G = (2, 4, 6, 8, 8)$, with $\Delta = 8$:

$$
\eta(D_5^*) = \frac{2\cdot4\cdot6\cdot8\cdot8}{8^{3}} = \frac{3072}{512} = 6.
$$

## The first step and the last step

Duality turns the beginning of a flag into its end. That is the real reason for the tie.

The first step of a flag is a vector. Making it as long as possible is Hermite's problem, and D₅ wins it.

The last step is a hyperplane section, the four-dimensional sublattice spanned by $b_1, \dots, b_4$. Making it as large as possible is a problem of the same kind, about hyperplanes rather than vectors. A four-dimensional sublattice of $L$ is cut out by a primitive vector $w$ of the dual lattice, and its volume is $|w|^2 \det L$. So the hyperplane problem for $L$ is Hermite's problem for $L^*$. The lattice with the largest hyperplane sections is the dual of the densest lattice, which is D₅\*.

The potential multiplies all the steps, and it treats a flag and its reversed dual flag the same way. D₅ is as good as possible at the first step, and D₅\* is as good as possible at the last. Both come out at exactly 6.

In the paper: the remark "Vectors and flags" after Theorem 14.
{ .paper-ref }

## The same pattern elsewhere

The pattern shows up wherever the answer is known or conjectured. In dimension 3, fcc and bcc tie for $\eta_3 = 3/2$. D₄ and E₈ are their own duals, so each is its own partner and wins alone. In dimensions 6 and 7 the conjectured winners come in pairs again, E₆ with E₆\* and E₇ with E₇\*.

So two winners isn't a defect of the theorem. A question that weighs the first and last steps of a basis equally should be expected to have a lattice and its dual as joint answers.

## Two shadows

There is a second way to see the pair, and it matters for the proof.

Take a lattice and squash it flat along a shortest vector $v$. Every point slides along $v$ onto the hyperplane perpendicular to it, and the result is a lattice in one dimension fewer, written $\pi_v L$. Call it the *shadow* of $L$ along $v$. The splitting inequality of the last chapter, with $k = 1$, bounds $\eta(L)$ by its shadow:

$$
\eta(L) \;\le\; \gamma(L)^{n/2}\,\eta(\pi_v L).
$$

Both D₅ and D₅\* meet this with equality, but in different ways.

For D₅, squash along a root, such as $v = (0,0,0,1,1)$. The shadow is D₄ with one coordinate axis shrunk by $1/\sqrt2$. Its $\eta$ is $3/\sqrt2$, and D₅ has $\gamma^{5/2} = (8^{1/5})^{5/2} = 2\sqrt2$, so the bound is $2\sqrt2 \cdot 3/\sqrt2 = 6$. The first vector is as long as possible, and the shadow is not the best four-dimensional lattice.

For D₅\*, squash along $e_1$. The shadow is $\mathbb Z^4 \cup (\mathbb Z^4 + \tfrac12\mathbf 1)$, which is D₄\*, a copy of D₄ itself, the best four-dimensional lattice, with $\eta = 3$. Here $\gamma^{5/2} = (2^{2/5})^{5/2} = 2$, and the bound is $2 \cdot 3 = 6$. The first vector is short, but the shadow is perfect.

In the paper: §6, before Proposition 21, and the display after Remark 23.
{ .paper-ref }

So a proof that $\eta_5 \le 6$ has to deal with two quite different ways of reaching 6. One has a long first vector over a mediocre shadow. The other has a short first vector over the best possible shadow. Any lattice that hopes to beat 6 must have *both* $\gamma(L)$ and $\gamma(L^*)$ above $2^{2/5}$, the value at D₅\*.

In the paper: §4.3, "The dual-side split is tight".
{ .paper-ref }

That second picture, a lattice as a lift of its shadow, is the natural way into the proof. The next chapter follows it, and shows how far it gets.
