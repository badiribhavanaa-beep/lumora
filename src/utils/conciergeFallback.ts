import { INITIAL_PRODUCTS, EDITORIAL_ARTICLES } from '../data/products';

export function getLocalConciergeResponse(userMessage: string): string {
  const query = userMessage.toLowerCase();

  // 1. Discount / Coupons / Promo
  if (query.includes('promo') || query.includes('discount') || query.includes('coupon') || query.includes('code') || query.includes('sale') || query.includes('offer')) {
    return `We currently have two active courtesies for our patrons:

• **WELCOME15** — Grants 15% off your entire order (welcome gift for new subscribers).
• **LUMORA10** — Grants 10% off any order.

You can enter either code directly in your shopping bag or during checkout. We also provide complimentary worldwide insured shipping on all orders over $150.`;
  }

  // 2. Shipping & Delivery
  if (query.includes('shipping') || query.includes('delivery') || query.includes('courier') || query.includes('dispatch') || query.includes('track')) {
    return `Here are LUMORA's delivery arrangements:

• **Complimentary Shipping**: On all worldwide orders over **$150**.
• **Standard Insured Courier**: $15 for orders below $150 (delivered in 3–5 business days via carbon-neutral transit).
• **Express Priority Air**: $25 (delivered in 1–2 business days with required signature).
• **Global Reach**: We ship with full insurance to 42 countries worldwide. Tracking links are provided immediately upon studio dispatch.`;
  }

  // 3. Returns, Warranty, Trial
  if (query.includes('return') || query.includes('warranty') || query.includes('trial') || query.includes('refund') || query.includes('exchange')) {
    return `We believe objects must harmonize with your living space:

• **30-Day In-Home Trial**: Live with your selected piece for 30 days. If it does not resonate with your space, enjoy seamless prepaid returns.
• **Prepaid Return Slip**: Included in every dispatch box.
• **2-Year Lumora Comprehensive Care**: Covers all craftsmanship and hardware integrity. For any care requests, contact concierge@lumora.studio.`;
  }

  // 4. Desk / Workspace / Focus / Office
  if (query.includes('desk') || query.includes('workspace') || query.includes('work') || query.includes('office') || query.includes('study') || query.includes('focus')) {
    return `For an intentional, calm, and distraction-free workspace, we curate this essential trio:

1. **Aura Studio Wireless Headphones** ($320) — CNC matte aluminum monitors with 40mm bio-cellulose drivers, 42-hour battery life, and spatial transparency.
2. **Architectural Felt & Cork Desk Pad** ($52) — Water-resistant German pressed merino wool with Portuguese cork base to absorb acoustic reverberations.
3. **Precision Solid Titanium Desk Pen** ($88) — Monolithic aerospace Grade 5 titanium with balanced magnetic docking base.

Together, they transform any surface into an acoustic sanctuary.`;
  }

  // 5. Lamp / Lighting / Travertine
  if (query.includes('lamp') || query.includes('light') || query.includes('travertine') || query.includes('kanso') || query.includes('illumination')) {
    const lamp = INITIAL_PRODUCTS.find(p => p.id === 'lumora-lamp-travertine');
    return `The **Kanso Travertine Ceramic Lamp** ($185, regular $220) is hand-turned by master artisans in Portugal:

• Base: Solid honed natural travertine stone with unique organic veining.
• Shade: Hand-woven Belgian linen that produces a calming 2700K golden glow.
• Hardware: Brass inline dimmer switch with a 72" braided cotton cord.
• Dimensions: 14.5" H × 9.8" Dia (6.4 lbs).

It is designed specifically to replace harsh overhead fixtures with grounding evening ambiance.`;
  }

  // 6. Bag / Tote / Leather
  if (query.includes('bag') || query.includes('tote') || query.includes('leather') || query.includes('wallet') || query.includes('carry')) {
    return `Our leather pieces are crafted in Florence and Tuscany using certified vegetable-tanned cowhide that develops a rich golden patina:

• **Atelier Vegetable-Tanned Leather Tote** ($245, regular $290) — Dedicated padded sleeve for up to a 16" MacBook Pro, twin magnetic quick pockets, and sand-cast solid brass hardware.
• **Bifold Card Sleeve with Money Clip** ($65) — Ultra-slim front-pocket profile with Faraday RFID protection, spring currency clip, and space for 6–8 cards.`;
  }

  // 7. Scents / Fragrance / Diffuser / Beauty / Face Oil
  if (query.includes('scent') || query.includes('diffuser') || query.includes('hinoki') || query.includes('perfume') || query.includes('beauty') || query.includes('oil') || query.includes('skin') || query.includes('face')) {
    return `Our botanical self-care formulations are 100% plant-derived and non-toxic:

• **Hinoki & Cedarwood Botanical Diffuser** ($58) — Wild Japanese cypress, Moroccan cedar, and vetiver root in apothecary amber glass with 8 black rattan reeds. Lasts 4–6 months.
• **Cellular Botanical Recovery Face Oil** ($68) — Organic Chilean cold-pressed rosehip seed, sugarcane squalane, and soothing blue tansy. Fast-absorbing dry finish for all skin types.`;
  }

  // 8. Clothing / Fashion / Linen / Merino / Wear
  if (query.includes('linen') || query.includes('merino') || query.includes('shirt') || query.includes('knit') || query.includes('clothes') || query.includes('wear') || query.includes('size')) {
    return `Our apparel collection embraces natural fiber longevity and seamless comfort:

• **Raw Heavy Linen Utility Overshirt** ($160, regular $190) — 280 GSM pure French Normandy flax with unpolished natural tagua nut corozo buttons.
• **Fine Gauge Extrafine Merino Crewneck** ($175, regular $210) — 19.5-micron non-mulesed wool 3D-knitted seamlessly on Japanese Shima Seiki machinery (zero itchy seams).`;
  }

  // 9. Home & Coffee / Living
  if (query.includes('home') || query.includes('coffee') || query.includes('dripper') || query.includes('blanket') || query.includes('throw')) {
    return `For intentional home living:

• **Barista Matte Ceramic Dripper Set** ($74) — Precision 60° stoneware extraction cone with 600ml heat-resistant borosilicate server (Mino, Japan).
• **Waffled Washed Belgian Linen Throw** ($135, regular $165) — Pre-softened with volcanic stones, generous 55" × 78" honeycomb drape with raw fringed borders.`;
  }

  // 10. General / Greeting / Fallback
  return `Thank you for consulting LUMORA. We curate objects of enduring material honesty across 5 disciplines:

• **Home & Living** (Travertine lighting, Belgian linen throws, stoneware)
• **Leather & Accessories** (Tuscan vegetable-tanned totes, RFID card sleeves)
• **Tech Essentials** (Aura studio monitors, wool felt desk pads, titanium pens)
• **Fashion & Knitwear** (French flax overshirts, 3D seamless merino knits)
• **Beauty & Wellness** (Hinoki apothecary diffusers, botanical face oils)

May I recommend a specific piece for your home, workspace, or wardrobe?`;
}
