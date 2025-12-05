import CreateCommunityForm from "@/app/_components/CreateCommunityForm";
import CreateCommunityNotAllowed from "@/app/_components/CreateCommunityNotAllowed";
import { getUserKarma } from "@/app/_libs/data-service";
import { getUserId } from "@/app/utils/userUtils";

export const dynamic = "force-dynamic";

export default async function Page() {
  //Get the upvotes and downvotes from the signed-in user

  let karmas = -1;
  try {
    const userId = await getUserId();
    if (!userId) {
      console.error("💣 Create-community Page.js : Error while getting userId");
    }
    karmas = await getUserKarma(userId);
    // console.log("🤩 Create-community Page.js: Got karma as", karmas);
  } catch (err) {
    console.error(
      "💣 Create-community Page.js : Error while getting karma value, ",
      err
    );
  }

  if (karmas < 1) {
    return <CreateCommunityNotAllowed />;
  }
  return (
    <div className="px-2 py-1 space-y-4">
      <h1 className="text-2xl md:text-4xl font-bold">Create your community</h1>
      <CreateCommunityForm />
    </div>
  );
}
