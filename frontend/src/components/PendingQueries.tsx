
const demoQueries = [
  {
    id: 1,
    email: "rahul@gmail.com",
    query: "I cannot upload the paper file, it says 'file too large'.",
    status: "Pending",
  },
  {
    id: 2,
    email: "sneha@outlook.com",
    query: "The subject dropdown is not showing for 3rd semester.",
    status: "Pending",
  },
  {
    id: 3,
    email: "amit@gmail.com",
    query: "Can you add previous year papers for Data Science course?",
    status: "Resolved",
  },
];

function PendingQueries() {
  return (
    <div className="text-white">
      <h3 className="text-2xl font-semibold mb-8">Pending Queries</h3>

      <div className="space-y-6">
        {demoQueries.map((q) => (
          <div
            key={q.id}
            className="border border-gray-500/50 rounded-2xl p-6 bg-black/30 backdrop-blur-md hover:border-yellow-400 transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-medium">Email - {q.email}</h4>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  q.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400/40"
                    : "bg-green-500/20 text-green-400 border border-green-400/40"
                }`}
              >
                {q.status}
              </span>
            </div>

            <p className="text-gray-300 mb-5 text-base">{q.query}</p>

            <button
              className="border border-white/50 hover:bg-yellow-400 hover:text-black font-semibold text-sm px-4 py-2 rounded-md transition-all"
            >
              Response
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default PendingQueries;

export default PendingQueries;
