"""Write the "Show basis" blocks of docs/glossary.md, and check them.

Each named lattice is given by an integer (or rational) Gram matrix G whose basis order is a Psi-minimal flag, the one
behind the paper's profiles. The script size-reduces the basis (a lower-triangular unimodular change, which keeps the
flag and Psi) where it was found by search, computes the triangular form B with G = B B^T exactly, and checks:
  - L D L^T = G over Q, where B = L diag(sqrt(D)) (so B B^T = G exactly);
  - the squared diagonal of B is the stated staircase;
  - eta = Psi^2 / Delta^((n+1)/2) equals the paper's value (compared as eta^2, which is rational).
Since the paper's value is the minimum over all bases, the last check also shows that each basis shown is Psi-minimal.
Every entry of B is +-sqrt(rational), because B_ij^2 = mu_ij^2 r_j, so it is printed exactly.

Usage: python scripts/glossary_bases.py           rewrite the blocks in docs/glossary.md
       python scripts/glossary_bases.py --check   fail (exit 1) if a check fails or the page is out of date
"""
import math, re, sys
from fractions import Fraction as F
from pathlib import Path

PAGE = Path(__file__).resolve().parent.parent / "docs" / "glossary.md"


def mat(rows):
    return [[F(x) for x in r] for r in rows]


def mul(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(len(B))) for j in range(len(B[0]))] for i in range(len(A))]


def tr(A):
    return [list(r) for r in zip(*A)]


def inverse(G):
    n = len(G)
    A = [list(r) + [F(int(i == j)) for j in range(n)] for i, r in enumerate(G)]
    for c in range(n):
        p = next(r for r in range(c, n) if A[r][c] != 0)
        A[c], A[p] = A[p], A[c]
        A[c] = [x / A[c][c] for x in A[c]]
        for r in range(n):
            if r != c and A[r][c] != 0:
                A[r] = [x - A[r][c] * y for x, y in zip(A[r], A[c])]
    return [r[n:] for r in A]


def reversed_dual(G, scale):
    """Gram matrix of the reversed dual basis, J G^-1 J, times scale."""
    Gi = inverse(G)
    n = len(G)
    return [[scale * Gi[n - 1 - i][n - 1 - j] for j in range(n)] for i in range(n)]


def ldl(G):
    """G = L D L^T with L unit lower triangular: L[i][j] = mu_ij, D[j] = r_j = |b_j*|^2."""
    n = len(G)
    L = [[F(int(i == j)) for j in range(n)] for i in range(n)]
    D = [F(0)] * n
    for j in range(n):
        D[j] = G[j][j] - sum(L[j][k] ** 2 * D[k] for k in range(j))
        for i in range(j + 1, n):
            L[i][j] = (G[i][j] - sum(L[i][k] * L[j][k] * D[k] for k in range(j))) / D[j]
    return L, D


def size_reduce(G):
    """Size-reduce the basis with Gram matrix G; returns the new Gram matrix."""
    n = len(G)
    U = [[F(int(i == j)) for j in range(n)] for i in range(n)]
    for i in range(1, n):
        for j in range(i - 1, -1, -1):
            H = mul(mul(U, G), tr(U))
            L, _ = ldl(H)
            m = math.floor(L[i][j] + F(1, 2))
            if m:
                U[i] = [a - m * b for a, b in zip(U[i], U[j])]
    return mul(mul(U, G), tr(U))


def det(G):
    _, D = ldl(G)
    return math.prod(D)


# ---- formatting ----------------------------------------------------------------------------------------------
def tex_q(x):
    x = F(x)
    if x.denominator == 1:
        return str(x.numerator)
    s = "-" if x < 0 else ""
    return rf"{s}\tfrac{{{abs(x.numerator)}}}{{{x.denominator}}}"


def plain_q(x):
    x = F(x)
    return str(x.numerator) if x.denominator == 1 else f"{x.numerator}/{x.denominator}"


def squarefree_split(m):
    """m = s^2 c with c squarefree."""
    s, c, p = 1, 1, 2
    while p * p <= m:
        while m % (p * p) == 0:
            m //= p * p
            s *= p
        if m % p == 0:
            m //= p
            c *= p
        p += 1
    return s, c * m


