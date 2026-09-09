import { useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";
import { CATEGORIES } from "../data/categories";

export default function CategoryList() {
  const navigate = useNavigate();

  return (
    <section id="categorias" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
            Explora por categoría
          </h2>
          <p className="mt-2 text-navy-500">
            Todo lo que tu equipo necesita para trabajar con seguridad
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[cat.icon] ?? Icons.Package;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/productos?categoria=${encodeURIComponent(cat.name)}`)}
                className="group flex flex-col items-center gap-3 rounded-xl border border-navy-100 bg-navy-50/40 p-5 text-center hover:border-brand-400 hover:bg-brand-50 transition-colors"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-brand-400 group-hover:bg-brand-500 group-hover:text-navy-900 transition-colors">
                  <Icon size={22} />
                </span>
                <span className="text-sm font-medium text-navy-800">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
