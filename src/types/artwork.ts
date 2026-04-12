export type ArtworkStatus = "Draft" | "Published";

export type ArtworkItem = {
  id: number;
  publicCode: string;
  title: string;
  artist: string;
  edition: string;
  year: string;
  url: string;
  status: ArtworkStatus;
  createdAt: string;
  updatedAt: string;
};

export type ArtworkFormPayload = {
  title: string;
  artist: string;
  edition: string;
  year: string;
  url: string;
  status: ArtworkStatus;
};