def tex_sqrt(x, sign=1):
    """sign * sqrt(x) for rational x >= 0, as s sqrt(c) / q."""
    x = F(x)
    if x == 0:
        return "0"
    q = x.denominator
    s, c = squarefree_split(x.numerator * q)       # sqrt(p/q) = sqrt(p q) / q = s sqrt(c) / q
    g = math.gcd(s, q)
    s, q = s // g, q // g
    num = (str(s) if s != 1 or c == 1 else "") + (rf"\sqrt{{{c}}}" if c != 1 else "")
    body = num if q == 1 else rf"\tfrac{{{num}}}{{{q}}}"
    return ("-" if sign < 0 else "") + body


def pmatrix(rows):
    return r"\begin{pmatrix}" + r"\\".join("&".join(r) for r in rows) + r"\end{pmatrix}"


# ---- the lattices ----------------------------------------------------------------------------------------------
def cartan_path(n):
    return [[2 if i == j else -1 if abs(i - j) == 1 else 0 for j in range(n)] for i in range(n)]


# Cartan matrices in the order of a Psi-minimal root flag (simple roots, Bourbaki labels, in the order given)
D4 = mat([[2, -1, 0, 0], [-1, 2, -1, -1], [0, -1, 2, 0], [0, -1, 0, 2]])
D5 = mat([[2, -1, 0, 0, -1], [-1, 2, -1, -1, 0], [0, -1, 2, 0, 0], [0, -1, 0, 2, 0], [-1, 0, 0, 0, 2]])
E8 = mat([[2, -1, 0, 0, 0, 0, 0, 0], [-1, 2, -1, -1, 0, 0, 0, 0], [0, -1, 2, 0, -1, 0, 0, 0],
          [0, -1, 0, 2, 0, -1, 0, 0], [0, 0, -1, 0, 2, 0, 0, 0], [0, 0, 0, -1, 0, 2, -1, 0],
          [0, 0, 0, 0, 0, -1, 2, -1], [0, 0, 0, 0, 0, 0, -1, 2]])
E7 = [r[:7] for r in E8[:7]]
E6 = [r[:6] for r in E8[:6]]
A3 = mat(cartan_path(3))
P0 = mat([[18, -9, 0, 0], [-9, 18, -9, -9], [0, -9, 16, 1], [0, -9, 1, 16]])
FLAG_M = [[-1, -1, 0, -1], [-1, -1, 1, -1], [-1, 0, -1, -1], [0, 0, 0, -1]]   # Prop. 17(2), completed by -e4
PIVD5 = mat([[2, -1, 0, 0], [-1, F(3, 2), -1, 0], [0, -1, 2, -1], [0, 0, -1, 2]])
U_PIVD5 = [[0, -1, 0, 0], [0, -1, -1, 0], [-1, -1, 0, 0], [0, -1, -1, -1]]
HA = mat([[6, -3, 0, 0], [-3, 6, -3, -3], [0, -3, 4, 1], [0, -3, 1, 4]])
U_HA = [[0, 0, 0, -1], [0, -1, -1, 0], [0, 0, -1, 0], [-1, -1, 0, -1]]


def change(G, U):
    U = mat(U)
    return mul(mul(U, G), tr(U))


def staircase_A(n):
    return [F(k + 1, k) for k in range(1, n + 1)]


def staircase_DE(n):
    return ([F(2), F(3, 2), F(4, 3)] + [F(1)] * (n - 3)) if n <= 5 else \
        [F(2), F(3, 2), F(4, 3), F(1), F(1), F(3, 4), F(2, 3), F(1, 2)][:n]


