# Lattices, bases and duals

Look at a honeycomb, or at oranges laid out on a tray so that each touches six others. The centres form a pattern that repeats in two directions. Stand on any centre and the view is the same as from any other. That pattern is a lattice.

More precisely, a [lattice](https://en.wikipedia.org/wiki/Lattice_(group)) in $n$ dimensions is the set of all integer combinations of $n$ independent vectors:

$$
L = \{\, x_1 b_1 + x_2 b_2 + \dots + x_n b_n \;:\; x_i \in \mathbb Z \,\}.
$$

The vectors $b_1, \dots, b_n$ are a *basis*. The honeycomb is the hexagonal lattice, called [A₂](https://en.wikipedia.org/wiki/Hexagonal_lattice), its name in the theory of root systems. One basis for it is two vectors of the same length at 120° to each other.

## A basis is a choice

The same lattice has infinitely many bases. In the honeycomb you could take $b_1$ and $b_1 + b_2$ instead of $b_1$ and $b_2$. Those two vectors still generate every point. Or you could take two long, nearly parallel vectors, as long as the parallelogram they span contains no other lattice point.

That last condition is the test. Two vectors in a 2D lattice form a basis exactly when the parallelogram they span has the smallest possible area. Any other pair spans a sublattice, with an area that is a whole multiple of the smallest one. Algebraically, if the rows of $B$ are a basis, the other bases are the rows of $UB$ with $U$ an integer matrix of determinant $\pm1$.

All of lattice reduction is about this freedom. [LLL](https://en.wikipedia.org/wiki/Lenstra%E2%80%93Lenstra%E2%80%93Lov%C3%A1sz_lattice_basis_reduction_algorithm), [BKZ](https://en.wikipedia.org/wiki/Korkine%E2%80%93Zolotarev_lattice_basis_reduction_algorithm) and the rest take a bad basis, long and skewed, and turn it into a good one, short and nearly orthogonal. *Good* has to be made precise, and the potential of the next chapter is one way of doing that.

Try it. The widget starts with a poor basis of the hexagonal lattice. Drag the arrowheads. The shaded cell is the parallelogram on $b_1, b_2$. If it ever contains another lattice point, the readout tells you that you've dropped to a sublattice.

<div class="widget" data-widget="lattice2d" data-config='{"lattice": "hex", "dual": true}'></div>

## Gram matrices

The lattice doesn't care where it sits in space. Rotate it and nothing changes. What matters is the lengths and angles of the basis vectors, and those are collected in the [Gram matrix](https://en.wikipedia.org/wiki/Gram_matrix), the table of inner products:

$$
G = \begin{pmatrix} b_1\cdot b_1 & b_1\cdot b_2 \\ b_2\cdot b_1 & b_2 \cdot b_2 \end{pmatrix}.
$$

For the honeycomb, scaled so that the shortest vectors have squared length 2,

$$
G(A_2) = \begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix}.
$$

The paper works with Gram matrices throughout, and always with squared lengths. That keeps everything rational: the honeycomb's basis vectors involve $\sqrt3$, but its Gram matrix doesn't.

Changing the basis by $U$ changes the Gram matrix to $UGU^{\mathsf T}$. Two Gram matrices describe the same lattice, up to rotation, exactly when they are related this way. Two lattices are *similar* if one is a rotated and rescaled copy of the other.

## Determinant as volume

The determinant of the Gram matrix is the squared volume of the basis cell. For $A_2$ it is $2\cdot2 - (-1)^2 = 3$, so the cell has area $\sqrt3$. A change of basis multiplies $G$ by $U$ on both sides, and $\det U = \pm1$, so the determinant doesn't change. It belongs to the lattice, not to the basis. The paper calls it $\Delta$.

The same is true of any initial segment of a basis. The Gram matrix of $b_1, \dots, b_k$ has a determinant $G_k$, the squared $k$-dimensional volume of the cell they span. Unlike $\Delta$, the $G_k$ *do* depend on the basis. They are the ingredients of the potential.

## The triangular form

Since rotating the lattice changes nothing, we may as well turn it so that $b_1$ points along the first axis, $b_2$ lies in the plane of the first two axes, $b_3$ in the space of the first three, and so on. The basis matrix is then lower triangular. In matrix terms, every basis matrix $B$ (rows $b_1, \dots, b_n$) factors as

$$
B = M H,
$$

with $H$ orthogonal, a rotation (possibly with a reflection), and $M$ lower triangular. This is the [Gram–Schmidt process](https://en.wikipedia.org/wiki/Gram%E2%80%93Schmidt_process) written as a matrix factorisation, an LQ form of the [QR decomposition](https://en.wikipedia.org/wiki/QR_decomposition). Since $G = BB^{\mathsf T} = MM^{\mathsf T}$, the triangle $M$ is also the Cholesky factor of the Gram matrix. The rotation $H$ only says where the lattice sits in space. Everything about its shape is in $M$.

The entries of $M$ have names. Gram–Schmidt splits each $b_i$ into a part along the earlier vectors and a part $b_i^*$ perpendicular to all of them, its *height*. The coefficient $\mu_{ij}$ says how far $b_i$ leans along $b_j^*$:

$$
b_i = b_i^* + \sum_{j<i} \mu_{ij}\, b_j^*, \qquad \mu_{ij} = \frac{b_i \cdot b_j^*}{|b_j^*|^2}.
$$

In three dimensions, and in the same way in any dimension,

$$
M = \begin{pmatrix}
|b_1| & 0 & 0 \\
\mu_{21}|b_1| & |b_2^*| & 0 \\
\mu_{31}|b_1| & \mu_{32}|b_2^*| & |b_3^*|
\end{pmatrix}.
$$

The diagonal holds the heights, and the volumes are read straight off it: $G_k = (M_{11} M_{22} \cdots M_{kk})^2$ and $\Delta = (M_{11}\cdots M_{nn})^2$. The squared heights $r_k = |b_k^*|^2$ are the *staircase* of the next chapter.

The widget above shows $M$ for the current basis, below its other readouts. Drag $b_2$ around and watch $\mu_{21}$ change while $|b_2^*|$ stays put whenever $b_2$ moves parallel to $b_1$.

### The problem, in this language

A change of basis multiplies $B$ on the left by a unimodular $U$, an integer matrix of determinant $\pm1$:

$$
UB = (UM)H.
$$

$UM$ is usually no longer triangular, but it can be made triangular again, $UM = M'H'$, so the new basis is $M'(H'H)$. The search for a best basis is therefore a search over $U$ for the triangle $M'$ whose diagonal makes the potential

$$
\Psi^2 = G_1 G_2 \cdots G_n = M_{11}^{2n}\, M_{22}^{2(n-1)} \cdots M_{nn}^{2}
$$

as small as possible. The rotations play no part.

Some changes of basis are free. If $U$ is itself lower triangular, it only adds integer multiples of earlier vectors to later ones. Then $UM$ is still triangular with the same diagonal, so the heights and $\Psi^2$ don't change and only the $\mu_{ij}$ move. This is Lemma 2 of the 2007 paper. It means we can always assume $|\mu_{ij}| \le \tfrac12$ (*size reduction*). Flipping the signs of basis vectors is free too. Only changes that alter the order of the flag, such as the swaps of [LLL](https://en.wikipedia.org/wiki/Lenstra%E2%80%93Lenstra%E2%80%93Lov%C3%A1sz_lattice_basis_reduction_algorithm), can change the diagonal.

### Counting coordinates

This is where the coordinates of the later chapters come from. A lower-triangular $n\times n$ matrix has $n(n+1)/2$ entries. Fixing the scale, $\Delta = 1$, removes one of them, which leaves

| $n$ | heights (as $G_1, \dots, G_{n-1}$) | coefficients $\mu_{ij}$ | total |
|---|---|---|---|
| 2 | 1 | 1 | 2 |
| 3 | 2 | 3 | 5 |
| 4 | 3 | 6 | **9** |
| 5 | 4 | 10 | **14** |

The two-dimensional search of [chapter 8](bnb.md) runs over exactly these two numbers, a log-volume $y$ and $\mu$. Stage 1 of the real proof runs over the nine coordinates of a four-dimensional lattice, $y_k = \log G_k$ for $k = 1, 2, 3$ and the six $\mu_{ij}$, all size-reduced. The paper numbers the basis vectors from 0, so its $\mu_{10}$ is $\mu_{21}$ here. Stage 2 runs over fourteen numbers, the size of a five-dimensional triangle, although it splits them differently, as the nine of a four-dimensional lattice plus five that describe how it is lifted (see [chapter 9](two-stages.md)).

## Two ways to say *best*

[Hermite's constant](https://en.wikipedia.org/wiki/Hermite_constant) suggests an obvious notion of a best basis. Take $b_1$ a shortest vector of the lattice, then $b_2$ so that its height $|b_2^*|$ is as small as possible, and so on, each vector shortest in what is left. That is [Korkine–Zolotarev reduction](https://en.wikipedia.org/wiki/Korkine%E2%80%93Zolotarev_lattice_basis_reduction_algorithm) (KZ, or HKZ with Hermite's name added). It compares bases lexicographically: first by $|b_1|$, then by $|b_2^*|$, and so on.

The potential compares them by the product $\Psi^2 = G_1 \cdots G_n$ instead. In two dimensions the two agree, because $\Psi^2 = |b_1|^2\Delta$ and the best choice is a shortest $b_1$. In three dimensions they already disagree. Here is the example from §1 of the 2007 paper. Take the basis rows

$$
B = \begin{pmatrix} X & 0 & 0 \\ \tfrac{X}{2} & \tfrac{\sqrt3\,Y}{2} & 0 \\ 0 & 0 & 1 \end{pmatrix},
\qquad Y > X > 1,\quad XY < \frac{2}{\sqrt3}.
$$

It is already triangular. The first two rows span a hexagonal lattice stretched upwards (by $Y/X$), and the third is a unit vector $e$ at right angles to that plane. Because $X > 1$, the shortest vector of the whole lattice is $e$, and KZ puts it first. Because $Y > X$, the shortest vector of the plane is $b_1$. The volume is $\Delta = \tfrac34 X^2Y^2$.

- KZ order $(e, b_1, b_2)$: $G = (1,\ X^2,\ \Delta)$, so $\Psi^2 = X^2\,\Delta$.
- The 2007 order $(b_1, b_2, e)$: $G = (X^2,\ \Delta,\ \Delta)$, so $\Psi^2 = X^2\,\Delta^2$.

The second is smaller exactly when $\Delta < 1$, that is, when $XY < 2/\sqrt3$. The 2007 paper shows that it is then the best basis of all. So a Ψ-minimal basis need not start with a shortest vector. It prefers to put the short orthogonal vector $e$ last, where it lowers the last step of the flag, rather than first.

Drag the point in the plane of $(X, Y)$. The table compares the three places $e$ can go, and an exact search over all bases confirms which one wins. In the green region the winner starts with a vector of squared length $X^2 > 1$.

<div class="widget" data-widget="psikz"></div>

The 2007 paper's reason for preferring the potential is duality. With the shortest vector first, the basis would be better reduced than its reversed dual basis in KZ's sense, so the primal and the dual would be treated differently. The potential treats a lattice and its dual exactly alike, as the end of this chapter shows. [Chapter 3](flags.md#the-two-ends-of-a-flag) comes back to this in the language of the two ends of a flag.

## The dual lattice

Every lattice has a partner. The *dual lattice* $L^*$ is the set of vectors whose inner product with every vector of $L$ is an integer. If $B$ is a basis of $L$, the rows of $(B^{-1})^{\mathsf T}$ are a basis of $L^*$, the *dual basis* $d_1, \dots, d_n$, with $d_i \cdot b_j = 1$ if $i = j$ and $0$ otherwise. The Gram matrix of the dual basis is $G^{-1}$.

Dense lattices have sparse duals, and vice versa: $\det G^{-1} = 1/\det G$.

Tick *show the dual lattice* in the widget above. The hexagonal lattice is scaled there to area 1, and its dual, drawn in orange, also has area 1. Its dual is another hexagonal lattice, turned through 30°. In numbers:

$$
G(A_2)^{-1} = \frac13\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix},
$$

which is $\tfrac13$ times a Gram matrix of $A_2$ again (flip the sign of the second basis vector). So $A_2^*$ is a scaled, rotated copy of $A_2$.

## Isoduality

A lattice that is similar to its own dual is called *isodual*. The hexagonal lattice is one, and so is the square lattice $\mathbb Z^2$. So are [D₄](https://en.wikipedia.org/wiki/D4_lattice) and [E₈](https://en.wikipedia.org/wiki/E8_lattice), which we will meet later, and so is the lattice M\* that is the surprise of chapter 7.

Most lattices are not isodual. In three dimensions the face-centred cubic lattice (fcc, how greengrocers stack oranges, also called [A₃](https://en.wikipedia.org/wiki/Close-packing_of_equal_spheres)) has as its dual the body-centred cubic lattice (bcc, [A₃\*](https://en.wikipedia.org/wiki/Cubic_crystal_system)). These are genuinely different shapes. In fcc each point has twelve nearest neighbours. In bcc it has eight.

Here is the fact that gives the paper its title. Take a basis $b_1, \dots, b_n$ of $L$ and its dual basis, and read the dual basis *backwards*: $d_n, d_{n-1}, \dots, d_1$. Then the volumes of the initial segments are tied together:

$$
G^*_k = \frac{G_{n-k}}{\Delta}.
$$

The first $k$ vectors of the reversed dual basis span the part of the dual that is perpendicular to the first $n-k$ vectors of the original basis, and their volumes are reciprocal. Multiply over $k$, and the potential of the reversed dual basis is the potential of the original divided by a power of $\Delta$. After normalising, $\eta(L) = \eta(L^*)$.

In the paper: §2, "Isoduality".
{ .paper-ref }

The triangular form makes the reversal visible. Write $J$ for the identity matrix with its rows in reverse order. For a triangular basis in two dimensions,

$$
B = \begin{pmatrix} a & 0 \\ \mu a & c \end{pmatrix}, \qquad
J (B^{-1})^{\mathsf T} J = \begin{pmatrix} 1/c & 0 \\ -\mu/c & 1/a \end{pmatrix}.
$$

The reversed dual basis is again lower triangular, with the heights inverted and in reverse order. The same holds in every dimension, $|d_i^*| = 1/|b_{n+1-i}^*|$, and that is the identity $G^*_k = G_{n-k}/\Delta$ above (the 2007 paper writes out the four-dimensional case as its Example 1).

So whatever we learn about the potential of a lattice, we learn about its dual too. A best basis of $L$, read dually and backwards, is a best basis of $L^*$. If one lattice is extremal, its dual is as well. When a lattice isn't isodual, the extremal problem has two answers, mirror images under duality. That is the story of dimension five.
