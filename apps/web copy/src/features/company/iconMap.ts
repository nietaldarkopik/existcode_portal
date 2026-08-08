import { Cloud, Code2, LayoutTemplate, LifeBuoy, Palette, Smartphone, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "code-2": Code2,
  smartphone: Smartphone,
  palette: Palette,
  cloud: Cloud,
  "layout-template": LayoutTemplate,
  "life-buoy": LifeBuoy
};

export function resolveIcon(iconKey: string | null | undefined): LucideIcon {
  return (iconKey && iconMap[iconKey]) || Code2;
}
