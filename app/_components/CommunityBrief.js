//This component is used to show some small details of community in create-post page
"use client";
import Image from "next/image";

function CommunityBrief({ community, onSelect }) {
  const onCommunityClicked = () => {
    //Send Id to it's parent
    onSelect(community.communityId);
  };
  return (
    <div
      className="flex cursor-pointer hover:bg-slate-200 gap-2 items-center"
      onClick={onCommunityClicked}
    >
      <div className="relative h-10 w-10 rounded-full md:text-2xl">
        <Image
          src={community.icon}
          alt={community.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <p>{community.name}</p>
        <p>{community.noOfMembers} members</p>
      </div>
    </div>
  );
}

export default CommunityBrief;
