import CreateCommunityForm from "@/app/_components/CreateCommunityForm";
import CreateCommunityNotAllowed from "@/app/_components/CreateCommunityNotAllowed";

export default function Page() {
  //Get the upvotes and downvotes from the signed-in user

  const upvotes = 100;
  const downvotes = 1;

  const karmas = upvotes - downvotes;

  if (karmas < 50) {
    return <CreateCommunityNotAllowed />;
  }
  return (
    <div className="px-2 py-1 space-y-4">
      <h1 className="text-2xl md:text-4xl font-bold">Create your community</h1>
      <CreateCommunityForm />
    </div>
  );
}
