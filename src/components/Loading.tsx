const Loading = () => {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-40 bg-gray-300 rounded"></div>
    </div>
  );
};

export default Loading;