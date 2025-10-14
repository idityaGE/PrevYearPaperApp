type PaperCardProps = {
  title: string;
  description: string;
};

function PaperCard({ title, description }: PaperCardProps) {
  return (
    <div
      className="h-150 w-120 bg-white m-4 rounded-lg shadow-md 
                 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 
                 transition-all duration-300 cursor-pointer transform"
    >
      <h2 className="text-lg font-bold p-4 text-gray-800">{title}</h2>
      <p className="p-4 text-gray-600">{description}</p>
    </div>
  );
}

export default PaperCard;
