import Image from "next/image";

// app/login/layout.js
export default function LoginLayout({ children }) {
  return (
    <>
      <header className="p-4 bg-slate-200 text-center">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24">
          <Image
            fill
            src="/discusso_logo_square.jpg"
            alt="Discusso"
            className="object-fill"
          />
        </div>
      </header>
      <main className="text-slate-800">{children}</main>
    </>
  );
}