# key, title, Gram, what the Gram is, staircase, eta^2, eta as printed, paper reference
LATTICES = [
    ("A_n", "A₂", mat(cartan_path(2)), r"the Cartan matrix of $A_2$, simple roots $\alpha_1, \alpha_2$",
     staircase_A(2), F(4, 3), r"\tfrac{2}{\sqrt3}", "Table 2 (Theorem 5)"),
    ("A_n", "A₃ (fcc)", A3, r"the Cartan matrix of $A_3$, simple roots in order along the chain",
     staircase_A(3), F(9, 4), r"\tfrac32", "Table 2 (Theorem 5)"),
    ("A_n", "A₄", mat(cartan_path(4)), r"the Cartan matrix of $A_4$, simple roots in order along the chain",
     staircase_A(4), F(576, 125), r"\tfrac{24}{5\sqrt5}", "Table 2 (Theorem 5)"),
    ("A3*", "A₃\\* (bcc)", reversed_dual(A3, 2),
     r"twice the Gram matrix of the reversed dual of the $A_3$ basis above, $2\,JG^{-1}J$ (so bcc scaled by $\sqrt2$)",
     [F(3, 2), F(4, 3), F(1)], F(9, 4), r"\tfrac32", "§2, Isoduality: the reversed dual of a Ψ-minimal basis is Ψ-minimal"),
    ("D_n", "D₄", D4, r"the Cartan matrix of $D_4$, simple roots $\alpha_1, \alpha_2, \alpha_3, \alpha_4$ (the centre second)",
     staircase_DE(4), F(9), "3", "Table 2 (Theorem 5)"),
    ("D_n", "D₅", D5, r"the Cartan matrix of $D_5$, simple roots $\alpha_2, \alpha_3, \alpha_4, \alpha_5, \alpha_1$",
     staircase_DE(5), F(36), "6", "Table 2 (Theorem 5)"),
    ("D5*", "D₅\\*", reversed_dual(D5, 2),
     r"twice the Gram matrix of the reversed dual of the D₅ basis above, $2\,JG^{-1}J$ (so D₅\* scaled by $\sqrt2$)",
     [F(2), F(2), F(3, 2), F(4, 3), F(1)], F(36), "6", "§2, Isoduality: the reversed dual of a Ψ-minimal basis is Ψ-minimal"),
    ("E_n", "E₆", E6, r"the Cartan matrix of $E_6$, simple roots $\alpha_2, \alpha_4, \alpha_3, \alpha_5, \alpha_1, \alpha_6$",
     staircase_DE(6), F(128 ** 2 * 3, 81), r"\tfrac{128\sqrt3}{9}", "Table 2 (Theorem 5)"),
    ("E_n", "E₇", E7, r"the Cartan matrix of $E_7$, simple roots $\alpha_2, \alpha_4, \alpha_3, \alpha_5, \alpha_1, \alpha_6, \alpha_7$",
     staircase_DE(7), F(144 ** 2), "144", "Table 2 (Theorem 5)"),
    ("E_n", "E₈", E8, r"the Cartan matrix of $E_8$, simple roots $\alpha_2, \alpha_4, \alpha_3, \alpha_5, \alpha_1, \alpha_6, \alpha_7, \alpha_8$",
     staircase_DE(8), F(2304 ** 2), "2304", "Table 2 (Theorem 5)"),
    ("A2xA2", "A₂⊗A₂", change(HA, U_HA),
     r"$H_A$ of the paper (determinant 81) in a Ψ-minimal basis, rows $-e_4$, $-e_2-e_3$, $-e_3$, $-e_1-e_2-e_4$ in its coordinates",
     [F(4), F(3), F(3), F(9, 4)], F(64 ** 2, 27 ** 2), r"\tfrac{64}{27}", "Remark 24"),
    ("pivd5", "π_vD₅", change(PIVD5, U_PIVD5),
     r"the paper's Gram matrix of $\pi_vD_5$ (determinant 2) in a Ψ-minimal basis, rows $-e_2$, $-e_2-e_3$, $-e_1-e_2$, $-e_2-e_3-e_4$ in its coordinates",
     [F(3, 2), F(4, 3), F(1), F(1)], F(9, 2), r"\tfrac{3}{\sqrt2}",
     r"Proposition 21 and the text before it; $\eta = 3/\sqrt2$ is $\Phi_5(\pi_vD_5) = 6$ divided by $\kappa^2 = 2\sqrt2$"),
    ("Mstar", "M\\*", change(P0, FLAG_M),
     r"$P_0$ in the basis of the paper's Ψ-minimal flag $(-1,-1,0,-1)$, $(-1,-1,1,-1)$, $(-1,0,-1,-1)$, completed by $-e_4$",
     [F(16), F(12), F(45, 4), F(135, 16)], F(2 ** 28, 3 ** 10 * 5 ** 4), r"\tfrac{2^{14}}{3^5\cdot5^2}",
     "Definition 16, Proposition 17 (2)"),
]


