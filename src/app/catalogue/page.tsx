import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/site/public-shell";
import { catalogueItems } from "@/content/site";

export default function CataloguePage() {
  return (
    <PublicShell>
      <section className="container mx-auto px-6 py-16 md:px-12 md:py-24">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Catalogue</p>
            <h1 className="mt-3 text-[32px] font-serif text-stone-950">Published editions</h1>
          </div>
          <Link href="/" className="text-sm font-medium underline underline-offset-4">
            Back to homepage
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {catalogueItems.map((artwork) => (
            <article
              key={artwork.title}
              className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white"
            >
              <div className="relative aspect-[4/5] bg-stone-200">
                {artwork.imageUrl ? (
                  <Image
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="space-y-2 p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-stone-500">{artwork.editionNumber}</p>
                <h2 className="text-[32px] font-serif text-stone-950">{artwork.title}</h2>
                <p className="text-sm text-stone-600">{artwork.artistName}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
