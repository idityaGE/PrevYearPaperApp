import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../lib/config";

function PendingQueries() {
  const [allQueries, setAllQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/admin/queries`,{
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setAllQueries(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQueries();
  }, []);

  return (
    <div className="px-4 md:px-10 py-10 text-white">
      <h3 className="text-3xl font-bold mb-8 text-yellow-400 tracking-wide text-center md:text-left">
        Pending Queries
      </h3>

      {loading ? (
        <p className="text-gray-400 text-center">Loading queries...</p>
      ) : allQueries.length === 0 ? (
        <p className="text-gray-400 text-center">No pending queries found.</p>
      ) : (
        <div className="space-y-6">
          {allQueries.map((q) => (
            <div
              key={q.id}
              className="border border-gray-500/50 rounded-2xl p-6 
                         bg-black/30 backdrop-blur-md 
                         hover:border-yellow-400 transition-all duration-300"
            >
              <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
                <h4 className="text-lg font-medium">
                  Email: <span className="text-yellow-300">{q.user.email}</span>
                </h4>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    q.isResponded
                      ? "bg-green-500/20 text-green-400 border border-green-400/40"
                      : "bg-yellow-500/20 text-yellow-400 border border-yellow-400/40"
                  }`}
                >
                  {q.isResponded ? "Resolved" : "Pending"}
                </span>
              </div>

              <p className="text-gray-300 mb-5 text-base">{q.message}</p>

              <button
                onClick={async () => {
                  await axios.put(`${BACKEND_URL}/api/admin/resolve-query/${q.id}`, {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                  });
                  const updated = allQueries.map((query) =>
                    query.id === q.id ? { ...query, isResponded: true } : query
                  );
                  setAllQueries(updated);
                }}
                disabled={q.isResponded}
                className={`border border-white/50 font-semibold text-sm px-4 py-2 rounded-md transition-all
                  ${q.isResponded
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-yellow-400 hover:text-black"
                  }`}
              >
                Respond
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingQueries;
