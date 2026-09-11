import type { Artwork } from "@/types";
import { ArtworkCard } from "./ArtworkCard";

// Varied aspect ratios reproduce the editorial rhythm of the Figma gallery.
const aspects = [
  "aspect-[2/1]",
  "aspect-[16/9]",
  "aspect-[3/2]",
  "aspect-[16/9]",
  "aspect-[5/4]",
  "aspect-[2/1]",
  "aspect-[3/2]",
  "aspect-[2/1]",
  "aspect-[3/2]",
  "aspect-[16/9]",
];

export function FeaturedWorksGrid({ artworks }: { artworks: Artwork[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {artworks.map((artwork, index) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          aspect={aspects[index % aspects.length]}
          priority={index < 2}
        />
      ))}
    </div>
  );
}
