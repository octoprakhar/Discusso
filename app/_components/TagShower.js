function TagShower({ tags }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag, i) => (
        <p
          className="px-2 py-1 bg-sky-400 text-white text-center rounded-2xl text-sm"
          key={i}
        >
          {tag}
        </p>
      ))}
    </div>
  );
}

export default TagShower;
