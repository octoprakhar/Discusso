import Link from "next/link";

function CreateCommunityNotAllowed() {
  return (
    <div className="space-y-2 mt-12">
      <h1 className="text-2xl font-bold text-center text-wrap">
        You cannot create your own community. You need karmas above 50.
      </h1>
      <h2 className="text-lg font-bold text-center text-wrap">
        🎉 Increase your Karmas by making engaging posts 🎉
      </h2>
      <div className="flex justify-center">
        <Link
          href="/user/create-post"
          className="px-4 py-2 bg-sky-600 cursor-pointer hover:bg-sky-800 text-white rounded-2xl"
        >
          Increase Karmas
        </Link>
      </div>
    </div>
  );
}

export default CreateCommunityNotAllowed;
