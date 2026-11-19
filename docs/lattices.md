# Lattices, bases and duals

Look at a honeycomb, or at oranges laid out on a tray so that each touches six others. The centres form a pattern that repeats in two directions. Stand on any centre and the view is the same as from any other. That pattern is a lattice.

More precisely, a [lattice](https://en.wikipedia.org/wiki/Lattice_(group)) in $n$ dimensions is the set of all integer combinations of $n$ independent vectors:

$$
L = \{\, x_1 b_1 + x_2 b_2 + \dots + x_n b_n \;:\; x_i \in \mathbb Z \,\}.
$$

The vectors $b_1, \dots, b_n$ are a *basis*. The honeycomb is the hexagonal lattice, called A₂, its name in the theory of root systems. One basis for it is two vectors of the same length at 120° to each other.

## A basis is a choice

The same lattice has infinitely many bases. In the honeycomb you could take $b_1$ and $b_1 + b_2$ instead of $b_1$ and $b_2$. Those two vectors still generate every point. Or you could take two long, nearly parallel vectors, as long as the parallelogram they span contains no other lattice point.

That last condition is the test. Two vectors in a 2D lattice form a basis exactly when the parallelogram they span has the smallest possible area. Any other pair spans a sublattice, with an area that is a whole multiple of the smallest one. Algebraically, if the rows of $B$ are a basis, the other bases are the rows of $UB$ with $U$ an integer matrix of determinant $\pm1$.

All of lattice reduction is about this freedom. LLL, BKZ and the rest take a bad basis, long and skewed, and turn it into a good one, short and nearly orthogonal. *Good* has to be made precise, and the potential of the next chapter is one way of doing that.

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

## The dual lattice

Every lattice has a partner. The *dual lattice* $L^*$ is the set of vectors whose inner product with every vector of $L$ is an integer. If $B$ is a basis of $L$, the rows of $(B^{-1})^{\mathsf T}$ are a basis of $L^*$, the *dual basis* $d_1, \dots, d_n$, with $d_i \cdot b_j = 1$ if $i = j$ and $0$ otherwise. The Gram matrix of the dual basis is $G^{-1}$.

Dense lattices have sparse duals, and vice versa: $\det G^{-1} = 1/\det G$.

Tick *show the dual lattice* in the widget above. The hexagonal lattice is scaled there to area 1, and its dual, drawn in orange, also has area 1. Its dual is another hexagonal lattice, turned through 30°. In numbers:

$$
G(A_2)^{-1} = \frac13\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix},
$$

which is $\tfrac13$ times a Gram matrix of $A_2$ again (flip the sign of the second basis vector). So $A_2^*$ is a scaled, rotated copy of $A_2$.

## Isoduality

A lattice that is similar to its own dual is called *isodual*. The hexagonal lattice is one, and so is the square lattice $\mathbb Z^2$. So are D₄ and E₈, which we will meet later, and so is the lattice M\* that is the surprise of chapter 7.

Most lattices are not isodual. In three dimensions the face-centred cubic lattice (fcc, how greengrocers stack oranges, also called A₃) has as its dual the body-centred cubic lattice (bcc, A₃\*). These are genuinely different shapes. In fcc each point has twelve nearest neighbours. In bcc it has eight.

Here is the fact that gives the paper its title. Take a basis $b_1, \dots, b_n$ of $L$ and its dual basis, and read the dual basis *backwards*: $d_n, d_{n-1}, \dots, d_1$. Then the volumes of the initial segments are tied together:

$$
G^*_k = \frac{G_{n-k}}{\Delta}.
$$

The first $k$ vectors of the reversed dual basis span the part of the dual that is perpendicular to the first $n-k$ vectors of the original basis, and their volumes are reciprocal. Multiply over $k$, and the potential of the reversed dual basis is the potential of the original divided by a power of $\Delta$. After normalising, $\eta(L) = \eta(L^*)$.

In the paper: §2, "Isoduality".
{ .paper-ref }

So whatever we learn about the potential of a lattice, we learn about its dual too. A best basis of $L$, read dually and backwards, is a best basis of $L^*$. If one lattice is extremal, its dual is as well. When a lattice isn't isodual, the extremal problem has two answers, mirror images under duality. That is the story of dimension five.
