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

**Korkine–Zolotarev reduction.** Reduction that makes each projected first vector a shortest one (also HKZ). It need not give a Ψ-minimal basis, already in three dimensions ([chapter 2](lattices.md#two-ways-to-say-best)). [Korkine](https://en.wikipedia.org/wiki/Aleksandr_Korkin) and [Zolotarev](https://en.wikipedia.org/wiki/Yegor_Ivanovich_Zolotaryov) also found $\gamma_4$ and $\gamma_5$. [More](https://en.wikipedia.org/wiki/Korkine%E2%80%93Zolotarev_lattice_basis_reduction_algorithm).

**Triangular form.** A basis rotated so that its matrix is lower triangular, $B = MH$ with $H$ orthogonal. The diagonal holds the Gram–Schmidt heights $|b_i^*|$ and the entries below it are $\mu_{ij}|b_j^*|$. [More](lattices.md#the-triangular-form).

**Size reduction.** Making every $|\mu_{ij}| \le \tfrac12$ by adding integer multiples of earlier basis vectors to later ones. It doesn't change $\Psi^2$.

**$\mu_m$, the Ψ-Hermite constant.** The largest possible $|b_1|^2$ in a Ψ-minimal basis, at determinant 1. Equal to $\gamma_m$ for $m \le 5$.

## Named lattices

Each entry below has a basis you can open, written in triangular form for a Ψ-minimal basis: the squared diagonal entries are the staircase, so $\eta$ can be recomputed from the diagonal alone. The matrices are generated and checked exactly by `scripts/glossary_bases.py` in the site's repository.

**ℤⁿ.** All integer points. The standard basis is already triangular, $B = I$, with staircase $1, \dots, 1$ and $\eta = 1$: the reference point every other lattice is measured against.

**A_n.** Integer points in $\mathbb Z^{n+1}$ with coordinate sum 0. A₂ is the [hexagonal lattice](https://en.wikipedia.org/wiki/Hexagonal_lattice), the pattern of a honeycomb. A₃ is fcc, [how greengrocers stack oranges](https://en.wikipedia.org/wiki/Close-packing_of_equal_spheres). [More](https://en.wikipedia.org/wiki/Root_system#Root_lattice).

<!-- basis:A_n -->

??? info "Show a basis of A₂"

    Gram matrix $G$: the Cartan matrix of $A_2$, simple roots $\alpha_1, \alpha_2$.

    $$G = \begin{pmatrix}2&-1\\-1&2\end{pmatrix}$$

    In triangular form, rows $b_1, \dots, b_2$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:

    $$B = \begin{pmatrix}\sqrt{2}&0\\-\tfrac{\sqrt{2}}{2}&\tfrac{\sqrt{6}}{2}\end{pmatrix}$$

    Squared diagonal (the staircase): $2$, $\tfrac{3}{2}$. Volumes $G_k$: $2$, $3$. So $\Psi^2 = G_1\cdots G_2 = 6$, $\Delta = 3$, and $\eta = \Psi^2/\Delta^{3/2} = 6/3^{3/2} = \tfrac{2}{\sqrt3}$.

    In the paper: Table 2 (Theorem 5).
    { .paper-ref }

??? info "Show a basis of A₃ (fcc)"

    Gram matrix $G$: the Cartan matrix of $A_3$, simple roots in order along the chain.

    $$G = \begin{pmatrix}2&-1&0\\-1&2&-1\\0&-1&2\end{pmatrix}$$

    In triangular form, rows $b_1, \dots, b_3$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:

    $$B = \begin{pmatrix}\sqrt{2}&0&0\\-\tfrac{\sqrt{2}}{2}&\tfrac{\sqrt{6}}{2}&0\\0&-\tfrac{\sqrt{6}}{3}&\tfrac{2\sqrt{3}}{3}\end{pmatrix}$$

    Squared diagonal (the staircase): $2$, $\tfrac{3}{2}$, $\tfrac{4}{3}$. Volumes $G_k$: $2$, $3$, $4$. So $\Psi^2 = G_1\cdots G_3 = 24$, $\Delta = 4$, and $\eta = \Psi^2/\Delta^{2} = 24/4^{2} = \tfrac32$.

    In the paper: Table 2 (Theorem 5).
    { .paper-ref }

??? info "Show a basis of A₄"

    Gram matrix $G$: the Cartan matrix of $A_4$, simple roots in order along the chain.

    $$G = \begin{pmatrix}2&-1&0&0\\-1&2&-1&0\\0&-1&2&-1\\0&0&-1&2\end{pmatrix}$$

    In triangular form, rows $b_1, \dots, b_4$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:

    $$B = \begin{pmatrix}\sqrt{2}&0&0&0\\-\tfrac{\sqrt{2}}{2}&\tfrac{\sqrt{6}}{2}&0&0\\0&-\tfrac{\sqrt{6}}{3}&\tfrac{2\sqrt{3}}{3}&0\\0&0&-\tfrac{\sqrt{3}}{2}&\tfrac{\sqrt{5}}{2}\end{pmatrix}$$

    Squared diagonal (the staircase): $2$, $\tfrac{3}{2}$, $\tfrac{4}{3}$, $\tfrac{5}{4}$. Volumes $G_k$: $2$, $3$, $4$, $5$. So $\Psi^2 = G_1\cdots G_4 = 120$, $\Delta = 5$, and $\eta = \Psi^2/\Delta^{5/2} = 120/5^{5/2} = \tfrac{24}{5\sqrt5}$.

    In the paper: Table 2 (Theorem 5).
    { .paper-ref }

<!-- /basis:A_n -->

**A₃\* (bcc).** The body-centred cubic lattice, the dual of fcc. [More](https://en.wikipedia.org/wiki/Cubic_crystal_system).

<!-- basis:A3* -->

??? info "Show a basis of A₃\* (bcc)"

    Gram matrix $G$: twice the Gram matrix of the reversed dual of the $A_3$ basis above, $2\,JG^{-1}J$ (so bcc scaled by $\sqrt2$).

    $$G = \begin{pmatrix}\tfrac{3}{2}&1&\tfrac{1}{2}\\1&2&1\\\tfrac{1}{2}&1&\tfrac{3}{2}\end{pmatrix}$$

    In triangular form, rows $b_1, \dots, b_3$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:

    $$B = \begin{pmatrix}\tfrac{\sqrt{6}}{2}&0&0\\\tfrac{\sqrt{6}}{3}&\tfrac{2\sqrt{3}}{3}&0\\\tfrac{\sqrt{6}}{6}&\tfrac{\sqrt{3}}{3}&1\end{pmatrix}$$

    Squared diagonal (the staircase): $\tfrac{3}{2}$, $\tfrac{4}{3}$, $1$. Volumes $G_k$: $\tfrac{3}{2}$, $2$, $2$. So $\Psi^2 = G_1\cdots G_3 = 6$, $\Delta = 2$, and $\eta = \Psi^2/\Delta^{2} = 6/2^{2} = \tfrac32$.

    In the paper: §2, Isoduality: the reversed dual of a Ψ-minimal basis is Ψ-minimal.
    { .paper-ref }

<!-- /basis:A3* -->

**D_n.** Integer points in $\mathbb Z^n$ with an even coordinate sum: the checkerboard. D₄ is the densest lattice in four dimensions ([more](https://en.wikipedia.org/wiki/D4_lattice)), and D₅ in five ([more](https://en.wikipedia.org/wiki/D5_lattice)).

<!-- basis:D_n -->

??? info "Show a basis of D₄"

    Gram matrix $G$: the Cartan matrix of $D_4$, simple roots $\alpha_1, \alpha_2, \alpha_3, \alpha_4$ (the centre second).

    $$G = \begin{pmatrix}2&-1&0&0\\-1&2&-1&-1\\0&-1&2&0\\0&-1&0&2\end{pmatrix}$$

    In triangular form, rows $b_1, \dots, b_4$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:

    $$B = \begin{pmatrix}\sqrt{2}&0&0&0\\-\tfrac{\sqrt{2}}{2}&\tfrac{\sqrt{6}}{2}&0&0\\0&-\tfrac{\sqrt{6}}{3}&\tfrac{2\sqrt{3}}{3}&0\\0&-\tfrac{\sqrt{6}}{3}&-\tfrac{\sqrt{3}}{3}&1\end{pmatrix}$$

    Squared diagonal (the staircase): $2$, $\tfrac{3}{2}$, $\tfrac{4}{3}$, $1$. Volumes $G_k$: $2$, $3$, $4$, $4$. So $\Psi^2 = G_1\cdots G_4 = 96$, $\Delta = 4$, and $\eta = \Psi^2/\Delta^{5/2} = 96/4^{5/2} = 3$.

    In the paper: Table 2 (Theorem 5).
    { .paper-ref }

??? info "Show a basis of D₅"

    Gram matrix $G$: the Cartan matrix of $D_5$, simple roots $\alpha_2, \alpha_3, \alpha_4, \alpha_5, \alpha_1$.

    $$G = \begin{pmatrix}2&-1&0&0&-1\\-1&2&-1&-1&0\\0&-1&2&0&0\\0&-1&0&2&0\\-1&0&0&0&2\end{pmatrix}$$

    In triangular form, rows $b_1, \dots, b_5$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:

    $$B = \begin{pmatrix}\sqrt{2}&0&0&0&0\\-\tfrac{\sqrt{2}}{2}&\tfrac{\sqrt{6}}{2}&0&0&0\\0&-\tfrac{\sqrt{6}}{3}&\tfrac{2\sqrt{3}}{3}&0&0\\0&-\tfrac{\sqrt{6}}{3}&-\tfrac{\sqrt{3}}{3}&1&0\\-\tfrac{\sqrt{2}}{2}&-\tfrac{\sqrt{6}}{6}&-\tfrac{\sqrt{3}}{6}&-\tfrac{1}{2}&1\end{pmatrix}$$

    Squared diagonal (the staircase): $2$, $\tfrac{3}{2}$, $\tfrac{4}{3}$, $1$, $1$. Volumes $G_k$: $2$, $3$, $4$, $4$, $4$. So $\Psi^2 = G_1\cdots G_5 = 384$, $\Delta = 4$, and $\eta = \Psi^2/\Delta^{3} = 384/4^{3} = 6$.

    In the paper: Table 2 (Theorem 5).
    { .paper-ref }

<!-- /basis:D_n -->

**D₅\*.** The dual of D₅: $\mathbb Z^5$ together with $\mathbb Z^5 + (\tfrac12,\dots,\tfrac12)$. With D₅, the only lattice with $\eta = 6$.

<!-- basis:D5* -->

??? info "Show a basis of D₅\*"

    Gram matrix $G$: twice the Gram matrix of the reversed dual of the D₅ basis above, $2\,JG^{-1}J$ (so D₅\* scaled by $\sqrt2$).

    $$G = \begin{pmatrix}2&1&1&2&2\\1&\tfrac{5}{2}&\tfrac{3}{2}&3&2\\1&\tfrac{3}{2}&\tfrac{5}{2}&3&2\\2&3&3&6&4\\2&2&2&4&4\end{pmatrix}$$

    In triangular form, rows $b_1, \dots, b_5$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:

    $$B = \begin{pmatrix}\sqrt{2}&0&0&0&0\\\tfrac{\sqrt{2}}{2}&\sqrt{2}&0&0&0\\\tfrac{\sqrt{2}}{2}&\tfrac{\sqrt{2}}{2}&\tfrac{\sqrt{6}}{2}&0&0\\\sqrt{2}&\sqrt{2}&\tfrac{\sqrt{6}}{3}&\tfrac{2\sqrt{3}}{3}&0\\\sqrt{2}&\tfrac{\sqrt{2}}{2}&\tfrac{\sqrt{6}}{6}&\tfrac{\sqrt{3}}{3}&1\end{pmatrix}$$

    Squared diagonal (the staircase): $2$, $2$, $\tfrac{3}{2}$, $\tfrac{4}{3}$, $1$. Volumes $G_k$: $2$, $4$, $6$, $8$, $8$. So $\Psi^2 = G_1\cdots G_5 = 3072$, $\Delta = 8$, and $\eta = \Psi^2/\Delta^{3} = 3072/8^{3} = 6$.

    In the paper: §2, Isoduality: the reversed dual of a Ψ-minimal basis is Ψ-minimal.
    { .paper-ref }

<!-- /basis:D5* -->

**E₆, E₇, E₈.** The exceptional root lattices, with 72, 126 and 240 roots, the densest lattices in dimensions 6, 7 and 8. E₈ is the densest sphere packing in eight dimensions. More: [E₆](https://en.wikipedia.org/wiki/E6_lattice), [E₇](https://en.wikipedia.org/wiki/E7_lattice), [E₈](https://en.wikipedia.org/wiki/E8_lattice).

<!-- basis:E_n -->

??? info "Show a basis of E₆"

    Gram matrix $G$: the Cartan matrix of $E_6$, simple roots $\alpha_2, \alpha_4, \alpha_3, \alpha_5, \alpha_1, \alpha_6$.

    $$G = \begin{pmatrix}2&-1&0&0&0&0\\-1&2&-1&-1&0&0\\0&-1&2&0&-1&0\\0&-1&0&2&0&-1\\0&0&-1&0&2&0\\0&0&0&-1&0&2\end{pmatrix}$$

    In triangular form, rows $b_1, \dots, b_6$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:

    $$B = \begin{pmatrix}\sqrt{2}&0&0&0&0&0\\-\tfrac{\sqrt{2}}{2}&\tfrac{\sqrt{6}}{2}&0&0&0&0\\0&-\tfrac{\sqrt{6}}{3}&\tfrac{2\sqrt{3}}{3}&0&0&0\\0&-\tfrac{\sqrt{6}}{3}&-\tfrac{\sqrt{3}}{3}&1&0&0\\0&0&-\tfrac{\sqrt{3}}{2}&-\tfrac{1}{2}&1&0\\0&0&0&-1&-\tfrac{1}{2}&\tfrac{\sqrt{3}}{2}\end{pmatrix}$$

    Squared diagonal (the staircase): $2$, $\tfrac{3}{2}$, $\tfrac{4}{3}$, $1$, $1$, $\tfrac{3}{4}$. Volumes $G_k$: $2$, $3$, $4$, $4$, $4$, $3$. So $\Psi^2 = G_1\cdots G_6 = 1152$, $\Delta = 3$, and $\eta = \Psi^2/\Delta^{7/2} = 1152/3^{7/2} = \tfrac{128\sqrt3}{9}$.

    In the paper: Table 2 (Theorem 5).
    { .paper-ref }

??? info "Show a basis of E₇"

    Gram matrix $G$: the Cartan matrix of $E_7$, simple roots $\alpha_2, \alpha_4, \alpha_3, \alpha_5, \alpha_1, \alpha_6, \alpha_7$.

    $$G = \begin{pmatrix}2&-1&0&0&0&0&0\\-1&2&-1&-1&0&0&0\\0&-1&2&0&-1&0&0\\0&-1&0&2&0&-1&0\\0&0&-1&0&2&0&0\\0&0&0&-1&0&2&-1\\0&0&0&0&0&-1&2\end{pmatrix}$$

    In triangular form, rows $b_1, \dots, b_7$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:

    $$B = \begin{pmatrix}\sqrt{2}&0&0&0&0&0&0\\-\tfrac{\sqrt{2}}{2}&\tfrac{\sqrt{6}}{2}&0&0&0&0&0\\0&-\tfrac{\sqrt{6}}{3}&\tfrac{2\sqrt{3}}{3}&0&0&0&0\\0&-\tfrac{\sqrt{6}}{3}&-\tfrac{\sqrt{3}}{3}&1&0&0&0\\0&0&-\tfrac{\sqrt{3}}{2}&-\tfrac{1}{2}&1&0&0\\0&0&0&-1&-\tfrac{1}{2}&\tfrac{\sqrt{3}}{2}&0\\0&0&0&0&0&-\tfrac{2\sqrt{3}}{3}&\tfrac{\sqrt{6}}{3}\end{pmatrix}$$

    Squared diagonal (the staircase): $2$, $\tfrac{3}{2}$, $\tfrac{4}{3}$, $1$, $1$, $\tfrac{3}{4}$, $\tfrac{2}{3}$. Volumes $G_k$: $2$, $3$, $4$, $4$, $4$, $3$, $2$. So $\Psi^2 = G_1\cdots G_7 = 2304$, $\Delta = 2$, and $\eta = \Psi^2/\Delta^{4} = 2304/2^{4} = 144$.

    In the paper: Table 2 (Theorem 5).
    { .paper-ref }

??? info "Show a basis of E₈"

    Gram matrix $G$: the Cartan matrix of $E_8$, simple roots $\alpha_2, \alpha_4, \alpha_3, \alpha_5, \alpha_1, \alpha_6, \alpha_7, \alpha_8$.

    $$G = \begin{pmatrix}2&-1&0&0&0&0&0&0\\-1&2&-1&-1&0&0&0&0\\0&-1&2&0&-1&0&0&0\\0&-1&0&2&0&-1&0&0\\0&0&-1&0&2&0&0&0\\0&0&0&-1&0&2&-1&0\\0&0&0&0&0&-1&2&-1\\0&0&0&0&0&0&-1&2\end{pmatrix}$$

    In triangular form, rows $b_1, \dots, b_8$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:

    $$B = \begin{pmatrix}\sqrt{2}&0&0&0&0&0&0&0\\-\tfrac{\sqrt{2}}{2}&\tfrac{\sqrt{6}}{2}&0&0&0&0&0&0\\0&-\tfrac{\sqrt{6}}{3}&\tfrac{2\sqrt{3}}{3}&0&0&0&0&0\\0&-\tfrac{\sqrt{6}}{3}&-\tfrac{\sqrt{3}}{3}&1&0&0&0&0\\0&0&-\tfrac{\sqrt{3}}{2}&-\tfrac{1}{2}&1&0&0&0\\0&0&0&-1&-\tfrac{1}{2}&\tfrac{\sqrt{3}}{2}&0&0\\0&0&0&0&0&-\tfrac{2\sqrt{3}}{3}&\tfrac{\sqrt{6}}{3}&0\\0&0&0&0&0&0&-\tfrac{\sqrt{6}}{2}&\tfrac{\sqrt{2}}{2}\end{pmatrix}$$

    Squared diagonal (the staircase): $2$, $\tfrac{3}{2}$, $\tfrac{4}{3}$, $1$, $1$, $\tfrac{3}{4}$, $\tfrac{2}{3}$, $\tfrac{1}{2}$. Volumes $G_k$: $2$, $3$, $4$, $4$, $4$, $3$, $2$, $1$. So $\Psi^2 = G_1\cdots G_8 = 2304$, $\Delta = 1$, and $\eta = \Psi^2/\Delta^{9/2} = 2304/1^{9/2} = 2304$.

    In the paper: Table 2 (Theorem 5).
    { .paper-ref }

<!-- /basis:E_n -->

**$A_2\otimes A_2$.** A four-dimensional lattice built from two copies of the hexagonal lattice. It is isodual, and the far end of the geodesic in chapter 7.

<!-- basis:A2xA2 -->

??? info "Show a basis of A₂⊗A₂"

    Gram matrix $G$: $H_A$ of the paper (determinant 81) in a Ψ-minimal basis, rows $-e_4$, $-e_2-e_3$, $-e_3$, $-e_1-e_2-e_4$ in its coordinates.

    $$G = \begin{pmatrix}4&-2&-1&1\\-2&4&-1&-2\\-1&-1&4&-1\\1&-2&-1&4\end{pmatrix}$$

    In triangular form, rows $b_1, \dots, b_4$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:

    $$B = \begin{pmatrix}2&0&0&0\\-1&\sqrt{3}&0&0\\-\tfrac{1}{2}&-\tfrac{\sqrt{3}}{2}&\sqrt{3}&0\\\tfrac{1}{2}&-\tfrac{\sqrt{3}}{2}&-\tfrac{\sqrt{3}}{2}&\tfrac{3}{2}\end{pmatrix}$$

    Squared diagonal (the staircase): $4$, $3$, $3$, $\tfrac{9}{4}$. Volumes $G_k$: $4$, $12$, $36$, $81$. So $\Psi^2 = G_1\cdots G_4 = 139968$, $\Delta = 81$, and $\eta = \Psi^2/\Delta^{5/2} = 139968/81^{5/2} = \tfrac{64}{27}$.

    (Size-reduced from the matrix described: the same flag, so the same staircase and Ψ.)

    In the paper: Remark 24.
    { .paper-ref }

<!-- /basis:A2xA2 -->

**M\*.** The four-dimensional lattice where $\Phi_5$ is largest, at $2^{16}/(3^4\cdot5^3)\approx6.4727$. It is even and 135-modular, the unique densest lattice in its genus, Hermitian over the Eisenstein integers, and symplectic.

<!-- basis:Mstar -->

??? info "Show a basis of M\*"

    Gram matrix $G$: $P_0$ in the basis of the paper's Ψ-minimal flag $(-1,-1,0,-1)$, $(-1,-1,1,-1)$, $(-1,0,-1,-1)$, completed by $-e_4$.

    $$G = \begin{pmatrix}16&-8&-8&7\\-8&16&7&1\\-8&7&16&-8\\7&1&-8&16\end{pmatrix}$$

    In triangular form, rows $b_1, \dots, b_4$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:

    $$B = \begin{pmatrix}4&0&0&0\\-2&2\sqrt{3}&0&0\\-2&\tfrac{\sqrt{3}}{2}&\tfrac{3\sqrt{5}}{2}&0\\\tfrac{7}{4}&\tfrac{3\sqrt{3}}{4}&-\tfrac{3\sqrt{5}}{4}&\tfrac{3\sqrt{15}}{4}\end{pmatrix}$$

    Squared diagonal (the staircase): $16$, $12$, $\tfrac{45}{4}$, $\tfrac{135}{16}$. Volumes $G_k$: $16$, $192$, $2160$, $18225$. So $\Psi^2 = G_1\cdots G_4 = 120932352000$, $\Delta = 18225$, and $\eta = \Psi^2/\Delta^{5/2} = 120932352000/18225^{5/2} = \tfrac{2^{14}}{3^5\cdot5^2}$.

    (Size-reduced from the matrix described: the same flag, so the same staircase and Ψ.)

    In the paper: Definition 16, Proposition 17 (2).
    { .paper-ref }

<!-- /basis:Mstar -->

**π_vD₅.** The shadow of D₅: D₅ projected along one of its roots. It is D₄ with one coordinate axis scaled by $1/\sqrt2$, and the third peak of $\Phi_5$, at exactly 6.

<!-- basis:pivd5 -->

??? info "Show a basis of π_vD₅"

    Gram matrix $G$: the paper's Gram matrix of $\pi_vD_5$ (determinant 2) in a Ψ-minimal basis, rows $-e_2$, $-e_2-e_3$, $-e_1-e_2$, $-e_2-e_3-e_4$ in its coordinates.

    $$G = \begin{pmatrix}\tfrac{3}{2}&\tfrac{1}{2}&\tfrac{1}{2}&\tfrac{1}{2}\\\tfrac{1}{2}&\tfrac{3}{2}&-\tfrac{1}{2}&\tfrac{1}{2}\\\tfrac{1}{2}&-\tfrac{1}{2}&\tfrac{3}{2}&-\tfrac{1}{2}\\\tfrac{1}{2}&\tfrac{1}{2}&-\tfrac{1}{2}&\tfrac{3}{2}\end{pmatrix}$$

    In triangular form, rows $b_1, \dots, b_4$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:

    $$B = \begin{pmatrix}\tfrac{\sqrt{6}}{2}&0&0&0\\\tfrac{\sqrt{6}}{6}&\tfrac{2\sqrt{3}}{3}&0&0\\\tfrac{\sqrt{6}}{6}&-\tfrac{\sqrt{3}}{3}&1&0\\\tfrac{\sqrt{6}}{6}&\tfrac{\sqrt{3}}{6}&-\tfrac{1}{2}&1\end{pmatrix}$$

    Squared diagonal (the staircase): $\tfrac{3}{2}$, $\tfrac{4}{3}$, $1$, $1$. Volumes $G_k$: $\tfrac{3}{2}$, $2$, $2$, $2$. So $\Psi^2 = G_1\cdots G_4 = 12$, $\Delta = 2$, and $\eta = \Psi^2/\Delta^{5/2} = 12/2^{5/2} = \tfrac{3}{\sqrt2}$.

    In the paper: Proposition 21 and the text before it; $\eta = 3/\sqrt2$ is $\Phi_5(\pi_vD_5) = 6$ divided by $\kappa^2 = 2\sqrt2$.
    { .paper-ref }

<!-- /basis:pivd5 -->

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
