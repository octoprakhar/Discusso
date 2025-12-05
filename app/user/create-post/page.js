import CommunitySelector from "@/app/_components/CommunitySelector";
import CreatePostHeader from "@/app/_components/CreatePostHeader";
import PostTypeSelector from "@/app/_components/PostTypeSelector";
import TitleAndDescFields from "@/app/_components/TitleAndDescFields";
import { getCommunitiesByUserId, getDraftById } from "@/app/_libs/data-service";
import { CreatePost } from "@/app/context/PostContext";
import { getUserId } from "@/app/utils/userUtils";

export default async function Page({ searchParams }) {
  //Get all the list of communities user has joined

  const params = await searchParams;
  const draftId = params.draftId;
  const communityId = params.com;

  //Get the draft from the draft id
  let draft;
  let communityList = [];
  let modifiedDraft = {};

  //Getting all the community details which is joined by the user.
  //Since because of authorization without the signin we can't get in this page. So I can easily get userId without error
  try {
    const userId = await getUserId();
    communityList = await getCommunitiesByUserId(userId);
    // console.log(
    //   `🎉 Create-post Page.js: Got community data for this user of userId: ${userId} as: `,
    //   data
    // );
    if (draftId) {
      modifiedDraft = await getDraftById(draftId);
      console.log(
        "Create-post page.js: Got modified draft as: ",
        modifiedDraft
      );
    }
  } catch (err) {
    console.error(
      "💣 Create-post Page.js: Error occured while getting community of the user",
      err
    );
  }

  // if (draftId) {
  //   draft = {
  //     id: 2,
  //     lastEditedAt: "Date-Time",
  //     userId: 1,
  //     selectedCommunityId: 4,
  //     title: "Hello this is the title",
  //     body: "This is the body",
  //   };

  //   //Now get the selected community name , and image from community Id
  //   //Then modify the draft
  //   modifiedDraft = {
  //     id: 2,
  //     lastEditedAt: "Date-Time",
  //     userId: 1,
  //     selectedCommunity: "d/deeplearning",
  //     selectedCommunityImage: "/discusso_logo.png",
  //     title: "Hello this is the title",
  //     body: "This is the body",
  //   };
  // }

  // const communityList = [
  //   {
  //     communityId: "ed8f5e57-2160-48f6-8f0f-046fe76de11f", //testing purpose
  //     icon: "/bg-1.jpg",
  //     name: "d/adventure",
  //     noOfMembers: 244,
  //   },
  //   {
  //     communityId: crypto.randomUUID(),
  //     icon: "/bg-1.jpg",
  //     name: "d/wetehr",
  //     noOfMembers: 244,
  //   },
  //   {
  //     communityId: crypto.randomUUID(),
  //     icon: "/bg-1.jpg",
  //     name: "d/ryhdnufg",
  //     noOfMembers: 244,
  //   },
  //   {
  //     communityId: crypto.randomUUID(),
  //     icon: "/bg-1.jpg",
  //     name: "d/kfnhof",
  //     noOfMembers: 244,
  //   },
  //   {
  //     communityId: crypto.randomUUID(),
  //     icon: "/bg-1.jpg",
  //     name: "d/watet",
  //     noOfMembers: 244,
  //   },
  //   {
  //     communityId: crypto.randomUUID(),
  //     icon: "/bg-1.jpg",
  //     name: "d/jdoif",
  //     noOfMembers: 244,
  //   },
  //   {
  //     communityId: crypto.randomUUID(),
  //     icon: "/bg-1.jpg",
  //     name: "d/ghcyu",
  //     noOfMembers: 244,
  //   },
  //   {
  //     communityId: crypto.randomUUID(),
  //     icon: "/bg-1.jpg",
  //     name: "d/asdfgh",
  //     noOfMembers: 244,
  //   },
  //   {
  //     communityId: crypto.randomUUID(),
  //     icon: "/bg-1.jpg",
  //     name: "d/poiu",
  //     noOfMembers: 244,
  //   },
  // ];
  return (
    <CreatePost
      draftTitle={modifiedDraft ? modifiedDraft.title : ""}
      draftBody={modifiedDraft ? modifiedDraft.body : ""}
      draftedCommunityId={draftId ? modifiedDraft.selectedCommunityId : -1}
      communityList={communityList}
      draftedCommunity={modifiedDraft ? modifiedDraft.selectedCommunity : ""}
      communityId={communityId}
      draftedCommunityImage={modifiedDraft.selectedCommunityImage}
    >
      <div className="px-2 py-1 space-y-2 sm:w-[90%] mx-auto">
        {/* Header of this page */}
        <CreatePostHeader isDraft={draftId ? true : false} />
        <CommunitySelector />
        <PostTypeSelector />
        <TitleAndDescFields />
      </div>
    </CreatePost>
  );
}
