import React, { useEffect, useState, type ChangeEvent } from "react";
import { MessageSquare, Send } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";

// ✅ Define Query and User types
interface User {
  id: number;
  name: string;
  email: string;
}

interface Query {
  id: number;
  message: string;
  user?: User;
  response?: string;
  createdAt: string;
  isResponded: boolean;
}

const AdminResponse: React.FC = () => {
  const [allQueries, setAllQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // ✅ Fetch all pending queries
  const { token } = useAuthStore();
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await axios.get<Query[]>(
          "http://localhost:3000/api/admin/queries",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllQueries(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch queries");
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  // ✅ Handle send response
  const handleSendResponse = async (queryId: number, responseText: string) => {
    const { token } = useAuthStore();
    try {
      if (!responseText.trim()) return;

      await axios.put(
        `http://localhost:3000/api/admin/resolve-query/${queryId}`,
        { response: responseText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedQueries = allQueries.map((q) =>
        q.id === queryId ? { ...q, isResponded: true, response: responseText } : q
      );
      setAllQueries(updatedQueries);
        toast.success("Response sent successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send response");
    }
  };

  // ✅ Handle textarea change safely
  const handleResponseChange = (e: ChangeEvent<HTMLTextAreaElement>, queryId: number) => {
    const updatedQueries = allQueries.map((q) =>
      q.id === queryId ? { ...q, response: e.target.value } : q
    );
    setAllQueries(updatedQueries);
  };

  if (loading)
    return <div className="text-yellow-400 p-10">Loading queries...</div>;
  if (error) return <div className="text-red-500 p-10">{error}</div>;

  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-black min-h-screen w-full text-white p-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8 flex items-center gap-3">
        <MessageSquare size={28} /> Admin Query Responses
      </h1>

      {allQueries.length === 0 ? (
        <p className="text-gray-400 text-lg">No pending queries 🎉</p>
      ) : (
        <div className="space-y-6">
          {allQueries.map((query) => (
            <div
              key={query.id}
              className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300"
            >
              <div>
                <h2 className="text-lg font-semibold text-yellow-300">
                  {query.user?.name || "Unknown User"}
                </h2>
                <p className="text-sm text-gray-400">
                  {query.user?.email || "No email"}
                </p>
                <p className="mt-3 text-gray-200">{query.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  📅 {new Date(query.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* ✅ Admin Response Section */}
              {!query.isResponded ? (
                <div className="mt-5">
                  <textarea
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-gray-200 focus:outline-none focus:border-yellow-400 transition-all"
                    rows={3}
                    placeholder="Write your response..."
                    value={query.response || ""}
                    onChange={(e) => handleResponseChange(e, query.id)}
                  />
                  <button
                    onClick={() =>
                      handleSendResponse(query.id, query.response || "")
                    }
                    disabled={!query.response?.trim()}
                    className={`mt-3 flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      query.response?.trim()
                        ? "bg-yellow-400 text-black hover:bg-yellow-300"
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Send size={16} /> Send Response
                  </button>
                </div>
              ) : (
                <p className="mt-5 text-green-400 font-medium">
                  ✅ Responded: {query.response}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminResponse;
