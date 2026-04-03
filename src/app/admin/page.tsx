export default function AdminPage() {
  return (
    <main className="container mx-auto px-6 py-12 md:px-12 md:py-16">
      <section className="max-w-3xl rounded-[2rem] border border-black/10 bg-white/85 p-8 shadow-[0_20px_60px_rgba(60,42,20,0.08)]">
        <p className="text-xs uppercase tracking-[0.28em] text-stone-500">On Hold</p>
        <h2 className="mt-4 text-[32px] font-serif text-stone-950">Admin dashboard ditunda dulu.</h2>
        <p className="mt-4 text-base leading-relaxed text-stone-600">
          Fokus project saat ini dikembalikan ke website company profile publik. Struktur halaman sudah dibuat modular supaya nanti mudah disambungkan ke content management ketika waktunya tepat.
        </p>
      </section>
    </main>
  );
}
