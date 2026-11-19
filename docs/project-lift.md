# The natural proof: project and lift

Every five-dimensional lattice is a four-dimensional lattice with something stacked on top.

Pick a shortest vector $v$ of $L$ and squash $L$ flat along it, as in the last chapter. The shadow $M = \pi_v L$ is a four-dimensional lattice. Then turn the picture round. Given $M$, how many ways are there to rebuild a five-dimensional lattice above it, and how well can any of them do?

If every possible rebuild had $\eta \le 6$, the theorem would follow. This chapter explains the rebuilding, the number $\kappa$ that measures it, and the function $\Phi_5$ that turns the five-dimensional problem into a four-dimensional one. That reduction is the natural proof. The next chapter is about why it isn't quite enough.

## Squash and rebuild, in three dimensions

Everything is easier to see one dimension down, so the widget below does the 3D → 2D version. Press **1** to watch fcc slide along a shortest vector $v = (1,1,0)$ onto the plane perpendicular to it. Points that differ by a multiple of $v$ land on top of each other, and what's left is a 2D lattice $M$. Then press **2** to rebuild.

<div class="widget" data-widget="projectlift" data-config='{"fallback": "fcc_project.png", "fallbackCaption": "fcc (grey) projected along a shortest vector v (green) onto a plane lattice M (blue)."}'></div>

The rebuild has two ingredients.

- **The height** $r = |v|^2$: how far apart the layers are.
- **The lifting form** $\varphi$: how far each layer is shifted. Above a point $s$ of $M$, the lattice points sit at heights $(j + \varphi(s))\sqrt r$ for $j \in \mathbb Z$. Only the fractional part of $\varphi(s)$ matters, and $\varphi$ is linear, so it is fixed by its values on a basis of $M$: two numbers modulo 1 here, four in the real problem. The space of choices is a torus.

The two sliders set $\varphi$ on the basis $s_1, s_2$ of $M$, and the third sets $r$. With $\varphi = (\tfrac12, \tfrac12)$ and $r = 2$ you get fcc back.

## The rule that keeps v shortest

There is one constraint. The whole point was that $v$ is a *shortest* vector, so no rebuilt lattice may contain anything shorter than $v$.

The shortest lattice vector above a point $s$ of $M$ is the one in the layer nearest to the plane, at height $\|\varphi(s)\|\sqrt r$, where $\|x\|$ is the distance from $x$ to the nearest integer. Its squared length is $|s|^2 + r\|\varphi(s)\|^2$, and that must be at least $r$:

$$
|s|^2 \;\ge\; r\left(1 - \|\varphi(s)\|^2\right) \qquad\text{for every } s \ne 0 \text{ in } M.
$$

So for a given $\varphi$, the layers can be at most

$$
r \;\le\; \min_{s \ne 0}\ \frac{|s|^2}{1 - \|\varphi(s)\|^2}
$$

apart. In the widget, push $r$ past this limit and the offending points turn red.

A good lifting form shifts every short vector of $M$ far from the plane, so that the minimum is large. The best any $\varphi$ can do, after scaling $M$ to determinant 1, is

$$
\kappa(M) \;=\; \sup_\varphi\ \min_{s \ne 0}\ \frac{|s|^2}{1 - \|\varphi(s)\|^2}.
$$

In the paper: §5.1.
{ .paper-ref }

Since $\|\varphi(s)\| \le \tfrac12$, the denominator is at least $\tfrac34$, so $\kappa(M)$ lies between $\lambda_1(M)^2$ and $\tfrac43\lambda_1(M)^2$.

## The reduction

Now put the pieces together. If $L$ has a shortest vector $v$ with shadow $M$, its height can't exceed what $\kappa(M)$ allows. The splitting inequality bounds $\eta(L)$ by the height and $\eta(M)$. Together:

$$
\eta(L) \;\le\; \kappa(M)^{\ell/2}\,\eta(M) \;=:\; \Phi_{\ell+1}(M),
$$

where $\ell = n - 1$ is the dimension of $M$. So

$$
\eta_5 \;\le\; \sup_M\ \Phi_5(M), \qquad \Phi_5(M) = \kappa(M)^2\,\eta(M),
$$

the supremum over four-dimensional lattices $M$.

In the paper: Proposition 10.
{ .paper-ref }

This turns a question about five-dimensional lattices into one about four-dimensional lattices, with no reference to lifts at all. If $\Phi_5 \le 6$ everywhere, then $\eta_5 = 6$.

