import SaveAsDraftButton from "./SaveAsDraftButton";

function CreatePostHeader({ isDraft }) {
  return (
    <div className="flex justify-between items-center px-2 py-1">
      <h1 className="text-2xl md:text-4xl font-bold">
        {isDraft ? "Update Draft" : "Create Post"}
      </h1>
      <SaveAsDraftButton />
    </div>
  );
}

export default CreatePostHeader;
