"use client";

import { usePathname, useRouter } from "next/navigation";
import Header from "./Header";
import Image from "next/image";

export default function HeaderWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const handleAddPostClick = () => {
    router.push("/user/create-post");
  };

  if (!isAuthPage) {
    return <Header onAddPostClick={handleAddPostClick} />;
  }

  return (
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
  );
}
