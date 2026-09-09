import { MessageCircle } from "lucide-react";
import { buildGeneralInquiryMessage, getWhatsAppUrl } from "../utils/whatsapp";

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl(buildGeneralInquiryMessage())}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 transition-transform"
    >
      <MessageCircle size={28} fill="white" />
    </a>
  );
}
