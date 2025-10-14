
function PaperCardSkeleton() {
  return (
    <div className="h-52 w-full bg-white m-4 rounded-lg shadow-md animate-pulse">
      <div className="h-6 w-3/4 bg-gray-300 rounded mt-4 mx-4"></div>
      <div className="h-4 w-5/6 bg-gray-300 rounded mt-4 mx-4"></div>
      <div className="h-4 w-2/3 bg-gray-300 rounded mt-3 mx-4"></div>
      <div className="h-4 w-4/5 bg-gray-300 rounded mt-3 mx-4"></div>
    </div>
  );
}

export default PaperCardSkeleton;
