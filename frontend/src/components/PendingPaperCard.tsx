import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PaperCardSkeleton from "./PaperCardSkeleton";

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
  const [loading, setLoading] = useState(true);

  const fetchPapers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/pending-papers");
      setPapers(response.data);
    } catch (error) {
      console.error("Error fetching pending papers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  return (
    <div className="px-4 md:px-10 py-10 text-white">
      <h3 className="text-3xl font-bold mb-8 text-yellow-400 tracking-wide text-center md:text-left">
        Pending Papers
      </h3>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <PaperCardSkeleton key={i} />
          ))}
        </div>
      ) : papers.length === 0 ? (
        <p className="text-gray-400 text-center">No pending papers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {papers.map((p) => (
            <div
              key={p.id}
              className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black 
                         border border-white/10 rounded-2xl shadow-xl 
                         hover:shadow-yellow-500/20 hover:-translate-y-1 transition-all duration-300 
                         p-6 backdrop-blur-xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <h4 className="text-xl font-semibold text-white">{p.subject.name}</h4>
                <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-400/40 uppercase">
                  {p.type.replace("_", " ")}
                </span>
              </div>

              {/* Body */}
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="font-semibold">Department:</span> {p.subject.semester.program.department.name}</p>
                <p><span className="font-semibold">Semester:</span> {p.subject.semester.number}</p>
                <p><span className="font-semibold">Year:</span> {p.year}</p>
                <p><span className="font-semibold">Subject Code:</span> {p.subject.code}</p>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-between items-center flex-wrap gap-3">
                <span className="text-sm italic text-yellow-300">Pending Review</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      axios
                        .patch(`http://localhost:3000/api/admin/verify-paper/${p.id}`)
                        .then(() => {
                          toast.success("Paper verified successfully!");
                          setPapers(papers.filter((paper) => paper.id !== p.id));
                        })
                        .catch(() => toast.error("Failed to verify paper."));
                    }}
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

              <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-yellow-500/5 to-transparent blur-xl"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingPapers;
