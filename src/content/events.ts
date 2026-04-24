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
      "Art Jakarta Papers is a specialized edition of Art Jakarta that focuses on artworks created on or with paper, from drawings and prints to photography and artist books. It brings together galleries and artists to highlight paper as a primary medium, offering a more intimate way to experience and collect contemporary art while expanding its presence in Indonesia’s art scene.",
      "For Art Jakarta Papers, EDISII brought together a selection of fine art prints by Indonesian contemporary artists, ranging from emerging to established figures. Each print in the presentation was created through a careful and collaborative process between EDISII and the artist.",
    ],
    gallery: [
      "/images/events/img1.jpg",
      "/images/events/img2.jpg",
      "/images/events/img3.jpg",
      "/images/events/img4.jpg",
      "/images/events/img5.jpg",
      "/images/events/img13.jpg",
      "/images/events/img7.jpg",
      "/images/events/img8.jpg",
      "/images/events/img9.jpg",
      "/images/events/img10.jpg",
      "/images/events/img11.jpg",
      "/images/events/img12.jpg"

    ],
  },
  {
    id: "art-jakarta-2025",
    label: "ART JAKARTA JIExpo 2025",
    date: "3-5 Oktober 2025",
    location: "JIExpo Kemayoran",
    paragraphs: [
      "Art Jakarta is an annual contemporary art fair held in Jakarta, where local and international galleries gather to showcase and sell modern artworks such as paintings, sculptures, and installations. The fair also offers visitors opportunities to experience curated exhibitions, meet artists, and explore both Indonesian and global contemporary art scenes. One of its main editions is typically held at JIExpo Kemayoran, usually taking place around October each year.",
      "EDISII joins this art fair as a way to introduce its art print publishing platform to the Indonesian market. Rather than simply exhibiting, the participation unfolds as a collaborative effort—working closely with established Indonesian contemporary artists such as Sunaryo, Arin Sunaryo, and Eddy Sutanto, alongside international names like Wednesday Lim and Coté Escrivá —to explore how high-quality art prints can expand the reach of contemporary practices while maintaining the integrity of the original works.",
    ],
    gallery: [
      "/images/artjkt/01.jpg",
      "/images/artjkt/12.jpg",
      "/images/artjkt/02.jpg",
      "/images/artjkt/03.jpg",
      "/images/artjkt/04.jpg",
      "/images/artjkt/05.jpg",
      "/images/artjkt/06.jpg",
      "/images/artjkt/07.jpg",
      "/images/artjkt/08.jpg",
      "/images/artjkt/09.jpg",
      "/images/artjkt/10.jpg",
      "/images/artjkt/11.jpg"


    ]

    
  },
];
