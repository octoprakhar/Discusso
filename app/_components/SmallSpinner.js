function SmallSpinner({ size = "w-5 h-5", color = "border-black" }) {
  return (
    <div
      className={`animate-spin rounded-full ${size} border-2 border-t-transparent ${color}`}
    ></div>
  );
}

export default SmallSpinner;
