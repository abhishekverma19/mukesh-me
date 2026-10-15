import skidsteer from "@/assets/machine-skidsteer.jpg";
import excavator from "@/assets/machine-excavator.jpg";
import backhoe from "@/assets/machine-backhoe.jpg";
import tandemroller from "@/assets/machine-tandem-roller.png";
import grader from "@/assets/machine-grader.jpg";
import earthmoving from "@/assets/project-earthmoving.jpg";
import excavation from "@/assets/project-excavation.jpg";
import construction from "@/assets/project-construction.jpg";
import material from "@/assets/project-material.jpg";

/** Bundled placeholder imagery keyed by the `image_key` column. */
export const IMAGE_LIBRARY: Record<string, string> = {
  skidsteer,
  excavator,
  backhoe,
  tandemroller,
  grader,
  earthmoving,
  excavation,
  construction,
  material,
};

export function resolveImage(
  imageUrl?: string | null,
  imageKey?: string | null,
  fallback = skidsteer,
): string {
  if (imageUrl && imageUrl.length > 0) return imageUrl;
  if (imageKey && IMAGE_LIBRARY[imageKey]) return IMAGE_LIBRARY[imageKey]!;
  return fallback;
}
