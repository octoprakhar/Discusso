"use client";

import Image from "next/image";
import DescriptiveButton from "./DescriptiveButton";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function UserCommentActivity({ comment }) {
  const router = useRouter();
  //This component needs the following data
  /*
    1. Community Name: Where user has commented
    2. Community Icon: The icon of the specific community, whose post user has commented
    2. post title: title of the post user has commented
    4. username: Name of this user
    5. OP(own post) tag : Is the user commented on it's own created post or different person's post
    6. Replied person: Username of the person, To whom the user replied by commenting on the post
    7. createdAt timestamp = Comment Timestamp
    8. content = comment content
    9. upvote = No of upvotes
    10. downvotes= no of downvotes
    
    */
  // When I click on a specific comment it must take to that specific post page.

  //I am planning to use this component only to get all this details from the database

  return (
    <div
      className="flex gap-1 my-4 text-sm md:text-lg hover:bg-slate-200 cursor-pointer"
      onClick={() => {
        // TODO : Edit it with real post id
        router.push("/posts/3");
      }}
    >
      {/* Header with post title, community name, community icon */}
      <div className="relative w-6 h-6 md:w-10 md:h-10 rounded-full bg-slate-100">
        <Image
          src="/bg-1.jpg"
          alt="Community"
          className="rounded-full object-cover object-center"
          fill
        />
      </div>
      <div className="space-y-1 md:space-y-2">
        <div className="flex gap-1 items-center flex-1">
          <p className="font-bold">r/androidday</p>
          <p className="">AI Assitant in Android Studio?</p>
        </div>
        <div className="flex gap-1 items-center">
          <p className="font-bold">KevinTheFirebender</p>
          <p>commented 2 days ago</p>
        </div>
        <p className="text-wrap">{comment}</p>
        <div className="flex gap-2">
          <DescriptiveButton
            icon={<ArrowUpIcon className="w-4 h-4" />}
            title={1}
          />
          <DescriptiveButton
            icon={<ArrowDownIcon className="w-4 h-4" title="" />}
          />
        </div>
      </div>
    </div>
  );
}

export default UserCommentActivity;
