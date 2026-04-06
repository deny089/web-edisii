"use client";

import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";

type ArtworkItem = {
  id: string;
  title: string;
  artist: string;
  edition: string;
  year: string;
  url: string;
  status: "Draft" | "Published";
};

const initialItems: ArtworkItem[] = [
  {
    id: "art-001",
    title: "Wednesday - Knifmare",
    artist: "Heri Dono",
    edition: "1/7",
    year: "2026",
    url: "/cert-art?code=12asd12s",
    status: "Published",
  },
  {
    id: "art-002",
    title: "Blue Field Notes",
    artist: "Ykha Amelz",
    edition: "3/12",
    year: "2025",
    url: "/cert-art?code=77lkp20q",
    status: "Draft",
  },
  {
    id: "art-003",
    title: "Quiet Surface",
    artist: "Indieguerillas",
    edition: "2/10",
    year: "2025",
    url: "/cert-art?code=9qwe45zx",
    status: "Published",
  },
  {
    id: "art-004",
    title: "Echoes of Stone",
    artist: "Tromarama",
    edition: "5/9",
    year: "2024",
    url: "/cert-art?code=3lmn88op",
    status: "Draft",
  },
];

type FormState = {
  title: string;
  artist: string;
  edition: string;
  year: string;
  url: string;
  status: ArtworkItem["status"];
};

const emptyForm: FormState = {
  title: "",
  artist: "",
  edition: "",
  year: "",
  url: "/cert-art?code=12asd12s",
  status: "Draft",
};

