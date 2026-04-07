export type EventModalTab = {
  id: string;
  label: string;
  date?: string;
  location?: string;
  paragraphs?: string[];
  gallery?: string[];
  emptyState?: {
    title: string;
    description: string;
  };
};

export const eventModalTabs: EventModalTab[] = [
  {
    id: "art-jakarta-papers-2026",
    label: "ART JAKARTA PAPERS 2026",
    date: "5-8 Februari 2026",
    location: "City Hall, PIM 3",
    paragraphs: [
      "Art Jakarta Papers is a new, specialized art fair that is part of the Art Jakarta ecosystem. This edition brings together 28 galleries from across Asia, featuring diverse presentations that focus on the medium of paper.",
      "For Art Jakarta Papers, EDISII brought together a selection of fine art prints by Indonesian contemporary artists, ranging from emerging to established figures. Each print in the presentation was created through a careful and collaborative process between EDISII and the artist.",
    ],
    gallery: [
      "/images/events/img1.jpg",
      "/images/events/img2.jpg",
      "/images/events/img3.jpg",
      "/images/events/img4.jpg",
      "/images/events/img5.jpg",
      "/images/events/img7.jpg",
    ],
  },
  {
    id: "art-jakarta-2025",
    label: "ART JAKARTA 2025",
    emptyState: {
      title: "We are preparing something special for you.",
      description:
        "Please do not worry, we are carefully putting this story together and will share it as soon as it is ready.",
    },
  },
];
