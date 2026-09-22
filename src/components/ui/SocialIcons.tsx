import { Facebook, Instagram } from "lucide-react";
import { socialLinks } from "@/lib/constants";

const items = [
  { label: "Instagram", href: socialLinks.instagram, icon: Instagram },
  { label: "Facebook", href: socialLinks.facebook, icon: Facebook },
];

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {items.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="transition-opacity hover:opacity-50"
        >
          <Icon size={18} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
}
