import {
  Bars3Icon,
  BellIcon,
  PlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import SearchBar from "./SearchBar";
import SidebarButton from "./SidebarButton";

function Header() {
  return (
    <div className="bg-slate-100 px-2 py-4 flex justify-between items-center">
      <div className="flex gap-1">
        {/* SideBar button */}
        <SidebarButton />
        {/* Discusso Logo */}
        <div className="relative h-6 w-12 md:h-12 md:w-18 2xl:h-8 2xl:w-14 cursor-pointer">
          <Image
            src="/discusso_logo.png"
            alt="Discusso"
            fill
            className="object-fill"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <SearchBar />
        <PlusIcon className="h-6 w-6 md:h-12 md:w-12 2xl:h-8 2xl:w-8 cursor-pointer hover:bg-slate-300 rounded-lg" />
        <BellIcon className="h-6 w-6 md:h-12 md:w-12 2xl:h-8 2xl:w-8 cursor-pointer hover:bg-slate-300 rounded-lg" />
        <UserCircleIcon className="h-6 w-6 md:h-12 md:w-12 2xl:h-8 2xl:w-8 cursor-pointer hover:bg-slate-300 rounded-lg" />
      </div>
    </div>
  );
}

export default Header;
