"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HeaderLogo() {
  const router = useRouter();
  return (
    <div
      className="relative h-6 w-12 md:h-12 md:w-18 2xl:h-8 2xl:w-14 cursor-pointer"
      onClick={() => {
        router.push("/");
      }}
    >
      <Image
        src="/discusso_logo.png"
        alt="Discusso"
        fill
        className="object-fill"
      />
    </div>
  );
}

export default HeaderLogo;
