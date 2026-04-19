import { AdminShell } from "@/components/admin/admin-shell";
import { ArtworkCrud } from "@/components/admin/artwork-crud";

export default function EdsAdminPage() {
  return (
    <AdminShell
      activeMenu="artworks"
      title="Artwork Management"
      description="Overview certificates and manage certificate-related artwork entries."
    >
      <ArtworkCrud />
    </AdminShell>
  );
}
