function FullPageLoader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
      <p className="text-white text-lg font-medium">{text}</p>
    </div>
  );
}

export default FullPageLoader;
