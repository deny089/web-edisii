import { homepageSections } from "@/content/site";
import { PublicShell } from "@/components/site/public-shell";
import { HeroSection } from "@/components/site/hero-section";
import { CollaborationSection } from "@/components/site/collaboration-section";
import { ArtistsSection } from "@/components/site/artists-section";
import { EventsSection } from "@/components/site/events-section";
import { CertificateSection } from "@/components/site/certificate-section";
import { OfficeSection } from "@/components/site/office-section";

export default function HomePage() {
  return (
    <PublicShell>
      <div className="flex w-full flex-col">
        <HeroSection {...homepageSections.about} />
        <CollaborationSection {...homepageSections.collaboration} />
        <ArtistsSection {...homepageSections.artists} />
        <div className="h-1 bg-white" aria-hidden="true" />
        <EventsSection {...homepageSections.event} />
        <CertificateSection {...homepageSections.certificate} />
        <OfficeSection {...homepageSections.office} />
      </div>
    </PublicShell>
  );
}
