# E₆, E₇, E₈

Above dimension five the pattern from chapter 4 predicts the answer. The densest lattices in dimensions 6, 7 and 8 are [E₆](https://en.wikipedia.org/wiki/E6_lattice), [E₇](https://en.wikipedia.org/wiki/E7_lattice) and [E₈](https://en.wikipedia.org/wiki/E8_lattice), and their root flags meet Hermite's bound at every step. So the natural guess is

$$
\eta_6 = \frac{128\sqrt3}{9} \approx 24.63, \qquad \eta_7 = 144, \qquad \eta_8 = 2304.
$$

The last is proved (chapter 4). The first two are a conjecture, attained, if true, only by E₆ and E₆\*, and by E₇ and E₇\*.

In the paper: Conjecture 25, Theorem 8.
{ .paper-ref }

A quick introduction, since these lattices may be less familiar. E₈ is the exceptional eight-dimensional lattice from chapter 4, with 240 roots ([more](https://en.wikipedia.org/wiki/E8_lattice)). E₇ and E₆ are sections of it, sublattices cut out by linear conditions. E₇ is seven-dimensional with 126 roots, and E₆ is six-dimensional with 72 roots. Like [D₅](https://en.wikipedia.org/wiki/D5_lattice), they are not isodual, so each comes with a distinct dual partner.

## What is proved: local maxima

The paper proves that E₆, E₇ and E₈, and their duals, are *strict local maxima* of $\eta$, with an explicit radius. Every lattice close enough to one of them has smaller $\eta$.

- E₆ and E₆\*: within distance $1/10$, $\eta \le 128\sqrt3/9$.
- E₇ and E₇\*: within distance $3/50$, $\eta \le 144$.
- E₈: within distance $1/20$, $\eta \le 2304$.

In each case equality holds only at the lattice itself. Distance is measured in the same metric on Gram matrices as before, after scaling to equal determinant.

In the paper: Proposition 26.
{ .paper-ref }

This rules out competitors near these lattices, and nothing more. It is not evidence that nothing far away does better. For E₈ it does give local uniqueness, that no lattice near E₈ other than E₈ attains $\eta_8$.

## The averaging argument

The proof is short and uses symmetry. It is worth understanding, because it shows why dimension five needed a computer and these dimensions don't.

Perturb the lattice a little, in some direction $\Lambda$. Each Ψ-minimal flag $f$ of the lattice changes its log-potential, to first order, by a linear amount $\langle C_f, \Lambda\rangle$, where $C_f$ is a matrix attached to the flag. Since $\eta$ is the *minimum* over flags, it goes down as soon as *one* of the minimal flags goes down. The question is whether, in every direction, some flag goes down by a definite amount.

Now use the symmetry group. E₆, E₇ and E₈ have large groups of symmetries, the Weyl groups, and they move the root flag around to a whole orbit of minimal flags. Two facts about that orbit hold.

1. The $C_f$ average to zero. The average is fixed by all the symmetries, and for these lattices the only matrix fixed by all of them in the relevant space is zero.
2. They spread equally in every direction. The sum $\sum_f \langle C_f, \Lambda\rangle^2$ is the same for every unit direction $\Lambda$. This is [Schur's lemma](https://en.wikipedia.org/wiki/Schur%27s_lemma): the Weyl group acts *irreducibly* on the space of directions (traceless symmetric matrices, of dimension 20, 27 and 35), so any symmetric quantity built from it is a multiple of the identity.

Together these say the first-order changes have mean zero and a fixed, positive spread in every direction. Numbers with mean zero and positive spread can't all be positive, so some flag must go *down*, by at least a fixed fraction of the distance moved. Making that precise gives an explicit rate, $r = \sqrt{70}/40$, $2\sqrt7/27$ and $\sqrt{42}/35$ for E₆, E₇ and E₈. Combined with a bound on the second-order terms, it gives the radii above. For E₆ an exact linear-programming certificate improves the rate to $3/10$ and the radius to $1/10$.

In the paper: proof of Proposition 26.
{ .paper-ref }

As an independent check, the paper enumerates all the Ψ-minimal flags of E₆ ($19{,}440$ of them) and of E₇ ($544{,}320$), and verifies both identities in exact arithmetic.

## Why D₅ was different

The same argument fails at D₅. Its symmetry group is too small: on the 14-dimensional space of directions it doesn't act irreducibly, but splits it into pieces of dimension 4 and 10. Averaging over symmetries then says nothing about how the flags spread *between* those pieces.

So for D₅ the paper does the work by hand, or rather by machine. It enumerates all 720 Ψ-minimal flags of D₅ and shows, by exact rational linear programming, that their first-order changes surround the origin with room to spare: a ball of radius at least $0.2392$ fits inside their convex hull. That is Theorem 13, the ball that the (B) leaves of chapter 9 rely on.

In the paper: Theorem 13, Appendix A.
{ .paper-ref }

The exact first-order rates are now known at [D₄](https://en.wikipedia.org/wiki/D4_lattice), where $r = 2/3$, and at D₅, where $r = 4/(3\sqrt5)$. With the exact rate, the radius around D₅ grows from $1/10$ to $6/25$. For E₆ and E₇ only bounds are known, and pinning them down is one of the open problems.

## What remains open

For dimensions 6 and 7, the proved bounds are these.

| $n$ | lower bound | upper bound |
|---|---|---|
| 6 | $128\sqrt3/9 \approx 24.63$ (E₆) | $16\sqrt3 \approx 27.71$ |
| 7 | $144$ (E₇) | $16\sqrt3 \cdot 3^{7/4} \approx 189.5$ |

In the paper: Table 3.
{ .paper-ref }

The upper bounds come from the splitting inequality. Closing the gap would need a search like the one for dimension five, one dimension up. There is a reason for optimism about dimension 6. The project-and-lift route of chapter 6 is conjectured to work there with no second stage, because the analogue of $M_*$ seems not to exist. In 464 numerical ascents of $\Phi_6$, nothing went above the conjectured value, and every high point climbed back to a shadow of E₆ or of E₆\*. That is numerical evidence only, and a narrow region could have been missed.

In the paper: Conjecture 30, §7.1.
{ .paper-ref }

The other open question here is the uniqueness of E₈. It attains $\eta_8 = 2304$, and nothing near it does. Whether anything far away also does is open. One route would go through $\eta_7$: if $\eta_7 = 144$, then any lattice attaining 2304 must be critical, and so must be E₈.
