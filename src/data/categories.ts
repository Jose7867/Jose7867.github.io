export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // lucide-react icon name
}

// Para agregar o modificar categorías, edita este arreglo.
export const CATEGORIES: Category[] = [
  { id: "cascos", name: "Cascos", slug: "cascos", icon: "HardHat" },
  { id: "chalecos", name: "Chalecos", slug: "chalecos", icon: "Shirt" },
  { id: "guantes", name: "Guantes", slug: "guantes", icon: "Hand" },
  { id: "calzado", name: "Calzado de Seguridad", slug: "calzado-de-seguridad", icon: "Footprints" },
  { id: "ocular", name: "Protección Ocular", slug: "proteccion-ocular", icon: "Glasses" },
  { id: "auditiva", name: "Protección Auditiva", slug: "proteccion-auditiva", icon: "Ear" },
  { id: "respiratoria", name: "Protección Respiratoria", slug: "proteccion-respiratoria", icon: "Wind" },
  { id: "altura", name: "Arnés y Trabajos en Altura", slug: "arnes-trabajos-altura", icon: "Link2" },
  { id: "ropa", name: "Ropa de Trabajo", slug: "ropa-de-trabajo", icon: "Shirt" },
  { id: "senalizacion", name: "Señalización", slug: "senalizacion", icon: "TriangleAlert" },
  { id: "otros", name: "Otros", slug: "otros", icon: "PackagePlus" },
];
