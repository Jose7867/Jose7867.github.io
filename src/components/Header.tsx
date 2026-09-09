import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { COMPANY_CONFIG } from "../config/company";

const NAV_LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Productos", to: "/productos" },
  { label: "Categorías", to: "/#categorias" },
  { label: "Nosotros", to: "/#nosotros" },
  { label: "Contacto", to: "/#contacto" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const toggleCart = useCartStore((s) => s.toggleCart);
  const navigate = useNavigate();

  const handleNavClick = (to: string) => {
    setMenuOpen(false);
    if (to.startsWith("/#")) {
      const id = to.slice(2);
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    } else {
      navigate(to);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur border-b border-navy-700 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => handleNavClick("/")}
            className="flex items-center gap-2 font-display font-bold text-lg tracking-tight"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-navy-900">
              <ShieldCheck size={20} strokeWidth={2.5} />
            </span>
            <span>
              Epps<span className="text-brand-400">Altoke</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.to)}
                className="px-3 py-2 text-sm font-medium text-navy-100 hover:text-white hover:bg-navy-800 rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleCart}
              aria-label="Abrir carrito"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-navy-800 transition-colors"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-navy-900">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-navy-800"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-navy-700 bg-navy-900">
          <nav className="flex flex-col px-4 py-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.to)}
                className="py-3 text-left text-sm font-medium text-navy-100 hover:text-white border-b border-navy-800 last:border-0"
              >
                {link.label}
              </button>
            ))}
            <div className="py-3 text-xs text-navy-300">{COMPANY_CONFIG.description}</div>
          </nav>
        </div>
      )}
    </header>
  );
}
