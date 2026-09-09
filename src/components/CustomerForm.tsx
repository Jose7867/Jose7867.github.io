import { useState } from "react";
import { AlertCircle } from "lucide-react";
import type { CustomerData } from "../utils/whatsapp";

interface Props {
  initialData: CustomerData;
  onSubmit: (data: CustomerData) => void;
}

type Errors = Partial<Record<keyof CustomerData, string>>;

export default function CustomerForm({ initialData, onSubmit }: Props) {
  const [data, setData] = useState<CustomerData>(initialData);
  const [errors, setErrors] = useState<Errors>({});

  const update = (field: keyof CustomerData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!data.fullName.trim()) newErrors.fullName = "Ingresa tu nombre completo.";
    if (!data.phone.trim()) newErrors.phone = "Ingresa un número de teléfono.";
    else if (!/^[0-9+\s-]{6,}$/.test(data.phone.trim())) newErrors.phone = "Ingresa un teléfono válido.";
    if (!data.district.trim()) newErrors.district = "Ingresa tu distrito.";
    if (!data.address.trim()) newErrors.address = "Ingresa la dirección de entrega.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(data);
    }
  };

  const fieldClass = (field: keyof CustomerData) =>
    `w-full rounded-lg border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 ${
      errors[field]
        ? "border-red-300 focus:border-red-400 focus:ring-red-400"
        : "border-navy-200 focus:border-brand-500 focus:ring-brand-500"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-semibold text-navy-800">Nombre completo *</label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          className={fieldClass("fullName")}
          placeholder="Ej. José Antonio Pérez"
        />
        {errors.fullName && <FieldError message={errors.fullName} />}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-navy-800">Número de teléfono *</label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={fieldClass("phone")}
          placeholder="Ej. 999 999 999"
        />
        {errors.phone && <FieldError message={errors.phone} />}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-navy-800">Distrito *</label>
        <input
          type="text"
          value={data.district}
          onChange={(e) => update("district", e.target.value)}
          className={fieldClass("district")}
          placeholder="Ej. Cusco"
        />
        {errors.district && <FieldError message={errors.district} />}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-navy-800">
          Dirección de entrega *
        </label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => update("address", e.target.value)}
          className={fieldClass("address")}
          placeholder="Ej. Av. Ejemplo 123"
        />
        {errors.address && <FieldError message={errors.address} />}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-navy-800">
          Referencia de dirección
        </label>
        <input
          type="text"
          value={data.reference}
          onChange={(e) => update("reference", e.target.value)}
          className={fieldClass("reference")}
          placeholder="Ej. Frente al parque, edificio azul"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-navy-800">
          Observaciones (opcional)
        </label>
        <textarea
          value={data.notes}
          onChange={(e) => update("notes", e.target.value)}
          rows={3}
          className={fieldClass("notes")}
          placeholder="Ej. Entregar después de las 3pm"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-navy-900 py-3.5 font-semibold text-white hover:bg-navy-800 transition-colors"
      >
        Continuar y generar nota de pedido
      </button>
    </form>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
      <AlertCircle size={12} /> {message}
    </p>
  );
}
