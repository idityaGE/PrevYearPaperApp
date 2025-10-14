import React, { useState } from "react";
import PendingPapers from "../components/PendingPaperCard";
import PendingQueries from "../components/PendingQueries";
import SideComponent from "../components/SideComponent";

function Admin() {
  const [activeSection, setActiveSection] = useState("Pending papers");

  const renderContent = () => {
    switch (activeSection) {
      case "Pending papers":
        return <PendingPapers />;
      case "Pending Queries":
        return <PendingQueries />;
      case "See all the papers":
        return (
          <div className="text-xl text-yellow-300">All Papers list will show here...</div>
        );
      case "See all the users":
        return (
          <div className="text-xl text-yellow-300">All Users list will show here...</div>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-black min-h-screen w-full text-white flex">
      {/* Sidebar */}
      <div
        className="fixed top-0 left-0 h-full p-8 
                   bg-gradient-to-b from-gray-900 via-black to-black 
                   border-r border-white/20 
                   flex flex-col items-center shadow-2xl"
        style={{ width: "28rem" }} // ~112px × 4 scale = 448px width
      >
        <h2 className="text-3xl font-bold mb-10 text-yellow-400 text-center">
          Admin
        </h2>

        <div className="space-y-4 w-full">
          <SideComponent
            title="Pending papers"
            isActive={activeSection === "Pending papers"}
            onClick={() => setActiveSection("Pending papers")}
          />
          <SideComponent
            title="Pending Queries"
            isActive={activeSection === "Pending Queries"}
            onClick={() => setActiveSection("Pending Queries")}
          />
          <SideComponent
            title="See all the papers"
            isActive={activeSection === "See all the papers"}
            onClick={() => setActiveSection("See all the papers")}
          />
          <SideComponent
            title="See all the users"
            isActive={activeSection === "See all the users"}
            onClick={() => setActiveSection("See all the users")}
          />
        </div>
      </div>

      {/* Right Content */}
      <div
        className="flex-1 bg-slate-900/80 p-10 overflow-y-auto ml-[28rem] 
                   transition-all duration-500 min-h-screen"
      >
        {renderContent()}
      </div>
    </div>
  );
}

export default Admin;
