import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-6">
      <div className="mx-auto max-w-5xl px-4 text-sm text-gray-400">
        <Link href="/" className="font-serif font-bold text-gray-500">
          conduit
        </Link>
        <span className="ml-2">
          An interactive learning project from{" "}
          <a href="https://thinkster.io" className="text-green-600 hover:underline">
            Thinkster
          </a>
          . Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  );
}
