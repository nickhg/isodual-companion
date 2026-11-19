# Glossary

Short, plain definitions, with a link for more. Lengths are squared throughout, as in the paper.

## Lattices and bases

**Lattice.** All integer combinations of $n$ independent vectors in $n$-dimensional space: a grid that looks the same from every point. [More](https://en.wikipedia.org/wiki/Lattice_(group)).

**Basis.** A choice of $n$ vectors that generate the lattice. Every lattice has infinitely many; they differ by integer matrices of determinant $\pm1$.

**Gram matrix.** The table of inner products $b_i\cdot b_j$ of a basis. It describes the lattice up to rotation. [More](https://en.wikipedia.org/wiki/Gram_matrix).

**Determinant, $\Delta$.** The determinant of the Gram matrix: the squared volume of the basis cell. The same for every basis.

**Dual lattice, $L^*$.** All vectors whose inner product with every lattice vector is an integer. Its Gram matrix is the inverse.

**Isodual.** Similar to its own dual: a rotated, rescaled copy of it. Examples: the hexagonal lattice, D₄, E₈, M\*.

**Modular.** An even lattice that becomes its own dual after scaling by $\sqrt\ell$; $\ell$ is the level. M\* is 135-modular.

**Root.** In the root lattices below, a shortest vector, of squared length 2. The roots generate the lattice. [More](https://en.wikipedia.org/wiki/Root_system).

**Coxeter number, $h$.** A number attached to a root system: 6 for D₄, 5 for A₄, 8 for D₅, 12 for E₆, 18 for E₇, 30 for E₈. [More](https://en.wikipedia.org/wiki/Coxeter_number).

## Flags and the potential

**Gram–Schmidt profile, $r_i$.** The squared heights $|b_i^*|^2$: how far each basis vector sticks out of the span of the earlier ones. [More](https://en.wikipedia.org/wiki/Gram%E2%80%93Schmidt_process).

**Gram–Schmidt height.** How far $b_k$ sticks out of the span of $b_1, \dots, b_{k-1}$; its square is $r_k$.

**Staircase.** The Gram–Schmidt profile $r_1, \dots, r_n$ drawn as a row of bars. For a good basis it usually steps down. The best staircase of D₅ is $2, \tfrac32, \tfrac43, 1, 1$.

**Flag.** The nested chain of subspaces of a basis: the line through $b_1$, the plane through $b_1, b_2$, and so on, each holding the lattice $L_k$ spanned by the first $k$ vectors. (A flagpole is a line, and the cloth fixed to it is a plane.)

**Step of a flag.** One subspace of the chain, or the lattice $L_k$ spanned by the first $k$ basis vectors inside it.

**The two ends of a flag.** The first step (a single vector, a line) and the last step (a hyperplane, everything but one dimension). Duality swaps them: the last step of a flag of $L$ corresponds to the first step of the reversed dual flag of $L^*$. Hermite's constant looks only at the first end; the potential weighs both.

**Prefix volume, $G_k$.** The squared volume of the first $k$ basis vectors, $G_k = r_1\cdots r_k$.

**Potential, $\Psi^2$.** The product $G_1 G_2\cdots G_n$. LLL decreases it at every swap. [LLL](https://en.wikipedia.org/wiki/Lenstra%E2%80%93Lenstra%E2%80%93Lov%C3%A1sz_lattice_basis_reduction_algorithm).

**Ψ-minimal.** A basis of smallest potential.

**$\eta(L)$.** The smallest potential of a basis of $L$, divided by $\Delta^{(n+1)/2}$ so that scaling doesn't matter. $\eta(L) = \eta(L^*)$.

**$\eta_n$.** The largest $\eta(L)$ over $n$-dimensional lattices. Known: $\eta_2 = 2/\sqrt3$, $\eta_3 = 3/2$, $\eta_4 = 3$, $\eta_5 = 6$, $\eta_8 = 2304$.

**Hermite's constant, $\gamma_n$.** The largest possible squared length of the shortest vector, at determinant 1. $\gamma_2 = 2/\sqrt3$, $\gamma_4 = \sqrt2$, $\gamma_5 = 8^{1/5}$. [More](https://en.wikipedia.org/wiki/Hermite_constant).

**Critical lattice.** A lattice attaining Hermite's constant: the densest lattice packing in its dimension.

**Korkine–Zolotarev reduction.** Reduction that makes each projected first vector a shortest one. Korkine and Zolotarev also found $\gamma_4$ and $\gamma_5$.

**$\mu_m$, the Ψ-Hermite constant.** The largest possible $|b_1|^2$ in a Ψ-minimal basis, at determinant 1. Equal to $\gamma_m$ for $m \le 5$.

## Named lattices

**A_n.** Integer points in $\mathbb Z^{n+1}$ with coordinate sum 0. A₂ is the hexagonal lattice, the pattern of a honeycomb. A₃ is fcc, how greengrocers stack oranges.

**A₃\* (bcc).** The body-centred cubic lattice, the dual of fcc.

**D_n.** Integer points in $\mathbb Z^n$ with an even coordinate sum: the checkerboard. D₄ is the densest lattice in four dimensions ([more](https://en.wikipedia.org/wiki/16-cell_honeycomb)), and D₅ in five.

**D₅\*.** The dual of D₅: $\mathbb Z^5$ together with $\mathbb Z^5 + (\tfrac12,\dots,\tfrac12)$. With D₅, the only lattice with $\eta = 6$.

**E₆, E₇, E₈.** The exceptional root lattices, with 72, 126 and 240 roots, the densest lattices in dimensions 6, 7 and 8. E₈ is the densest sphere packing in eight dimensions. [More](https://en.wikipedia.org/wiki/E8_lattice).

**$A_2\otimes A_2$.** A four-dimensional lattice built from two copies of the hexagonal lattice. It is isodual, and the far end of the geodesic in chapter 7.

**M\*.** The four-dimensional lattice where $\Phi_5$ is largest, at $2^{16}/(3^4\cdot5^3)\approx6.4727$. It is even and 135-modular, the unique densest lattice in its genus, Hermitian over the Eisenstein integers, and symplectic.

**L\*.** The five-dimensional lift of M\* that attains $\kappa(M_*)$. It has $\eta(L_*) = 486/125$.

## The proof

**Shadow, $\pi_vL$.** The lattice obtained by projecting $L$ along a shortest vector $v$ onto the hyperplane perpendicular to it.

**Lifting form, $\varphi$.** A linear form on the shadow, taken modulo 1, that says how the layers of $L$ are shifted over it.

**$\kappa(M)$.** The greatest height $|v|^2$ that any lift of $M$ can have while keeping $v$ a shortest vector, at determinant 1.

**$\Phi_n(M)$.** $\kappa(M)^{(n-1)/2}\eta(M)$, an upper bound for $\eta$ of every lattice with shadow $M$.

**Eisenstein integers.** Numbers $a + b\omega$ with $\omega$ a cube root of unity: the hexagonal lattice viewed as numbers. [More](https://en.wikipedia.org/wiki/Eisenstein_integer).

**Hermitian lattice.** A lattice over a ring such as the Eisenstein integers, with an inner product given by a [Hermitian matrix](https://en.wikipedia.org/wiki/Hermitian_matrix).

**Symplectic lattice.** A lattice carrying a compatible [symplectic form](https://en.wikipedia.org/wiki/Symplectic_vector_space). NTRU lattices are an example. Symplectic lattices are isodual.

**Branch and bound.** Covering a region by boxes, closing each with a proof that holds on all of it, and splitting the rest. [More](https://en.wikipedia.org/wiki/Branch_and_bound).

**Leaf types.** (D) no Ψ-minimal basis; (A) the bound is below the threshold; (C) collected; and in stage 2, (N) a vector shorter than $v$, (F) one flag, (P) a weighted mix of flags, and (B) the ball around D₅ or D₅\*.

**Interval arithmetic.** Computing with intervals guaranteed to contain the true value, rounding outwards at every step. [More](https://en.wikipedia.org/wiki/Interval_arithmetic).

**Voronoi cell.** The region of space closer to a given lattice point than to any other. [More](https://en.wikipedia.org/wiki/Voronoi_diagram).
