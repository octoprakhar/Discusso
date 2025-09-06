"use client";

function DescriptiveButton({
  icon,
  title,
  isAlreadyClicked = false,
  onButtonClicked,
}) {
  const handleClick = () => {
    console.log("Cliecked");
    // send data to server using action for changing the decision of upvoted or downvoted in case of post
    //And also check if user has already upvoted and clicked downvoted now then check it in database before
  };

  if (onButtonClicked) {
    return (
      <button
        className={`flex items-center ${
          isAlreadyClicked
            ? "bg-slate-700 text-slate-100"
            : "bg-slate-300 text-slate-800"
        } px-2 py-1 rounded-2xl gap-0.5 hover:bg-slate-400 cursor-pointer`}
        onClick={onButtonClicked}
      >
        {icon}
        <span className="text-sm">{title}</span>
      </button>
    );
  }

  return (
    <button
      className={`flex items-center ${
        isAlreadyClicked
          ? "bg-slate-700 text-slate-100"
          : "bg-slate-300 text-slate-800"
      } px-2 py-1 rounded-2xl gap-0.5 hover:bg-slate-400 cursor-pointer`}
      onClick={() => {
        handleClick();
      }}
    >
      {icon}
      <span className="text-sm">{title}</span>
    </button>
  );
}

export default DescriptiveButton;
