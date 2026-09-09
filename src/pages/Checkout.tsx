import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import html2canvas from "html2canvas";
import {
  Download,
  MessageCircle,
  ImageIcon,
  Loader2,
  CheckCircle2,
  ShoppingBag,
  ChevronLeft,
} from "lucide-react";
import { useCartStore } from "../store/cartStore";
import CustomerForm from "../components/CustomerForm";
import OrderSummary from "../components/OrderSummary";
import OrderNote from "../components/OrderNote";
import { getNextOrderNumber } from "../utils/orderNumber";
import { buildOrderMessage, getWhatsAppUrl, type CustomerData } from "../utils/whatsapp";

type Step = "form" | "note";

const EMPTY_CUSTOMER: CustomerData = {
  fullName: "",
  phone: "",
  district: "",
  address: "",
  reference: "",
  notes: "",
};

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState<Step>("form");
  const [customer, setCustomer] = useState<CustomerData>(EMPTY_CUSTOMER);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [noteImage, setNoteImage] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [whatsappOpened, setWhatsappOpened] = useState(false);

  const noteRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <ShoppingBag size={40} className="mx-auto text-navy-300" />
        <h1 className="mt-4 font-display text-2xl font-bold text-navy-900">Tu carrito está vacío</h1>
        <p className="mt-2 text-navy-500">Agrega productos antes de continuar con tu pedido.</p>
        <Link
          to="/productos"
          className="mt-6 inline-block rounded-lg bg-brand-500 px-6 py-3 font-semibold text-navy-900"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (data: CustomerData) => {
    setCustomer(data);
    if (!orderNumber) setOrderNumber(getNextOrderNumber());
    setStep("note");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGenerateImage = async () => {
    if (!noteRef.current) return;
    setGenerating(true);
    try {
      const canvas = await html2canvas(noteRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      setNoteImage(canvas.toDataURL("image/png"));
    } catch (err) {
      console.error("Error generando la imagen de la nota:", err);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!noteImage || !orderNumber) return;
    const link = document.createElement("a");
    link.href = noteImage;
    link.download = `${orderNumber}-eppsaltoke.png`;
    link.click();
  };

  const handleOpenWhatsApp = () => {
    if (!orderNumber) return;
    const message = buildOrderMessage(orderNumber, customer, items, subtotal);
    window.open(getWhatsAppUrl(message), "_blank");
    setWhatsappOpened(true);
  };

  const handleNewOrder = () => {
    clearCart();
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {step === "form" ? (
        <>
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-navy-500 hover:text-navy-800"
          >
            <ChevronLeft size={16} /> Volver
          </button>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mb-8">
            Datos de entrega
          </h1>
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            <div className="rounded-xl border border-navy-100 bg-white p-6">
              <CustomerForm initialData={customer} onSubmit={handleFormSubmit} />
            </div>
            <OrderSummary items={items} subtotal={subtotal} />
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setStep("form")}
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-navy-500 hover:text-navy-800"
          >
            <ChevronLeft size={16} /> Editar datos
          </button>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mb-2">
            Confirma y genera tu nota de pedido
          </h1>
          <p className="text-navy-500 mb-8">
            Pedido <span className="font-semibold text-navy-800">{orderNumber}</span>. Genera la
            imagen, descárgala y ábrela en WhatsApp para enviarla a nuestro equipo.
          </p>

          <div className="grid lg:grid-cols-[360px_1fr] gap-8">
            <div className="space-y-6">
              <OrderSummary items={items} subtotal={subtotal} />

              <div className="rounded-xl border border-navy-100 bg-white p-5 space-y-3">
                {!noteImage ? (
                  <button
                    onClick={handleGenerateImage}
                    disabled={generating}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy-900 py-3.5 font-semibold text-white hover:bg-navy-800 disabled:opacity-60 transition-colors"
                  >
                    {generating ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Generando...
                      </>
                    ) : (
                      <>
                        <ImageIcon size={18} /> Generar imagen de pedido
                      </>
                    )}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleDownload}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-navy-200 py-3 font-semibold text-navy-700 hover:bg-navy-50 transition-colors"
                    >
                      <Download size={18} /> Guardar imagen
                    </button>
                    <button
                      onClick={handleOpenWhatsApp}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3.5 font-semibold text-white hover:brightness-95 transition-all"
                    >
                      <MessageCircle size={18} /> Abrir WhatsApp
                    </button>
                  </>
                )}

                {noteImage && (
                  <p className="rounded-lg bg-brand-50 border border-brand-200 px-3 py-2.5 text-xs text-navy-700">
                    Guarda la imagen de tu pedido y adjúntala en WhatsApp para enviarla al vendedor.
                    El mensaje ya quedó preparado; solo falta adjuntar la imagen descargada.
                  </p>
                )}

                {whatsappOpened && (
                  <div className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2.5 text-xs text-green-700">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                    WhatsApp se abrió con tu mensaje listo. Adjunta la imagen descargada y envíala a
                    nuestro equipo.
                  </div>
                )}

                {whatsappOpened && (
                  <button
                    onClick={handleNewOrder}
                    className="w-full text-center text-xs font-semibold text-navy-400 hover:text-navy-600 pt-1"
                  >
                    Realizar un nuevo pedido
                  </button>
                )}
              </div>
            </div>

            {/* Preview visible de la nota */}
            <div className="flex justify-center">
              <div className="w-full max-w-[480px] overflow-hidden rounded-xl border border-navy-100 shadow-sm">
                {orderNumber && (
                  <OrderNote orderNumber={orderNumber} customer={customer} items={items} subtotal={subtotal} />
                )}
              </div>
            </div>
          </div>

          {/* Nodo oculto usado exclusivamente para la captura con html2canvas (idéntico al preview) */}
          <div style={{ position: "fixed", top: 0, left: -99999 }}>
            {orderNumber && (
              <OrderNote
                ref={noteRef}
                orderNumber={orderNumber}
                customer={customer}
                items={items}
                subtotal={subtotal}
              />
            )}
          </div>

          {noteImage && (
            <div className="mt-8">
              <p className="mb-2 text-sm font-semibold text-navy-800">Previsualización de la imagen generada</p>
              <img
                src={noteImage}
                alt="Nota de pedido generada"
                className="max-w-[320px] rounded-lg border border-navy-100 shadow"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
