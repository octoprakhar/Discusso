import CommunitySelector from "@/app/_components/CommunitySelector";
import CreatePostHeader from "@/app/_components/CreatePostHeader";
import PostTypeSelector from "@/app/_components/PostTypeSelector";
import TitleAndDescFields from "@/app/_components/TitleAndDescFields";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Page() {
  //Get all the list of communities user has joined
  const communityList = [
    {
      communityId: 1,
      icon: "/bg-1.jpg",
      name: "d/adventure",
      noOfMembers: 244,
    },
    {
      communityId: 2,
      icon: "/bg-1.jpg",
      name: "d/wetehr",
      noOfMembers: 244,
    },
    {
      communityId: 3,
      icon: "/bg-1.jpg",
      name: "d/ryhdnufg",
      noOfMembers: 244,
    },
    {
      communityId: 4,
      icon: "/bg-1.jpg",
      name: "d/kfnhof",
      noOfMembers: 244,
    },
    {
      communityId: 5,
      icon: "/bg-1.jpg",
      name: "d/watet",
      noOfMembers: 244,
    },
    {
      communityId: 6,
      icon: "/bg-1.jpg",
      name: "d/jdoif",
      noOfMembers: 244,
    },
    {
      communityId: 7,
      icon: "/bg-1.jpg",
      name: "d/ghcyu",
      noOfMembers: 244,
    },
    {
      communityId: 8,
      icon: "/bg-1.jpg",
      name: "d/asdfgh",
      noOfMembers: 244,
    },
    {
      communityId: 9,
      icon: "/bg-1.jpg",
      name: "d/poiu",
      noOfMembers: 244,
    },
  ];
  return (
    <div className="px-2 py-1 space-y-2 sm:w-[90%] mx-auto">
      {/* Header of this page */}
      <CreatePostHeader />
      <CommunitySelector communityList={communityList} />
      <PostTypeSelector />
      <TitleAndDescFields />
    </div>
  );
}
