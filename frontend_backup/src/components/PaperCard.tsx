import React from "react";

type PaperCardProps = {
  title: string;
  description: string;
};

function PaperCard({ title, description }: PaperCardProps) {
  return (
    <div
      className="w-full max-w-[320px] bg-white rounded-xl shadow-md 
                 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 
                 transition-transform duration-300 cursor-pointer flex flex-col"
    >
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 line-clamp-2">{title}</h2>
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  );
}


export default React.memo(PaperCard);
