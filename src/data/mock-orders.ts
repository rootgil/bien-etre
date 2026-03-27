export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface MockOrder {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  country: string;
  currency: string;
  totalEUR: number;
  status: OrderStatus;
  items: { productId: string; productName: string; quantity: number; priceEUR: number }[];
}

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ORD-2026-001",
    createdAt: "2026-03-25T09:14:32Z",
    customerName: "Aminata Diallo",
    customerEmail: "aminata.diallo@email.com",
    country: "SN",
    currency: "XOF",
    totalEUR: 33,
    status: "delivered",
    items: [
      { productId: "parfum-bouche-hi-smile", productName: "Parfum de bouche Hi Smile", quantity: 1, priceEUR: 11 },
      { productId: "perfect-x", productName: "Perfect X", quantity: 1, priceEUR: 22 },
    ],
  },
  {
    id: "ORD-2026-002",
    createdAt: "2026-03-24T14:30:00Z",
    customerName: "Moussa Konaté",
    customerEmail: "moussa.konate@email.com",
    country: "CI",
    currency: "XOF",
    totalEUR: 22,
    status: "shipped",
    items: [
      { productId: "perfect-x", productName: "Perfect X", quantity: 1, priceEUR: 22 },
    ],
  },
  {
    id: "ORD-2026-003",
    createdAt: "2026-03-23T11:05:17Z",
    customerName: "Fatou Ndiaye",
    customerEmail: "fatou.ndiaye@email.com",
    country: "SN",
    currency: "XOF",
    totalEUR: 22,
    status: "confirmed",
    items: [
      { productId: "perfect-x", productName: "Perfect X", quantity: 1, priceEUR: 22 },
    ],
  },
  {
    id: "ORD-2026-004",
    createdAt: "2026-03-22T08:50:41Z",
    customerName: "Ibrahim Touré",
    customerEmail: "ibrahim.toure@email.com",
    country: "GN",
    currency: "GNF",
    totalEUR: 11,
    status: "delivered",
    items: [
      { productId: "parfum-bouche-hi-smile", productName: "Parfum de bouche Hi Smile", quantity: 1, priceEUR: 11 },
    ],
  },
  {
    id: "ORD-2026-005",
    createdAt: "2026-03-21T16:20:09Z",
    customerName: "Marie Dupont",
    customerEmail: "marie.dupont@email.com",
    country: "FR",
    currency: "EUR",
    totalEUR: 44,
    status: "delivered",
    items: [
      { productId: "perfect-x", productName: "Perfect X", quantity: 2, priceEUR: 22 },
    ],
  },
  {
    id: "ORD-2026-006",
    createdAt: "2026-03-20T10:33:55Z",
    customerName: "Oumar Baldé",
    customerEmail: "oumar.balde@email.com",
    country: "GN",
    currency: "GNF",
    totalEUR: 33,
    status: "pending",
    items: [
      { productId: "parfum-bouche-hi-smile", productName: "Parfum de bouche Hi Smile", quantity: 1, priceEUR: 11 },
      { productId: "perfect-x", productName: "Perfect X", quantity: 1, priceEUR: 22 },
    ],
  },
  {
    id: "ORD-2026-007",
    createdAt: "2026-03-19T13:45:22Z",
    customerName: "Ndeye Seck",
    customerEmail: "ndeye.seck@email.com",
    country: "SN",
    currency: "XOF",
    totalEUR: 11,
    status: "cancelled",
    items: [
      { productId: "parfum-bouche-hi-smile", productName: "Parfum de bouche Hi Smile", quantity: 1, priceEUR: 11 },
    ],
  },
  {
    id: "ORD-2026-008",
    createdAt: "2026-03-18T09:10:00Z",
    customerName: "Kwame Mensah",
    customerEmail: "kwame.mensah@email.com",
    country: "GH",
    currency: "GHS",
    totalEUR: 66,
    status: "delivered",
    items: [
      { productId: "perfect-x", productName: "Perfect X", quantity: 3, priceEUR: 22 },
    ],
  },
  {
    id: "ORD-2026-009",
    createdAt: "2026-03-17T15:00:00Z",
    customerName: "Sophie Martin",
    customerEmail: "sophie.martin@email.com",
    country: "BE",
    currency: "EUR",
    totalEUR: 33,
    status: "shipped",
    items: [
      { productId: "parfum-bouche-hi-smile", productName: "Parfum de bouche Hi Smile", quantity: 1, priceEUR: 11 },
      { productId: "perfect-x", productName: "Perfect X", quantity: 1, priceEUR: 22 },
    ],
  },
  {
    id: "ORD-2026-010",
    createdAt: "2026-03-16T07:55:30Z",
    customerName: "Aissatou Barry",
    customerEmail: "aissatou.barry@email.com",
    country: "ML",
    currency: "XOF",
    totalEUR: 22,
    status: "confirmed",
    items: [
      { productId: "perfect-x", productName: "Perfect X", quantity: 1, priceEUR: 22 },
    ],
  },
];

export function getOrderStats() {
  const total = MOCK_ORDERS.length;
  const delivered = MOCK_ORDERS.filter((o) => o.status === "delivered").length;
  const pending = MOCK_ORDERS.filter((o) => o.status === "pending" || o.status === "confirmed").length;
  const cancelled = MOCK_ORDERS.filter((o) => o.status === "cancelled").length;
  const revenue = MOCK_ORDERS.filter((o) => o.status !== "cancelled").reduce(
    (sum, o) => sum + o.totalEUR,
    0
  );
  return { total, delivered, pending, cancelled, revenue };
}