export function ArtworkCrud() {
  const [items, setItems] = useState<ArtworkItem[]>(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingItem, setDeletingItem] = useState<ArtworkItem | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const formPanelRef = useRef<HTMLDivElement | null>(null);

  const isEditing = Boolean(editingId);

  const summary = useMemo(() => {
    const published = items.filter((item) => item.status === "Published").length;
    const drafts = items.length - published;

    return { total: items.length, published, drafts };
  }, [items]);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const scrollToForm = () => {
    if (typeof window === "undefined" || window.innerWidth >= 768) {
      return;
    }

    requestAnimationFrame(() => {
      const header = document.getElementById("admin-header");
      const headerOffset = header ? header.getBoundingClientRect().height + 16 : 88;
      const formTop = formPanelRef.current
        ? formPanelRef.current.getBoundingClientRect().top + window.scrollY
        : 0;

      window.scrollTo({
        top: Math.max(formTop - headerOffset, 0),
        behavior: "smooth",
      });
    });
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim() || !form.artist.trim() || !form.edition.trim() || !form.year.trim()) {
      return;
    }

    if (editingId) {
      setItems((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...form,
              }
            : item
        )
      );
      resetForm();
      return;
    }

    setItems((current) => [
      {
        id: `art-${Date.now()}`,
        ...form,
      },
      ...current,
    ]);
    resetForm();
  };

  const handleEdit = (item: ArtworkItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      artist: item.artist,
      edition: item.edition,
      year: item.year,
      url: item.url,
      status: item.status,
    });
  };

  const confirmDelete = () => {
    if (!deletingItem) {
      return;
    }

    setItems((current) => current.filter((item) => item.id !== deletingItem.id));
    if (editingId === deletingItem.id) {
      resetForm();
    }
    setDeletingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-2 min-[360px]:grid-cols-3 sm:flex sm:flex-wrap sm:gap-3">
        <article className="min-w-0 rounded-none border border-slate-200 bg-slate-50 px-3 py-3 sm:min-w-[140px] sm:px-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Total Items</p>
          <p className="mt-2 text-[22px] font-semibold leading-none text-slate-950 sm:text-[24px]">{summary.total}</p>
        </article>
        <article className="min-w-0 rounded-none border border-slate-200 bg-slate-50 px-3 py-3 sm:min-w-[140px] sm:px-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Published</p>
          <p className="mt-2 text-[22px] font-semibold leading-none text-slate-950 sm:text-[24px]">{summary.published}</p>
        </article>
        <article className="min-w-0 rounded-none border border-slate-200 bg-slate-50 px-3 py-3 sm:min-w-[140px] sm:px-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Drafts</p>
          <p className="mt-2 text-[22px] font-semibold leading-none text-slate-950 sm:text-[24px]">{summary.drafts}</p>
        </article>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_420px]">
        <div className="rounded-none border border-slate-200 bg-white">
          <div className="flex flex-col items-start gap-4 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">List</p>
              <h3 className="mt-2 text-[22px] font-semibold leading-none text-slate-950">Artwork Entries</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                resetForm();
                scrollToForm();
              }}
              className="inline-flex min-h-10 w-full items-center justify-center rounded-none border border-slate-300 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
            >
              New Entry
            </button>
          </div>

          <div className="max-h-[420px] space-y-3 overflow-y-auto p-4 sm:max-h-[520px] sm:p-5">
            {items.map((item) => (
              <article
                key={item.id}
                className={cn(
                  "rounded-none border px-3 py-3 transition-colors",
                  editingId === item.id ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white"
                )}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-[18px] font-semibold leading-none text-slate-950">{item.title}</h4>
                      <span
                        className={cn(
                          "rounded-none px-2.5 py-1 text-[10px] uppercase tracking-[0.1em]",
                          item.status === "Published"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        )}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-2 grid gap-1 text-[12px] text-slate-600 sm:text-[13px]">
                      <p>Artist: {item.artist}</p>
                      <p>Edition: {item.edition} - Year: {item.year}</p>
                      <p className="break-all">URL: {item.url}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="inline-flex min-h-9 items-center justify-center rounded-none border border-slate-300 bg-white px-3 py-2 text-[12px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingItem(item)}
                      className="inline-flex min-h-9 items-center justify-center rounded-none border border-rose-200 bg-rose-50 px-3 py-2 text-[12px] font-medium text-rose-600 transition-colors hover:bg-rose-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div ref={formPanelRef} className="rounded-none border border-slate-200 bg-white p-4 sm:p-5">
          <div className="border-b border-slate-200 pb-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Form</p>
            <h3 className="mt-2 text-[22px] font-semibold leading-none text-slate-950">
              {isEditing ? "Edit Artwork" : "Create Artwork"}
            </h3>
          </div>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <label className="grid gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Title</span>
              <input
                value={form.title}
                onChange={(event) => handleChange("title", event.target.value)}
                className="min-h-11 rounded-none border border-slate-300 bg-white px-4 text-[14px] outline-none transition-colors focus:border-slate-900"
                placeholder="Artwork title"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Artist</span>
              <input
                value={form.artist}
                onChange={(event) => handleChange("artist", event.target.value)}
                className="min-h-11 rounded-none border border-slate-300 bg-white px-4 text-[14px] outline-none transition-colors focus:border-slate-900"
                placeholder="Artist name"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Edition</span>
                <input
                  value={form.edition}
                  onChange={(event) => handleChange("edition", event.target.value)}
                  className="min-h-11 rounded-none border border-slate-300 bg-white px-4 text-[14px] outline-none transition-colors focus:border-slate-900"
                  placeholder="1/7"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Year</span>
                <input
                  value={form.year}
                  onChange={(event) => handleChange("year", event.target.value)}
                  className="min-h-11 rounded-none border border-slate-300 bg-white px-4 text-[14px] outline-none transition-colors focus:border-slate-900"
                  placeholder="2026"
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-slate-500">URL</span>
              <input
                value={form.url}
                onChange={(event) => handleChange("url", event.target.value)}
                className="min-h-11 rounded-none border border-slate-300 bg-white px-4 text-[14px] outline-none transition-colors focus:border-slate-900"
                placeholder="/cert-art?code=12asd12s"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Status</span>
              <select
                value={form.status}
                onChange={(event) => handleChange("status", event.target.value as ArtworkItem["status"])}
                className="min-h-11 rounded-none border border-slate-300 bg-white px-4 text-[14px] outline-none transition-colors focus:border-slate-900"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </label>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center rounded-none bg-slate-900 px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-slate-800"
              >
                {isEditing ? "Save Changes" : "Create Item"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex min-h-11 items-center justify-center rounded-none border border-slate-300 bg-white px-5 py-3 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {deletingItem ? (
        <Modal
          onClose={() => setDeletingItem(null)}
          overlayClassName="bg-slate-950/40"
          containerClassName="overflow-y-auto"
          contentClassName="w-full max-w-[380px] rounded-none border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.2)] sm:p-6"
        >
          <p className="text-[12px] uppercase tracking-[0.16em] text-slate-500">Delete Artwork</p>
          <h3 className="mt-3 text-[24px] font-semibold leading-none text-slate-950">Remove this item?</h3>
          <p className="mt-4 text-[14px] leading-relaxed text-slate-600">
            You are about to delete <span className="font-medium text-slate-900">{deletingItem.title}</span>. This action cannot be undone in this demo state.
          </p>
          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <button
              type="button"
              onClick={confirmDelete}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-none bg-rose-600 px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-rose-700 sm:w-auto"
            >
              Yes, Delete
            </button>
            <button
              type="button"
              onClick={() => setDeletingItem(null)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-none border border-slate-300 bg-white px-5 py-3 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
