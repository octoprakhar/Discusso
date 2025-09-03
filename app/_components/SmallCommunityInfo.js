import Image from "next/image";

//When we hover on community name in post this thing will get shown
function SmallCommunityInfo({ community }) {
  return (
    <div className="w-lg border border-gray-200 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out p-4 space-y-2">
      <div className="flex gap-1 items-center">
        <div className="relative w-16 h-16 rounded-full border-[1px]">
          <Image
            src={community.logo}
            alt="community"
            fill
            className="object-contain rounded-full"
          />
        </div>
        <span className="font-bold">{community.communityName}</span>
      </div>
      <p>{community.description}</p>
      <hr />
      <div className="mt-14">
        <p className="font-bold text-lg">{community.totalCommunityMembers}</p>
        <p className="font-light">Members</p>
      </div>
    </div>
  );
}

export default SmallCommunityInfo;
