import { Link } from "react-router-dom";
import { ShieldCheck, MessageCircle, Truck, BadgeCheck, Clock } from "lucide-react";
import { buildGeneralInquiryMessage, getWhatsAppUrl } from "../utils/whatsapp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--color-brand-500) 0%, transparent 45%), radial-gradient(circle at 80% 70%, var(--color-navy-400) 0%, transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-navy-800 border border-navy-600 px-3 py-1 text-xs font-semibold text-brand-300">
            <ShieldCheck size={14} /> Equipos certificados para tu empresa
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl font-bold leading-tight">
            Equipos de protección para trabajar seguro
          </h1>
          <p className="mt-4 text-lg text-navy-200 max-w-xl">
            Encuentra equipos de seguridad y protección personal para tus actividades laborales.
            Calidad certificada, atención personalizada y coordinación directa con nuestro equipo.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 font-semibold text-navy-900 hover:bg-brand-400 transition-colors"
            >
              Ver productos
            </Link>
            <a
              href={getWhatsAppUrl(buildGeneralInquiryMessage())}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-6 py-3 font-semibold hover:bg-white/20 transition-colors"
            >
              <MessageCircle size={18} /> Comprar por WhatsApp
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            <div className="flex flex-col items-start gap-1">
              <BadgeCheck className="text-brand-400" size={22} />
              <span className="text-xs text-navy-300">Calidad certificada</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <Truck className="text-brand-400" size={22} />
              <span className="text-xs text-navy-300">Delivery coordinado</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <Clock className="text-brand-400" size={22} />
              <span className="text-xs text-navy-300">Atención rápida</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden border border-navy-700 shadow-2xl">
            <img
              src="../images/calzado.jpg"
              alt="Trabajador utilizando equipo de protección personal completo"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden sm:block bg-white text-navy-900 rounded-xl shadow-xl px-5 py-4">
            <p className="text-xs text-navy-500 font-medium">Envío gratis desde</p>
            <p className="font-display font-bold text-lg">S/ 1,000.00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
