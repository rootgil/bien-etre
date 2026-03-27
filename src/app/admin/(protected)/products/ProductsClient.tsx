"use client";

import { useState } from "react";
import {
  Pencil,
  ToggleLeft,
  ToggleRight,
  Plus,
  Search,
  X,
  Check,
  Package,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import type { Product } from "@/types";

interface ProductsClientProps {
  initialProducts: Product[];
}

const CATEGORIES = [
  "hygiene-bucco-dentaire",
  "soin-corps",
  "soin-visage",
  "complement-alimentaire",
  "parfumerie",
  "autre",
];

const EMPTY_FORM = {
  nameFr: "",
  nameEn: "",
  priceEUR: "",
  category: CATEGORIES[0],
  descFr: "",
  imageUrl: "",
  stock: true,
  featured: false,
};

type AddForm = typeof EMPTY_FORM;

export function ProductsClient({ initialProducts }: ProductsClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [toast, setToast] = useState<string | null>(null);

  // Add modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<AddForm>(EMPTY_FORM);
  const [addErrors, setAddErrors] = useState<Partial<Record<keyof AddForm, string>>>({});

  // Delete confirmation
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  const filtered = products.filter(
    (p) =>
      p.name.fr.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  function toggleStock(id: string) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: !p.stock } : p))
    );
    showToast("Stock mis à jour (simulation)");
  }

  function toggleFeatured(id: string) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
    showToast("Mise en avant modifiée (simulation)");
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setEditForm({
      name: { ...product.name },
      priceEUR: product.priceEUR,
      category: product.category,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  function saveEdit(id: string) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              name: (editForm.name as Product["name"]) ?? p.name,
              priceEUR: editForm.priceEUR ?? p.priceEUR,
              category: editForm.category ?? p.category,
            }
          : p
      )
    );
    setEditingId(null);
    setEditForm({});
    showToast("Produit modifié (simulation - non persisté)");
  }

  // ── Add product ────────────────────────────────────────────────────────────

  function validateAdd(): boolean {
    const errs: Partial<Record<keyof AddForm, string>> = {};
    if (!addForm.nameFr.trim()) errs.nameFr = "Requis";
    if (!addForm.nameEn.trim()) errs.nameEn = "Requis";
    if (!addForm.priceEUR || isNaN(Number(addForm.priceEUR)) || Number(addForm.priceEUR) < 0)
      errs.priceEUR = "Prix invalide";
    setAddErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function submitAdd() {
    if (!validateAdd()) return;
    const slug = addForm.nameFr
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug,
      category: addForm.category,
      priceEUR: Number(addForm.priceEUR),
      images: addForm.imageUrl ? [addForm.imageUrl] : [],
      featured: addForm.featured,
      stock: addForm.stock,
      name: { fr: addForm.nameFr.trim(), en: addForm.nameEn.trim() },
      description: { fr: addForm.descFr.trim(), en: "" },
      shortDescription: { fr: "", en: "" },
      benefits: { fr: [], en: [] },
    };
    setProducts((prev) => [newProduct, ...prev]);
    setShowAddModal(false);
    setAddForm(EMPTY_FORM);
    setAddErrors({});
    showToast("Produit ajouté (simulation - non persisté)");
  }

  // ── Delete product ─────────────────────────────────────────────────────────

  function confirmDelete(id: string) {
    setDeleteId(id);
  }

  function executeDelete() {
    if (!deleteId) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    showToast("Produit supprimé (simulation)");
  }

  return (
    <div className="space-y-4">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-3 text-sm text-white shadow-xl">
          <Check className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            placeholder="Rechercher un produit…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-100 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-500 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Ajouter un produit
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-100 bg-white">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-zinc-400">
            <Package className="h-8 w-8" />
            <p className="text-sm">Aucun produit trouvé</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/60">
                <th className="px-4 py-3 text-left font-medium text-zinc-500">Produit</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-500">Catégorie</th>
                <th className="px-4 py-3 text-right font-medium text-zinc-500">Prix</th>
                <th className="px-4 py-3 text-center font-medium text-zinc-500">Stock</th>
                <th className="px-4 py-3 text-center font-medium text-zinc-500">Vedette</th>
                <th className="px-4 py-3 text-center font-medium text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => {
                const isEditing = editingId === product.id;
                return (
                  <tr
                    key={product.id}
                    className={`${i < filtered.length - 1 ? "border-b border-zinc-50" : ""} hover:bg-zinc-50 transition-colors`}
                  >
                    {/* Name */}
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          value={(editForm.name as Product["name"])?.fr ?? ""}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              name: {
                                fr: e.target.value,
                                en: (f.name as Product["name"])?.en ?? "",
                              },
                            }))
                          }
                          className="w-full rounded border border-emerald-300 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      ) : (
                        <div>
                          <p className="font-medium text-zinc-800">{product.name.fr}</p>
                          <p className="text-xs text-zinc-400 font-mono">{product.slug}</p>
                        </div>
                      )}
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          value={editForm.category ?? ""}
                          onChange={(e) =>
                            setEditForm((f) => ({ ...f, category: e.target.value }))
                          }
                          className="w-full rounded border border-emerald-300 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      ) : (
                        <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600">
                          {product.category}
                        </span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 text-right">
                      {isEditing ? (
                        <input
                          type="number"
                          min={0}
                          value={editForm.priceEUR ?? ""}
                          onChange={(e) =>
                            setEditForm((f) => ({ ...f, priceEUR: Number(e.target.value) }))
                          }
                          className="w-20 rounded border border-emerald-300 px-2 py-1 text-sm text-right outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      ) : (
                        <span className="font-semibold text-zinc-800">{product.priceEUR} €</span>
                      )}
                    </td>

                    {/* Stock toggle */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleStock(product.id)}
                        title={product.stock ? "En stock" : "Rupture"}
                      >
                        {product.stock ? (
                          <ToggleRight className="h-6 w-6 text-emerald-500" />
                        ) : (
                          <ToggleLeft className="h-6 w-6 text-zinc-300" />
                        )}
                      </button>
                    </td>

                    {/* Featured toggle */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleFeatured(product.id)}
                        title={product.featured ? "En vedette" : "Non vedette"}
                      >
                        {product.featured ? (
                          <ToggleRight className="h-6 w-6 text-amber-500" />
                        ) : (
                          <ToggleLeft className="h-6 w-6 text-zinc-300" />
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => saveEdit(product.id)}
                              className="flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500 transition-colors"
                            >
                              <Check className="h-3.5 w-3.5" />
                              Sauver
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="flex items-center gap-1 rounded-md border border-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
                            >
                              <X className="h-3.5 w-3.5" />
                              Annuler
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(product)}
                              className="flex items-center gap-1 rounded-md border border-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Modifier
                            </button>
                            <button
                              onClick={() => confirmDelete(product.id)}
                              className="flex items-center gap-1 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Supprimer
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-zinc-400 text-center">
        Les modifications sont simulées en mémoire et seront perdues au rechargement.
      </p>

      {/* ── Add product modal ───────────────────────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
              <h2 className="text-base font-semibold text-zinc-800">Ajouter un produit</h2>
              <button
                onClick={() => { setShowAddModal(false); setAddForm(EMPTY_FORM); setAddErrors({}); }}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 px-6 py-5">
              {/* Name FR / EN */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-600">Nom (FR) *</label>
                  <input
                    value={addForm.nameFr}
                    onChange={(e) => setAddForm((f) => ({ ...f, nameFr: e.target.value }))}
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 ${addErrors.nameFr ? "border-red-400" : "border-zinc-100"}`}
                    placeholder="Ex : Crème hydratante"
                  />
                  {addErrors.nameFr && <p className="mt-0.5 text-xs text-red-500">{addErrors.nameFr}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-600">Nom (EN) *</label>
                  <input
                    value={addForm.nameEn}
                    onChange={(e) => setAddForm((f) => ({ ...f, nameEn: e.target.value }))}
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 ${addErrors.nameEn ? "border-red-400" : "border-zinc-100"}`}
                    placeholder="Ex: Moisturizing cream"
                  />
                  {addErrors.nameEn && <p className="mt-0.5 text-xs text-red-500">{addErrors.nameEn}</p>}
                </div>
              </div>

              {/* Price + Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-600">Prix (€) *</label>
                  <input
                    type="number"
                    min={0}
                    value={addForm.priceEUR}
                    onChange={(e) => setAddForm((f) => ({ ...f, priceEUR: e.target.value }))}
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 ${addErrors.priceEUR ? "border-red-400" : "border-zinc-100"}`}
                    placeholder="0"
                  />
                  {addErrors.priceEUR && <p className="mt-0.5 text-xs text-red-500">{addErrors.priceEUR}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-600">Catégorie</label>
                  <select
                    value={addForm.category}
                    onChange={(e) => setAddForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full rounded-lg border border-zinc-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description FR */}
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-600">Description (FR)</label>
                <textarea
                  rows={3}
                  value={addForm.descFr}
                  onChange={(e) => setAddForm((f) => ({ ...f, descFr: e.target.value }))}
                  className="w-full rounded-lg border border-zinc-100 px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Description du produit…"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-600">URL image principale</label>
                <input
                  value={addForm.imageUrl}
                  onChange={(e) => setAddForm((f) => ({ ...f, imageUrl: e.target.value }))}
                  className="w-full rounded-lg border border-zinc-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="https://…"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setAddForm((f) => ({ ...f, stock: !f.stock }))}
                    className="inline-flex"
                  >
                    {addForm.stock ? (
                      <ToggleRight className="h-6 w-6 text-emerald-500" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-zinc-300" />
                    )}
                  </button>
                  <span className="text-sm text-zinc-600">En stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setAddForm((f) => ({ ...f, featured: !f.featured }))}
                    className="inline-flex"
                  >
                    {addForm.featured ? (
                      <ToggleRight className="h-6 w-6 text-amber-500" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-zinc-300" />
                    )}
                  </button>
                  <span className="text-sm text-zinc-600">Produit vedette</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-zinc-100 px-6 py-4">
              <button
                onClick={() => { setShowAddModal(false); setAddForm(EMPTY_FORM); setAddErrors({}); }}
                className="rounded-lg border border-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={submitAdd}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirmation modal ───────────────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="font-semibold text-zinc-800">Supprimer ce produit ?</p>
                <p className="text-xs text-zinc-400">Cette action est irréversible (simulation).</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={executeDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
