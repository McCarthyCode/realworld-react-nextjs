import Image from "next/image";

const DEFAULT_AVATAR = "https://api.realworld.io/images/smiley-cyrus.jpg";

export interface AvatarProps {
  src: string | null;
  alt: string;
  size?: number;
}

/** User avatar with a graceful fallback for missing/empty images. */
export function Avatar({ src, alt, size = 32 }: AvatarProps) {
  return (
    <Image
      src={src || DEFAULT_AVATAR}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full object-cover"
      unoptimized
    />
  );
}