In the 3D widget the analogue is $\Phi_3(M) = \kappa(M)\,\eta(M)$. The readout computes it for the shadow of fcc, by a grid search over the torus, so it is a numerical illustration. The best $\varphi$ it finds is fcc's own form $(\tfrac12, \tfrac12)$, and $\Phi_3$ comes out at $3/2 = \eta_3$. For fcc the reduction loses nothing.

## What κ is at D₄

Near the top, the shadow should look like D₄, the best four-dimensional lattice. So what is $\kappa(D_4)$?

The answer comes from root systems. D₄'s shortest vectors are its 24 roots. The paper proves a lemma about any simply-laced root system: *for every lifting form $\varphi$, some root $\alpha$ has $\|\varphi(\alpha)\| \le 1/h$*, where $h$ is the [Coxeter number](https://en.wikipedia.org/wiki/Coxeter_number). For D₄, $h = 6$.

In the paper: Lemma 9, Proposition 12.
{ .paper-ref }

For D₄ the lemma is a pigeonhole argument. After using the symmetries, any $\varphi$ can be described by five non-negative numbers $a_0, \dots, a_4$, its values on the four simple roots and one minus its value on the highest root, with

$$
a_0 + a_1 + 2a_2 + a_3 + a_4 = 1.
$$

The coefficients add up to $6 = h$, so the smallest $a_i$ is at most $1/6$. That root sits at most $1/6$ of a layer from the plane, and it limits the height:

$$
\kappa(D_4) \;=\; \gamma(D_4)\cdot\frac{h^2}{h^2-1} \;=\; \sqrt2\cdot\frac{36}{35} \;\approx\; 1.4546,
$$

attained exactly when $\varphi$ is a "principal element", which puts the roots at heights $\tfrac16, \tfrac26, \dots, \tfrac56$ by their height in the root system. Then

$$
\Phi_5(D_4) \;=\; \kappa(D_4)^2\,\eta(D_4) \;=\; 3\left(\tfrac{36\sqrt2}{35}\right)^2 \;\approx\; 6.348.
$$

That is already above 6, but only by the factor $(36/35)^2$. A few more values:

| $M$ | $\eta(M)$ | $\kappa(M)$ | $\Phi_5(M)$ |
|---|---|---|---|
| D₄ | $3$ | $36\sqrt2/35 \approx 1.4546$ | $\approx 6.348$ |
| A₄ | $\approx 2.1466$ | $\tfrac{25}{24}\cdot 2\cdot 5^{-1/4} \approx 1.3932$ | $\approx 4.167$ |
| $\mathbb Z^4$ | $1$ | $4/3$ | $\approx 1.778$ |

In the paper: §5.1, the table after Proposition 12.
{ .paper-ref }

The trivial bound, $\kappa \le \tfrac43\lambda_1^2$, gives $\Phi_5 \le \tfrac{32}{9}\cdot3 \approx 10.7$. Everything interesting is in how $\kappa$ behaves near D₄.

## A thin band

The value 6.348 at D₄ doesn't mean there's a lattice with $\eta = 6.348$. The bound loses something. At D₅\*, whose shadow is D₄, the actual lifting form is a 2-torsion point, nowhere near the principal element, and $\eta(D_5^*)$ is exactly 6.

The paper turns this into a statement about the first vector. If the shadow of $L$ is exactly D₄, then $\eta(L) > 6$ would need

$$
2^{2/5} \approx 1.3195 \;<\; \gamma(L) \;\le\; \left(\tfrac{36\sqrt2}{35}\right)^{4/5} \approx 1.3496,
$$

a thin band of possible lengths for the shortest vector. Its lower end is D₅\* itself.

In the paper: Corollary 11, Proposition 28.
{ .paper-ref }

The same calculation in dimensions 6, 7 and 8, with the previous champion D₅, E₆ or E₇ as the shadow, leaves no band at all. Their Coxeter numbers, 8, 12 and 18, are large enough that lifts over them fall short of the conjectured values. Dimension five is the exception because D₄'s Coxeter number, 6, is small. That is one reason why five is the hard case.

## So, is Φ₅ at most 6?

It isn't. D₄ already gives 6.348. The hope was that D₄ is the worst case and that a finer argument near D₄ would close the gap.

But D₄ is not the worst case. The next chapter is about the lattice that is.
