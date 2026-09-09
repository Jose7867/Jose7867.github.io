import { ShieldCheck, Phone, MapPin, Clock, Globe } from "lucide-react";
import { COMPANY_CONFIG } from "../config/company";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-navy-900 text-navy-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-navy-900">
              <ShieldCheck size={20} strokeWidth={2.5} />
            </span>
            Epps<span className="text-brand-400">Altoke</span>
          </div>
          <p className="mt-3 text-sm text-navy-400">{COMPANY_CONFIG.description}</p>
        </div>

        <div id="nosotros">
          <h4 className="font-semibold text-white mb-3">Nosotros</h4>
          <p className="text-sm text-navy-400 leading-relaxed">
            En {COMPANY_CONFIG.name} proveemos equipos de protección personal certificados para
            empresas y trabajadores, con atención directa y personalizada.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Contacto</h4>
          <ul className="space-y-2 text-sm text-navy-400">
            <li className="flex items-center gap-2">
              <Phone size={15} /> {COMPANY_CONFIG.phone}
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0" /> {COMPANY_CONFIG.address}
            </li>
            <li className="flex items-center gap-2">
              <Clock size={15} /> {COMPANY_CONFIG.hours}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Síguenos</h4>
          <div className="flex gap-3">
            <a
              href={COMPANY_CONFIG.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 hover:bg-navy-700"
              aria-label="Facebook"
            >
              <Globe size={16} />
            </a>
            <a
              href={COMPANY_CONFIG.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 hover:bg-navy-700"
              aria-label="Instagram"
            >
              <Globe size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-800 py-5 text-center text-xs text-navy-500">
        © 2026 {COMPANY_CONFIG.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
