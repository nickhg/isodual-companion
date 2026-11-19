# Flags and the potential

Pick a basis $b_1, \dots, b_n$ of a lattice and look at what its vectors span, one at a time. The first vector alone spans a line. Add the second and you get a plane. Add the third and you get a three-dimensional space, and so on, until all $n$ vectors fill the whole space.

This nested sequence, a line inside a plane inside a 3-space and so on, is called a **flag**. The name comes from geometry: a flagpole is a line, and the cloth fixed to it is a plane. Each step of the flag holds a smaller lattice of its own,

$$
L_1 \subset L_2 \subset \dots \subset L_n = L,
$$

where $L_k$ is the lattice spanned by the first $k$ basis vectors. Different bases give different flags, and that is the whole game in this chapter. The potential of a basis measures how small the lattices $L_1, L_2, \dots$ are, all at once.

## The staircase

It helps to picture a basis as a staircase.

The first step is $b_1$ itself, with height $|b_1|$. For the second step, take $b_2$ and throw away the part of it that points along $b_1$. What's left, $b_2^*$, is the height of $b_2$ above the line through $b_1$. For the third, take $b_3$ and remove everything in the plane of $b_1, b_2$. What's left, $b_3^*$, is its height above that plane. And so on, one step of the flag at a time.

This is the [Gram–Schmidt process](https://en.wikipedia.org/wiki/Gram%E2%80%93Schmidt_process), and the squared heights

$$
r_i = |b_i^*|^2
$$

are the *Gram–Schmidt profile* of the basis.

Draw them as a row of bars, one per basis vector. For a good basis the bars usually step down from left to right, which is why this picture is called a **staircase**. A lattice's best basis gives its best staircase. For [D₅](https://en.wikipedia.org/wiki/D5_lattice), for example, the best staircase is $2, \tfrac32, \tfrac43, 1, 1$, and chapter 5 shows how that comes out at exactly 6.

The heights multiply to volumes. The area of the parallelogram on $b_1, b_2$ is base times height, $|b_1|\,|b_2^*|$, and in general

$$
G_k = r_1 r_2 \cdots r_k
$$

is the squared volume of $L_k$, the lattice in the $k$-th step of the flag. At the top, $G_n = \Delta$, the same for every basis.

## The potential

The [LLL](https://en.wikipedia.org/wiki/Lenstra%E2%80%93Lenstra%E2%80%93Lov%C3%A1sz_lattice_basis_reduction_algorithm) potential multiplies the volumes of all the steps:

$$
\Psi^2(B) = G_1 G_2 \cdots G_n = r_1^{\,n}\, r_2^{\,n-1} \cdots r_n^{\,1}.
$$

In the paper: §2.
{ .paper-ref }

The second form shows what the potential cares about. The first height counts $n$ times, the second $n-1$ times, and the last only once. A basis with small early steps has a small potential. But the product $r_1 r_2 \cdots r_n = \Delta$ is fixed. If you make the early steps small, the later ones have to grow to compensate. The potential prefers profiles that go *down*, with big early steps made small and the leftover height pushed to the end.

That is exactly what LLL does. When LLL swaps two neighbouring vectors because the second one, projected, is much shorter than the first, the swap shrinks $r_i$, grows $r_{i+1}$, and leaves $r_i r_{i+1}$ the same. That lowers the potential by a definite factor. So LLL is a descent on $\Psi^2$, one swap at a time.

Two facts about bases that minimise $\Psi^2$ follow straight from the definition.

No neighbour swap helps. In a basis of smallest potential, $r_{i+1} \ge \tfrac34 r_i$ for every $i$, the same inequality LLL ends with (with its parameter at the extreme value 1). Every block is itself optimal. If you take a run of consecutive vectors $b_i, \dots, b_j$ and project away the earlier ones, that block is a best basis of the lattice it spans. Changing it alters only the volumes inside the block, by exactly the block's own potential.

In the paper: §2, "Heredity", and §9.
{ .paper-ref }

## Normalising: from a basis to a lattice

The potential of the best basis depends on the scale of the lattice: double every length and $\Psi^2$ grows. To get a number that belongs to the *shape* of the lattice, divide by the right power of $\Delta$. Each $G_k$ scales like $\Delta^{k/n}$, so $\Psi^2$ scales like $\Delta^{(n+1)/2}$, and

$$
\eta(L) = \min_B \frac{\Psi^2(B)}{\Delta^{(n+1)/2}}
$$

is unchanged by scaling. A basis attaining the minimum is called *Ψ-minimal*.

## Working the hexagonal lattice

Take $A_2$ with the Gram matrix of the last chapter,

$$
G = \begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix}.
$$

The first step is $r_1 = 2$. The second is $r_2 = \Delta / r_1 = 3/2$. So $G_1 = 2$, $G_2 = 3$, and

$$
\Psi^2 = 2 \cdot 3 = 6, \qquad \eta(A_2) = \frac{6}{3^{3/2}} = \frac{2}{\sqrt3} \approx 1.1547.
$$

No basis does better, because in two dimensions $\Psi^2 = |b_1|^2\,\Delta$ and $b_1 = $ a shortest vector is the best you can do. This is [Hermite's constant](https://en.wikipedia.org/wiki/Hermite_constant) $\gamma_2$ again.

## Working fcc

In three dimensions it gets more interesting. The fcc lattice, [A₃](https://en.wikipedia.org/wiki/Close-packing_of_equal_spheres), has the Gram matrix

$$
G = \begin{pmatrix} 2 & -1 & 0 \\ -1 & 2 & -1 \\ 0 & -1 & 2 \end{pmatrix}, \qquad \Delta = 4.
$$

Run Gram–Schmidt. The first step is $r_1 = 2$. The plane of the first two vectors has $G_2 = 2\cdot 2 - 1 = 3$, so $r_2 = 3/2$. The whole lattice has $G_3 = 4$, so $r_3 = 4/3$. The staircase is

$$
r = \left(2,\ \tfrac32,\ \tfrac43\right), \qquad G = (2,\ 3,\ 4), \qquad \Psi^2 = 24,
$$

and $\eta(A_3) = 24/4^2 = 3/2$.

The pattern $2, \tfrac32, \tfrac43, \tfrac54, \dots$ continues for every $A_n$. Each prefix determinant is as small as a sublattice of $A_n$ can possibly be, $G_k = k+1$, so this basis is Ψ-minimal. That gives a closed formula for $\eta(A_n)$, one of the exact values in the paper.

In the paper: Lemma 4 and Theorem 5, Table 2.
{ .paper-ref }

Now play with it. The widget shows fcc (or [bcc](https://en.wikipedia.org/wiki/Cubic_crystal_system), or the cubic lattice $\mathbb Z^3$) with a deliberately poor basis. The red arrow is $b_1$, and the red line is the first step of the flag. The blue plane is the span of $b_1, b_2$, the second step. The dotted lines are the Gram–Schmidt heights: from the tip of $b_2$ down to the line of $b_1$, and from the tip of $b_3$ down to the plane. The bars on the right are their squares, coloured to match. On the right are the staircase and the potential. Change the basis with the buttons. Choose $i$ and $j$, then add, subtract, swap or negate. Watch the potential fall, or press *Find best*, which searches all bases exactly.

<div class="widget" data-widget="lattice3d" data-config='{"lattice": "fcc", "fallback": "fcc_flag.png", "fallbackCaption": "fcc with a basis: the red line is the first step of the flag, the blue plane the second."}'></div>

A few things to try:

- For fcc and for bcc, *Find best* reaches $\Psi^2/\Delta^2 = 3/2$. That is no accident. fcc and bcc are duals, and $\eta(L) = \eta(L^*)$.
- For $\mathbb Z^3$ the best basis is the obvious one, with every step 1 and $\eta = 1$.
- In fcc, try to get a better potential by making $b_1$ and $b_2$ both short but leaving $b_3$ long. You can't beat the staircase $2, \tfrac32, \tfrac43$.

One small surprise, from the 2007 paper: in a Ψ-minimal basis, $b_1$ need not be a shortest vector of the lattice. Already in three dimensions there are lattices where the best balance between the steps starts with a slightly longer first vector. The potential and Hermite's constant ask genuinely different questions. [Chapter 2](lattices.md#two-ways-to-say-best) has the explicit example, with a widget.

## The two ends of a flag

A flag has a first step, a single vector, and a last step, a hyperplane: everything but one dimension. Hermite's constant cares only about the first step, how long the shortest vector can be forced to be. The potential cares about every step, the last one included.

Duality turns flags around. Take the dual basis $d_1, \dots, d_n$ of chapter 2 and read it backwards. Its first vector $d_n$ is perpendicular to the hyperplane $L_{n-1}$, its first two vectors span the plane perpendicular to $L_{n-2}$, and so on. The last step of the original flag becomes the first step of the dual one, the second-to-last becomes the second, and the volumes match up exactly:

$$
G^*_k = \frac{G_{n-k}}{\Delta}.
$$

<figure markdown>
<svg viewBox="0 0 640 210" class="wsvg wide" role="img" aria-label="A flag of L and the reversed dual flag of L-star, with the steps paired">
  <text x="150" y="22" class="mlbl" text-anchor="middle">flag of L</text>
  <text x="490" y="22" class="mlbl" text-anchor="middle">reversed dual flag of L*</text>
  <g class="tick">
    <rect x="60" y="40" width="180" height="40" rx="6" fill="#d6604d" opacity="0.18"/>
    <text x="150" y="65" text-anchor="middle">step 1: line through b₁ (G₁)</text>
    <rect x="60" y="95" width="180" height="40" rx="6" fill="#2166ac" opacity="0.18"/>
    <text x="150" y="120" text-anchor="middle">step 2: plane of b₁, b₂ (G₂)</text>
    <rect x="60" y="150" width="180" height="40" rx="6" fill="#1b9e77" opacity="0.18"/>
    <text x="150" y="175" text-anchor="middle">step 3: all of L (Δ)</text>
    <rect x="400" y="40" width="180" height="40" rx="6" fill="#2166ac" opacity="0.18"/>
    <text x="490" y="65" text-anchor="middle">step 1: line through d₃ (G₂/Δ)</text>
    <rect x="400" y="95" width="180" height="40" rx="6" fill="#d6604d" opacity="0.18"/>
    <text x="490" y="120" text-anchor="middle">step 2: plane of d₃, d₂ (G₁/Δ)</text>
    <rect x="400" y="150" width="180" height="40" rx="6" fill="#1b9e77" opacity="0.18"/>
    <text x="490" y="175" text-anchor="middle">step 3: all of L* (1/Δ)</text>
  </g>
  <line x1="245" y1="115" x2="395" y2="60" class="dash"/>
  <line x1="245" y1="60" x2="395" y2="115" class="dash"/>
  <text x="320" y="150" class="tick" text-anchor="middle">each step pairs with the one</text>
  <text x="320" y="165" class="tick" text-anchor="middle">perpendicular to it</text>
</svg>
<figcaption>In three dimensions: the line of the dual flag is perpendicular to the plane of the original, and the dual plane is perpendicular to the original line. Matching colours mark paired steps.</figcaption>
</figure>

Multiply over all the steps and the potential of the reversed dual basis is the potential of the original, divided by a power of $\Delta$. That is why $\eta(L) = \eta(L^*)$.

So a lattice can be extremal at either end. It can be extremal at the *first* end, with a shortest vector as long as possible, so that $b_1$ is hard to improve on. Or it can be extremal at the *last* end, with hyperplane sections as sparse as possible. The potential weighs both ends equally. In five dimensions the two ends are won by different lattices, D₅ and its dual, and chapter 5 tells that story.

You can see the reversal in the widget above. Tick *view the dual* and it replaces the lattice by its dual (fcc becomes bcc, up to scale) and the basis by its reversed dual basis. The staircase flips over, and $\Psi^2/\Delta^2$ doesn't change.

## Three dimensions, settled in 2007

The largest value of $\eta$ in three dimensions is $\eta_3 = 3/2$, attained only by fcc and bcc. The 2007 paper proved this, and Meyer found it independently a year later. In four dimensions the answer is $\eta_4 = 3$, attained by [D₄](https://en.wikipedia.org/wiki/D4_lattice). That one is due to Meyer, in his 2008 thesis. The next chapter shows how both come out of one inequality.

In the paper: Proposition 6, Theorem 7.
{ .paper-ref }
