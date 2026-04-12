"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import type { ArtworkFormPayload, ArtworkItem } from "@/types/artwork";

type FormState = {
  title: string;
  artist: string;
  edition: string;
  year: string;
  url: string;
  status: ArtworkFormPayload["status"];
};

const emptyForm: FormState = {
  title: "",
  artist: "",
  edition: "",
  year: "",
  url: "",
  status: "Draft",
};

const ITEMS_PER_PAGE = 10;

export function ArtworkCrud() {
  const [items, setItems] = useState<ArtworkItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingItem, setDeletingItem] = useState<ArtworkItem | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isEditing = Boolean(editingId);

  const summary = useMemo(() => {
    const published = items.filter((item) => item.status === "Published").length;
    const drafts = items.length - published;

    return { total: items.length, published, drafts };
  }, [items]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return items;
    }

    return items.filter((item) =>
      [
        item.id.toString(),
        item.publicCode,
        item.title,
        item.artist,
        item.edition,
        item.year,
        item.url,
        item.status,
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [items, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredItems]);

  const loadItems = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/admin/artworks", { cache: "no-store" });
      const payload = (await response.json()) as { items?: ArtworkItem[]; error?: string };

      if (!response.ok || !payload.items) {
        throw new Error(payload.error || "Failed to load artworks");
      }

      setItems(payload.items);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to load artworks");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const openCreateModal = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    resetForm();
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const currentPreviewUrl = isEditing ? form.url : "Generated automatically after save";

  const handleExport = () => {
    const rows = filteredItems
      .map(
        (item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td>${item.artist}</td>
            <td>${item.edition}</td>
            <td>${item.year}</td>
            <td>${item.url}</td>
            <td>${item.status}</td>
          </tr>
        `
      )
      .join("");

    const table = `
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Edition</th>
            <th>Year</th>
            <th>URL</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;

    const blob = new Blob([table], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `artwork-list-${date}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void (async () => {
      if (!form.title.trim() || !form.artist.trim() || !form.edition.trim() || !form.year.trim()) {
        return;
      }

      setIsSaving(true);
      setErrorMessage(null);

      try {
        const payload = {
          title: form.title.trim(),
          artist: form.artist.trim(),
          edition: form.edition.trim(),
          year: form.year.trim(),
          url: form.url.trim(),
          status: form.status,
        };

        if (editingId) {
          const response = await fetch("/api/admin/artworks", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: editingId,
              ...payload,
            }),
          });

          const result = (await response.json()) as { item?: ArtworkItem; error?: string };

          if (!response.ok || !result.item) {
            throw new Error(result.error || "Failed to update artwork");
          }

          setItems((current) => current.map((item) => (item.id === editingId ? result.item! : item)));
          closeFormModal();
          return;
        }

        const response = await fetch("/api/admin/artworks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = (await response.json()) as { item?: ArtworkItem; error?: string };

        if (!response.ok || !result.item) {
          throw new Error(result.error || "Failed to create artwork");
        }

        setItems((current) => [result.item!, ...current]);
        setCurrentPage(1);
        closeFormModal();
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Failed to save artwork");
      } finally {
        setIsSaving(false);
      }
    })();
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
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingItem) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/admin/artworks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: deletingItem.id,
        }),
      });

      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to delete artwork");
      }

      setItems((current) => current.filter((item) => item.id !== deletingItem.id));
      if (editingId === deletingItem.id) {
        closeFormModal();
      }
      setDeletingItem(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to delete artwork");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full space-y-6">
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

      <div className="w-full rounded-none border border-slate-200 bg-white">
        <div className="flex flex-col items-start gap-4 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">List</p>
            <h3 className="mt-2 text-[22px] font-semibold leading-none text-slate-950">Artwork Entries</h3>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-none border border-slate-300 bg-white px-5 py-3 text-[13px] font-medium uppercase tracking-[0.12em] text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto sm:px-6"
              >
                Export XLS
              </button>
              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-none bg-slate-950 px-5 py-3 text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-slate-800 sm:w-auto sm:px-6"
              >
                New Entry
              </button>
            </div>
            <p className="text-[11px] leading-none text-slate-500 sm:text-right">Create a new certificate artwork entry</p>
          </div>
        </div>

        <div className="space-y-3 p-4 sm:p-5">
          {errorMessage ? (
            <div className="border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-700">
              {errorMessage}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="w-full max-w-[420px]">
              <span className="sr-only">Search artwork entries</span>
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="min-h-11 w-full rounded-none border border-slate-300 bg-white px-4 text-[14px] outline-none transition-colors focus:border-slate-900"
                placeholder="Search by ID, code, title, artist, edition, year, URL, or status"
              />
            </label>
            <p className="text-[12px] text-slate-500">
              {filteredItems.length} result{filteredItems.length === 1 ? "" : "s"}
            </p>
          </div>

          {isLoading ? (
            <div className="border border-slate-200 bg-slate-50 px-4 py-10 text-center text-[14px] text-slate-500">
              Loading artwork entries...
            </div>
          ) : null}

          {!isLoading ? (
          <div className="overflow-x-auto border border-slate-200">
            <table className="min-w-[980px] w-full border-collapse">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">No.</th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">Title</th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">Artist</th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">Edition</th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">Year</th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">URL</th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">Status</th>
                  <th className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={cn(
                      "border-b border-slate-200 align-top transition-colors",
                      editingId === item.id ? "bg-slate-50" : "bg-white"
                    )}
                  >
                    <td className="px-4 py-4 text-[13px] font-medium text-slate-500">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="px-4 py-4 text-[14px] font-medium text-slate-950">{item.title}</td>
                    <td className="px-4 py-4 text-[13px] text-slate-700">{item.artist}</td>
                    <td className="px-4 py-4 text-[13px] text-slate-700">{item.edition}</td>
                    <td className="px-4 py-4 text-[13px] text-slate-700">{item.year}</td>
                    <td className="max-w-[220px] px-4 py-4 text-[13px] text-slate-700">
                      <span className="block break-all">{item.url}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-none px-2.5 py-1 text-[10px] uppercase tracking-[0.1em]",
                          item.status === "Published"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="inline-flex min-h-10 items-center justify-center rounded-none border border-slate-300 bg-white px-4 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingItem(item)}
                          className="inline-flex min-h-10 items-center justify-center rounded-none border border-rose-200 bg-rose-50 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-rose-600 transition-colors hover:bg-rose-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedItems.length === 0 ? (
                  <tr className="border-b border-slate-200 bg-white">
                    <td colSpan={7} className="px-4 py-10 text-center text-[14px] text-slate-500">
                      No artwork entries found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          ) : null}

          {!isLoading ? (
          <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-slate-500">
              {filteredItems.length > 0
                ? `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} of ${filteredItems.length} items`
                : "No items available"}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="inline-flex min-h-10 items-center justify-center rounded-none border border-slate-300 bg-white px-4 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <div className="inline-flex min-h-10 items-center justify-center border border-slate-200 bg-slate-50 px-4 text-[12px] font-medium text-slate-700">
                Page {currentPage} / {totalPages}
              </div>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex min-h-10 items-center justify-center rounded-none border border-slate-300 bg-white px-4 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
          ) : null}
        </div>
      </div>

      {isFormOpen ? (
        <Modal
          onClose={closeFormModal}
          overlayClassName="bg-slate-950/40"
          containerClassName="overflow-y-auto"
          contentClassName="w-full max-w-[620px] rounded-none border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.2)] sm:p-6"
        >
          <div className="border-b border-slate-200 pb-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Artwork Form</p>
            <h3 className="mt-2 text-[22px] font-semibold leading-none text-slate-950">
              {isEditing ? "Edit Artwork" : "Create Artwork"}
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
              Fill in the certificate detail below to prepare the artwork entry for publication.
            </p>
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
                value={currentPreviewUrl}
                readOnly
                className="min-h-11 rounded-none border border-slate-300 bg-slate-50 px-4 text-[14px] text-slate-500 outline-none"
              />
              {isEditing ? (
                <span className="text-[12px] text-slate-500">URL follows the public code automatically.</span>
              ) : null}
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

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={closeFormModal}
                className="inline-flex min-h-11 items-center justify-center rounded-none border border-slate-300 bg-white px-5 py-3 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex min-h-11 items-center justify-center rounded-none bg-slate-950 px-5 py-3 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-slate-800"
              >
                {isSaving ? "Saving..." : isEditing ? "Save Artwork" : "Create Artwork"}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

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
              disabled={isDeleting}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-none bg-rose-600 px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-rose-700 sm:w-auto"
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
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
