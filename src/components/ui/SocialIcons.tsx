import { Facebook, Instagram } from "lucide-react";
import { socialLinks } from "@/lib/constants";

function PinterestIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] fill-current"
    >
      <path d="M12.04 2C6.52 2 3 5.95 3 9.24c0 2.43.92 4.59 2.89 5.4.32.13.61 0 .7-.35.07-.24.22-.87.29-1.13.09-.35.05-.47-.2-.76-.57-.67-.93-1.54-.93-2.78 0-3.58 2.68-6.78 6.98-6.78 3.81 0 5.9 2.33 5.9 5.44 0 4.09-1.81 7.54-4.5 7.54-1.49 0-2.6-1.23-2.24-2.74.43-1.8 1.25-3.74 1.25-5.04 0-1.16-.62-2.13-1.91-2.13-1.51 0-2.72 1.56-2.72 3.66 0 1.34.45 2.24.45 2.24l-1.82 7.71c-.54 2.29-.08 5.1-.04 5.38.03.17.24.21.34.08.14-.18 1.9-2.36 2.5-4.55.17-.62.98-3.85.98-3.85.48.92 1.9 1.73 3.4 1.73 4.48 0 7.52-4.08 7.52-9.54C21.84 5.14 18.22 2 12.04 2Z" />
    </svg>
  );
}

const items = [
  { label: "Facebook", href: socialLinks.facebook, icon: Facebook },
  { label: "Instagram", href: socialLinks.instagram, icon: Instagram },
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
      <a
        href={socialLinks.pinterest}
        target="_blank"
        rel="noreferrer"
        aria-label="Pinterest"
        className="transition-opacity hover:opacity-50"
      >
        <PinterestIcon />
      </a>
    </div>
  );
}