# Bases found by search are size-reduced, which keeps the flag; Cartan matrices and their duals are shown as they are.
SIZE_REDUCE = {"A₂⊗A₂", "π_vD₅", "M\\*"}


def block(title, G0, what, stair, eta2, eta_tex, ref):
    n = len(G0)
    G = size_reduce(G0) if title in SIZE_REDUCE else G0
    L, D = ldl(G)
    # checks
    LDLt = [[sum(L[i][k] * D[k] * L[j][k] for k in range(n)) for j in range(n)] for i in range(n)]
    assert LDLt == G, f"{title}: L D L^T != G"
    assert D == stair, f"{title}: staircase {D} != {stair}"
    Gk = [math.prod(D[:k + 1]) for k in range(n)]
    psi2, Delta = math.prod(Gk), Gk[-1]
    assert psi2 ** 2 == eta2 * Delta ** (n + 1), f"{title}: eta^2 = {psi2 ** 2 / Delta ** (n + 1)} != {eta2}"
    if title in SIZE_REDUCE:
        assert size_reduce(G) == G
    if G0 != G:
        assert det(G0) == det(G)
    B = [[tex_sqrt(L[i][j] ** 2 * D[j], 1 if L[i][j] >= 0 else -1) if j <= i else "0" for j in range(n)]
         for i in range(n)]
    Gt = [[tex_q(x) for x in r] for r in G]
    e = n + 1
    epow = str(e // 2) if e % 2 == 0 else f"{e}/2"
    dpow = rf"{tex_q(Delta)}^{{{e // 2}}}" if e % 2 == 0 else rf"{tex_q(Delta)}^{{{e}/2}}"
    out = [f'??? info "Show a basis of {title}"', ""]
    out.append(f"    Gram matrix $G$: {what}.")
    out.append("")
    out.append(f"    $$G = {pmatrix(Gt)}$$")
    out.append("")
    out.append(r"    In triangular form, rows $b_1, \dots, b_" + str(n) + r"$, with $BB^{\mathsf T} = G$ and $B_{ij} = \mu_{ij}|b_j^*|$:")
    out.append("")
    out.append(f"    $$B = {pmatrix(B)}$$")
    out.append("")
    out.append("    Squared diagonal (the staircase): " + ", ".join(f"${tex_q(x)}$" for x in D) +
               ". Volumes $G_k$: " + ", ".join(f"${tex_q(x)}$" for x in Gk) +
               rf". So $\Psi^2 = G_1\cdots G_{n} = {tex_q(psi2)}$, $\Delta = {tex_q(Delta)}$, and" +
               rf" $\eta = \Psi^2/\Delta^{{{epow}}} = {tex_q(psi2)}/{dpow} = {eta_tex}$.")
    if G0 != G:
        out.append("")
        out.append("    (Size-reduced from the matrix described: the same flag, so the same staircase and Ψ.)")
    out.append("")
    out.append(f"    In the paper: {ref}.")
    out.append("    { .paper-ref }")
    return "\n".join(out)


def render():
    groups = {}
    for key, *rest in LATTICES:
        groups.setdefault(key, []).append(block(*rest))
    return {k: "\n\n".join(v) for k, v in groups.items()}


def main():
    check = "--check" in sys.argv
    blocks = render()                                      # raises AssertionError if any check fails
    text = PAGE.read_text(encoding="utf-8")
    new = text
    for key, body in blocks.items():
        pat = re.compile(rf"(<!-- basis:{re.escape(key)} -->\n).*?(<!-- /basis:{re.escape(key)} -->)", re.S)
        if not pat.search(new):
            sys.exit(f"marker <!-- basis:{key} --> missing from {PAGE}")
        new = pat.sub(lambda m: m.group(1) + "\n" + body + "\n\n" + m.group(2), new)
    if check:
        if new != text:
            sys.exit("docs/glossary.md is out of date: run python scripts/glossary_bases.py")
        print(f"glossary bases: {len(LATTICES)} lattices checked, page up to date")
    else:
        PAGE.write_text(new, encoding="utf-8")
        print(f"glossary bases: {len(LATTICES)} lattices checked, page written")


if __name__ == "__main__":
    main()
