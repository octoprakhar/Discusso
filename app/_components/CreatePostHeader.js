function CreatePostHeader() {
  return (
    <div className="flex justify-between items-center px-2 py-1">
      <h1 className="text-2xl md:text-4xl font-bold">Create Post</h1>
      <button className="px-2 py-1 rounded-xl md:text-3xl border-[1px] cursor-pointer hover:bg-slate-200 hover:border-none">
        Drafts
      </button>
    </div>
  );
}

export default CreatePostHeader;
