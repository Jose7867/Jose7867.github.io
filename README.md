# EppsAltoke — Landing page de ventas de EPP

Landing page 100% frontend (sin backend, sin base de datos, sin login) para la venta de Equipos
de Protección Personal, con carrito, generación de nota de pedido en imagen PNG y pedido final
por WhatsApp.

## Tecnologías

React + TypeScript + Vite + Tailwind CSS v4 + Zustand + React Router + html2canvas + lucide-react.

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Cómo compilar para producción

```bash
npm run build
```

Esto genera la carpeta `dist/`, lista para desplegar en **GitHub Pages**, **Vercel** o **Netlify**
como sitio estático.

## Qué editar para personalizar la tienda

| Qué quiero cambiar | Archivo |
|---|---|
| Número de WhatsApp, nombre, dirección, horario, redes | `src/config/company.ts` |
| Monto mínimo para delivery gratis y precio base del delivery | `src/config/company.ts` (`freeDeliveryMinimum`, `minimumDeliveryPrice`) |
| Productos (nombre, precio, imágenes, colores, tallas, categoría) | `src/data/products.ts` |
| Categorías del menú | `src/data/categories.ts` |
| Colores de marca (dorado/navy) y tipografías | `src/index.css` (bloque `@theme`) |

### Agregar un producto nuevo

Copia un objeto dentro de `PRODUCTS` en `src/data/products.ts` y cambia sus valores. Si el
producto **no** tiene variantes de color o talla, deja el arreglo vacío:

```ts
colors: [],
sizes: [],
```

La interfaz detecta automáticamente si debe mostrar selectores de color/talla.

### Imágenes de productos

Por defecto los productos usan imágenes de referencia (`picsum.photos`) solo para que la tienda
se vea completa desde el primer momento. Para usar fotos reales:

1. Coloca las imágenes en `public/images/products/`.
2. En `src/data/products.ts`, cambia `image` e `images` por rutas como
   `"/images/products/casco.jpg"`.

## Reglas de negocio importantes

- **No hay inventario**: los productos son informativos; el vendedor confirma disponibilidad por
  WhatsApp.
- **Delivery**: si el subtotal es menor a `freeDeliveryMinimum` (S/ 1,000 por defecto), el sistema
  muestra "Por coordinar — desde S/ 5.00" y **no** suma ese monto al total. Si el subtotal es
  igual o mayor, el delivery se muestra como "GRATIS".
- **Número de pedido**: se genera localmente (`PED-000001`, `PED-000002`, ...) usando un contador
  guardado en `localStorage` del navegador del cliente. No requiere backend.
- **Carrito**: se guarda en `localStorage` para no perderse al recargar la página.

## Flujo de compra

Explorar productos → Detalle (elegir color/talla si aplica) → Carrito → Datos de entrega →
Nota de pedido → Generar imagen PNG → Guardar imagen → Abrir WhatsApp (mensaje ya redactado) →
el cliente adjunta la imagen manualmente en el chat.

## Estructura del proyecto

```
src/
├── components/    Componentes de UI reutilizables
├── config/        Configuración centralizada de la empresa
├── data/          Productos y categorías (edítalos aquí)
├── pages/         Páginas: Home, Products, ProductDetailPage, Checkout
├── store/         Estado global del carrito (Zustand + localStorage)
└── utils/         WhatsApp, delivery, número de pedido, formato de moneda
```
