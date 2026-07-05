"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";

const navLinkClass = (isActive: boolean) =>
  `text-sm text-gray-500 hover:text-gray-700 ${isActive ? "font-medium text-gray-900" : ""}`;

/** Top navigation bar. Renders auth-aware links (Sign in/up vs. New Post/Settings/Profile). */
export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <header className="border-b border-gray-100">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-serif text-2xl font-bold text-green-600">
          conduit
        </Link>
        {!isLoading && (
          <ul className="flex list-none items-center gap-4">
            <li>
              <Link href="/" className={navLinkClass(pathname === "/")}>
                Home
              </Link>
            </li>
            {isAuthenticated && user ? (
              <>
                <li>
                  <Link href="/editor" className={navLinkClass(pathname === "/editor")}>
                    New Article
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className={navLinkClass(pathname === "/settings")}>
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/profile/${user.username}`}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
                  >
                    <Avatar src={user.image} alt={user.username} size={20} />
                    {user.username}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className={navLinkClass(pathname === "/login")}>
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link href="/register" className={navLinkClass(pathname === "/register")}>
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}
