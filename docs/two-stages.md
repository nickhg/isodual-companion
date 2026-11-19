# Two stages

The natural proof reduces five dimensions to four, through $\Phi_5$, and stops at 6.4727 because of $M_*$. The actual proof keeps the reduction wherever it works, and goes back up to five dimensions only where it doesn't. This chapter is about the two stages and the hand-off between them.

## Stage 1: four-dimensional shadows

Stage 1 is the search of the last chapter, with $n = 4$. It runs over Ψ-minimal bases of four-dimensional lattices $M$, in the nine coordinates $(y_1, y_2, y_3, \mu_{10}, \dots, \mu_{32})$, with threshold 6. A box closes if it contains no Ψ-minimal basis (D), or if $\Phi_5 < 6$ on all of it (A).

Near [D₄](https://en.wikipedia.org/wiki/D4_lattice) and $M_*$, where $\Phi_5 > 6$, boxes can't close. When a box is still open after its width has dropped below $0.12$, it is *collected*: written out exactly, in hexadecimal, and passed on.

In the paper: Theorem 14, Appendix E, "Stage 1".
{ .paper-ref }

Stage 1 alone proves this much. If $L$ has a shortest vector $v$ whose shadow $\pi_vL$ has a Ψ-minimal basis outside every collected box, then $\eta(L) \le \Phi_5(\pi_vL) < 6$.

The numbers:

- $24{,}133$ logs, with $3.25\times10^8$ leaves in all;
- $15{,}419{,}650$ of them collected;
- after gluing neighbouring collected boxes back together (two boxes that agree in eight coordinates and touch in the ninth become one), $3{,}605{,}989$ boxes. These are the roots of stage 2.

Stage 1 also had balls around $\pi_vD_5$, the shadow of [D₅](https://en.wikipedia.org/wiki/D5_lattice), available as leaves. None was used. Every box near $\pi_vD_5$ was collected first, so the equality case is decided entirely in stage 2.

Before this, the same machinery was run twice as warm-ups, which are now theorems of their own. The first, with threshold 7, proved $\eta_5 < 7$ ($2.39\times10^7$ leaves). The second, with threshold $2^{16}/(3^4\cdot5^3)$ and balls around the ten copies of $M_*$ in the search box, proved that $M_*$ is the global maximum of $\Phi_5$ ($3.65\times10^8$ leaves).

In the paper: Theorems 19 and 20, Appendices C and D.
{ .paper-ref }

## Stage 2: the lifts themselves

For each collected box $X$, stage 2 stops bounding the shadow and bounds the lattice above it. Recall from chapter 6 that a five-dimensional lattice is its shadow $M$ (with Gram matrix $S$), a height $r = |v|^2$ and a lifting form $\varphi$. Its Gram matrix, in the basis $v, b_1', \dots, b_4'$, is

$$
G = \begin{pmatrix} r & r\varphi^{\mathsf T} \\ r\varphi & r^{-1/4}S + r\varphi\varphi^{\mathsf T} \end{pmatrix}, \qquad \det G = 1.
$$

Stage 2 searches over all of $(S, \varphi, r)$ with $S$ in the box: 9 coordinates for $S$, 4 for $\varphi$ and 1 for $r$, fourteen in all. The ranges are small.

Adding multiples of $v$ to the $b_i'$, and flipping the sign of $v$, bring $\varphi$ into $[0, \tfrac12] \times [-\tfrac12, \tfrac12]^3$. From above, $r \le \gamma_5 = 8^{1/5}$, by [Korkine](https://en.wikipedia.org/wiki/Aleksandr_Korkin) and [Zolotarev](https://en.wikipedia.org/wiki/Yegor_Ivanovich_Zolotaryov). From below, $r \ge 2^{2/5}$: for smaller $r$, the split along $v$ gives $\eta(L) \le r^{5/2}\eta(M) \le 3r^{5/2} < 6$.

In the paper: proof of Theorem 14.
{ .paper-ref }

So $r$ lives in the narrow interval $[2^{2/5}, 8^{1/5}] \approx [1.320, 1.516]$, between the shortest-vector lengths of [D₅\*](https://en.wikipedia.org/wiki/D5_lattice) and D₅.

## The four leaf types

A stage-2 cell closes when one of four things holds on all of it.

- (N) Not shortest. There is an explicit lattice vector strictly shorter than $v$. Then this description of $L$, with $v$ as a shortest vector, doesn't arise.
- (F) One flag. A single integer flag of $L$ has potential below 6 everywhere on the cell. Or the splitting inequality along one of its sublattices does, using the known values of $\eta_1, \dots, \eta_4$.
- (P) A mixture. No single flag bound works on the whole cell, but a weighted average of several does. Since $\log\eta(L)$ is at most each of them, it is at most their average.
- (B) The ball. The cell lies within distance $1/10$ of a Gram matrix of D₅ or D₅\*, so Theorem 13 gives $\eta \le 6$ with equality only at the centre.

Here is how many of each the final certificate has:

<div class="widget" data-widget="leafbars"></div>

In the paper: Appendix E, "The run".
{ .paper-ref }

The (P) leaves do most of the work. They are needed where two or more flags tie: each flag is best on part of the cell, and no single one is below 6 everywhere, but a fixed mixture of them is. Finding the weights is a small linear program, solved by the untrusted producer. The checker only verifies that the weighted bound is below 6.

The (B) leaves are a tiny fraction, $47{,}437$ of $8.7\times10^9$, but without them the proof couldn't finish. They are the cells around the two lattices that actually reach 6.

## Putting it together

Let $L$ be any five-dimensional lattice with $\eta(L) \ge 6$. Take a shortest vector $v$ and a Ψ-minimal basis of its shadow.

1. By stage 1, that basis lies in a collected box.
2. By stage 2, the point $(S, \varphi, r)$ describing $L$ lies in some leaf.
3. It isn't an (N) leaf, because $v$ is shortest.
4. It isn't an (F) or (P) leaf, because those prove $\eta < 6$ strictly.
5. So it is a (B) leaf, and by Theorem 13, $\eta(L) = 6$ only at the centre, which is D₅ or D₅\*.

So $\eta_5 = 6$, attained only by D₅ and D₅\*.

## Cost

Stage 1 took about $1{,}400$ vCPU-hours on cloud machines and stage 2 about $5{,}540$, including checking on the machines that produced the logs and work lost to pre-empted instances. The final re-check of every log, described in the next chapter, took about 620 more. The logs fill 263 GB.

In the paper: Appendix E, "The run".
{ .paper-ref }

The open problems in chapter 12 include finding a shorter proof. Almost all of this computation is spent on lifts over a region where, numerically, $\eta$ stays far from 6, except right at D₅\*. A sharper version of the reduction that "sees" how loose the bound is over $M_*$ would replace most of it.
