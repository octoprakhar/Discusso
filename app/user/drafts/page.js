import DraftPost from "@/app/_components/DraftPost";

export default function Page() {
  //Get all the drafts of this user using userId
  //Then get the community name using community Id using draft
  /*
  Draft format must be something.
  {
  id: 2,
  lastEditedAt: Date-Time
  userId: 1,
  selectedCommunityId: 4,
  title: "Hello this is the title",
  body: "This is the body"


  }
  */

  //Then if you get draft in the above format, modify all the drafts edited date and user community name, using community Id and format it like this:
  const drafts = [
    {
      id: 1,
      lastEditedAt: "2 days ago", //Modify date-time in this format either use days, month, or year
      userId: 1,
      selectedCommunity: "d/deeplearning", //get community name from id, and add prefix d/
      title: "Hello this is the title",
      body: "This is the body",
    },
    {
      id: 2,
      lastEditedAt: "2 days ago", //Modify date-time in this format either use days, month, or year
      userId: 1,
      selectedCommunity: "d/deeplearning", //get community name from id, and add prefix d/
      title: "Hello this is the title",
      body: "This is the body",
    },
    {
      id: 3,
      lastEditedAt: "2 days ago", //Modify date-time in this format either use days, month, or year
      userId: 1,
      selectedCommunity: "d/deeplearning", //get community name from id, and add prefix d/
      title: "Hello this is the title",
      body: "This is the body",
    },
    {
      id: 4,
      lastEditedAt: "2 days ago", //Modify date-time in this format either use days, month, or year
      userId: 1,
      selectedCommunity: "d/deeplearning", //get community name from id, and add prefix d/
      title: "Hello this is the title",
      body: "This is the body",
    },
    {
      id: 5,
      lastEditedAt: "2 days ago", //Modify date-time in this format either use days, month, or year
      userId: 1,
      selectedCommunity: "d/deeplearning", //get community name from id, and add prefix d/
      title: "Hello this is the title",
      body: "This is the body",
    },
  ];

  return (
    <div className="space-y-6 px-2 py-1">
      <h1 className="text-4xl md:text-5xl font-bold">View All My Drafts</h1>
      <div className="space-y-4">
        {drafts.map((draft) => (
          <DraftPost draft={draft} key={draft.id} />
        ))}
      </div>
    </div>
  );
}
