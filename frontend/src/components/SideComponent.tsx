export default function SideComponent({ title, onClick, isActive }:{ title:string, onClick:()=>void, isActive:boolean }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl px-6 py-4 font-semibold text-lg 
        border border-white/20 transition-all duration-300
        ${isActive
          ? "bg-yellow-500 text-black shadow-lg scale-105"
          : "bg-white/5 text-white hover:bg-white/20 hover:scale-105"}
      `}
    >
      {title}
    </div>
  );
};