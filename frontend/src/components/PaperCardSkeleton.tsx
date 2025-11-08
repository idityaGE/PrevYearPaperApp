
function PaperCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow border border-gray-100 animate-pulse flex flex-col justify-between h-56">
      {/* Title */}
      <div>
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      </div>

      {/* Footer (button + status) */}
      <div className="flex justify-between items-center mt-5">
        <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}

export default PaperCardSkeleton;
