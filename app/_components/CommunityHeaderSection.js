import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

function CommunityHeaderSection({
  communityName,
  communityLogo,
  hasUserJoined,
}) {
  return (
    <div className="w-[95%] mx-auto min-h-32 rounded-xl py-3">
      <div className="relative min-h-10 md:min-h-24 px-2 py-1 rounded-xl bg-slate-200">
        <span className="mx-4 text-xl md:text-4xl font-bold flex justify-end">
          {communityName}
        </span>
        {/* Image box */}
        <div className="absolute border-2 top-4 w-20 h-20 md:w-40 md:h-40 rounded-full">
          <div className="relative w-full h-full rounded-full">
            <Image
              src={communityLogo}
              alt={communityName}
              fill
              className="object-cover object-center rounded-full"
            />
          </div>
        </div>
      </div>
      {/* Action buttons */}
      <div className="px-2 py-1 flex gap-2 justify-end">
        <div className="border-[1px] rounded-full p-2 cursor-pointer hover:bg-slate-200">
          <PlusIcon className="h-6 w-6 md:h-10 md:w-10" />
        </div>
        <div className="border-[1px] rounded-full p-2 cursor-pointer hover:bg-slate-200">
          <BellIcon className="h-6 w-6 md:h-10 md:w-10" />
        </div>
        <div className="border-[1px] rounded-full p-2 cursor-pointer hover:bg-slate-200">
          <span className="h-6 w-6 md:h-10 md:w-10 md:text-xl">
            {hasUserJoined ? "Joined" : "Join"}
          </span>
        </div>
        <div className="border-[1px] rounded-full p-2 cursor-pointer hover:bg-slate-200">
          <EllipsisHorizontalIcon className="h-6 w-6 md:h-10 md:w-10" />
        </div>
      </div>
    </div>
  );
}

export default CommunityHeaderSection;
