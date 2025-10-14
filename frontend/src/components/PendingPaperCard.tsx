import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface PendingPaper {
  id: number;
  type: string;
  year: number;
  fileUrl: string;
  isVerified: boolean;
  subject: {
    name: string;
    code: string;
    semester: {
      number: number;
      program: {
        department: {
          name: string;
        };
      };
    };
  };
}

function PendingPapers() {
  const [papers, setPapers] = useState<PendingPaper[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/pending-papers")
      .then((res) => setPapers(res.data))
      .catch((err) => console.error("Error fetching pending papers:", err));
  }, []);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-8 text-yellow-400 tracking-wide">
        Pending Papers
      </h3>

      {papers.length === 0 ? (
        <p className="text-gray-400">No pending papers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {papers.map((p) => (
            <div
              key={p.id}
              className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black 
                         border border-white/10 rounded-2xl shadow-xl 
                         hover:shadow-yellow-500/20 hover:-translate-y-1 transition-all duration-300 
                         p-6 backdrop-blur-xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold text-white">
                  {p.subject.name}
                </h4>
                <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-400/40 uppercase">
                  {p.type.replace("_", " ")}
                </span>
              </div>

              {/* Body */}
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <span className="font-semibold text-gray-100">Department:</span>{" "}
                  {p.subject.semester.program.department.name}
                </p>
                <p>
                  <span className="font-semibold text-gray-100">Semester:</span>{" "}
                  {p.subject.semester.number}
                </p>
                <p>
                  <span className="font-semibold text-gray-100">Year:</span>{" "}
                  {p.year}
                </p>
                <p>
                  <span className="font-semibold text-gray-100">Subject Code:</span>{" "}
                  {p.subject.code}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-between items-center">
                <span className="text-sm italic text-yellow-300">
                  Pending Review
                </span>
                <div className="space-x-3 flex justify-between">
                  <button
                  
                  onClick={() => {
                       axios.patch(`http://localhost:3000/api/admin/verify-paper/${p.id}`)
                      .then(() => {
                        toast.success("Paper verified successfully!");
                        setPapers(papers.filter(paper => paper.id !== p.id));
                      })
                      .catch(() => toast.error("Failed to verify paper."));
                  }}
                  rel="noopener noreferrer"
                  className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg 
                             hover:bg-yellow-400 transition-all duration-200"
                >
                  Verify
                </button>
                <a
                  href={p.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg 
                             hover:bg-yellow-400 transition-all duration-200"
                >
                  View
                </a>
                </div>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none 
                              bg-gradient-to-tr from-yellow-500/5 to-transparent blur-xl"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingPapers;
