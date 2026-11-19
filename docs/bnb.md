# Branch and bound you can watch

The proof of $\eta_5 = 6$ checks about nine billion small cases. That sounds like brute force, but the method behind it is simple, and in two dimensions you can watch it run from start to finish. This chapter does exactly that, with the paper's own coordinates and leaf types cut down to $n = 2$.

It is a faithful miniature of the method, not the real certificate. The real one lives in nine and fourteen dimensions and uses rigorous interval arithmetic. This one uses ordinary floating point with a safety margin, and it proves something that was already known, $\eta_2 = 2/\sqrt3$.

## The idea

You want to show that a function stays below a threshold everywhere on some region. You can't check infinitely many points. But you can often check a whole *box* at once: if some inequality holds at every point of the box, the box is done. If no such inequality is in reach, cut the box in half and try again on each half.

That is [branch and bound](https://en.wikipedia.org/wiki/Branch_and_bound). The search builds a tree of boxes. Every leaf of the tree carries a reason why it is closed. If the leaves cover the starting region, the claim is proved everywhere.

## The coordinates

In two dimensions, scaled to determinant 1, a basis is described by two numbers:

- $y = \log |b_1|^2$, the log of the first step of the staircase;
- $\mu$, the Gram–Schmidt coefficient of $b_2$ on $b_1$: how far $b_2$ leans along $b_1$.

The paper uses the same coordinates in four dimensions: three logs $y_1, y_2, y_3$ of prefix volumes and six coefficients $\mu_{ij}$.

In the paper: Appendix C, "Coordinates and the root box".
{ .paper-ref }

## The starting box

We only need to look at Ψ-minimal bases, and every lattice has one inside a bounded box.

- Adding a multiple of $b_1$ to $b_2$ changes no volume, so we can assume $|\mu| \le \tfrac12$. Flipping the sign of $b_2$ changes nothing either, so $0 \le \mu \le \tfrac12$.
- In two dimensions a Ψ-minimal $b_1$ is a shortest vector. Minkowski's theorem on convex bodies bounds its length: $|b_1|^2 \le 4/\pi$. So $y \le \log(4/\pi)$.
- At the other end, if $y < -0.4$ then $\Psi^2 = e^y$ is already below $2/\sqrt3$, so there's nothing to check.

The starting box is $-0.4 \le y \le \log(4/\pi)$, $0 \le \mu \le \tfrac12$. The paper's root box is built the same way, from size reduction, signs and window bounds, but in nine dimensions.

## The leaves

A box closes when one of three things holds on all of it.

- **(D) No Ψ-minimal basis here** (grey). On the whole box, $b_2$ is strictly shorter than $b_1$, so swapping them gives a better basis and nothing in the box is minimal. In coordinates: $\mu^2 + e^{-2y} < 1$.
- **(A) The bound is below the threshold** (green). In two dimensions $\Psi^2 = e^y$, so the box closes if $e^y < 2/\sqrt3$ on all of it.
- **(B) Inside the ball** (blue). The box lies within a small distance of the hexagonal lattice, where a separate local theorem says $\eta \le 2/\sqrt3$ with equality only at the centre.

Box outlines are boxes still waiting. Press *Step* to process one box, or *Run* to let it go.

<div class="widget" data-widget="bnb2d"></div>

## What to notice

The two red curves are where the tests change. Below the dashed line, (A) works. Above the solid curve, (D) works. Between them, in a thin sliver, are the Ψ-minimal bases whose potential is close to the threshold. The two curves touch at exactly one point, the hexagonal lattice, where $\Psi^2 = 2/\sqrt3$ and the basis is minimal.

No strict test can close a box that contains that point. (A) needs $\Psi^2 < 2/\sqrt3$ and (D) needs the basis not to be minimal, and at the hexagonal lattice neither is true. Splitting doesn't help, because some box always contains the corner. That is why the (B) ball is needed. Near the extremal lattice, a different kind of argument has to take over.

The real proof has the same problem twice over. At D₅ and D₅\*, $\eta$ equals the threshold 6 exactly, so the five-dimensional search needs balls around them. These are given by Theorem 13: within distance $1/10$ of D₅ or D₅\*, $\eta \le 6$ with equality only at the centre. That theorem is proved separately, by exact linear programming. In two dimensions the ball is a small piece of Lagrange's theorem, so this part of the miniature is a stand-in.

In the paper: Theorem 13, Appendix A.
{ .paper-ref }

## Threshold too low

Now switch the threshold to 1.15, just below the truth, and run again. This time the region around the hexagonal lattice contains real lattices with $\eta$ above the threshold. No test can close it, and the ball doesn't apply, because the local theorem bounds $\eta$ by $2/\sqrt3$, not by 1.15. The search keeps splitting there until the boxes are tiny, then gives up on them. They are marked orange, as *collected*.

That is exactly what the first stage of the real proof does. Its threshold is 6, but its function is $\Phi_5$, which goes above 6 near D₄ and $M_*$. Boxes there can't close, and they are collected and handed to a second stage that looks at the five-dimensional lifts directly. Chapter 9 is about that hand-off.

## What the real tests look like

In two dimensions every test is a one-line inequality. In the paper's four-dimensional search they are more work, but the logic is the same.

- **(D)** uses a list of ways a basis can fail to be minimal: a window of consecutive vectors that is too steep, a deep insertion or an elementary change that lowers $\Psi^2$ on the whole box, and the same tests for the reversed dual basis.
- **(A)** has to bound both factors of $\Phi_5 = \kappa^2\eta$. For $\eta$ it takes a good integer flag at the centre of the box and uses the concavity of $\log\det$ to bound that flag's potential over the whole box. For $\kappa$ it runs a second small branch and bound, over the torus of lifting forms $\varphi$, to show that every $\varphi$ leaves some short vector too close to the plane.

In the paper: Appendix C, "(D)" and "(A)".
{ .paper-ref }

Every test is a strict inequality, checked in interval arithmetic with outward rounding, so a box closes only if the claim holds at every real point in it. That is the difference between the miniature and the real thing, and chapter 10 is about why it matters.
