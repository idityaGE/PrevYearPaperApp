import axios from 'axios';
import  { useEffect, useState } from 'react';
import { BACKEND_URL } from '../lib/config';

function AdminMessage({ userId }:{ userId: number }) {
  type Query = {
    id: number;
    message: string;
    response?: string;
  };

  const [queries, setQueries] = useState<Query[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/user/queries/${userId}`);
      setQueries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white shadow-lg rounded-xl w-96 p-4 border">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Admin Messages</h2>
          {queries.filter(q => q.response ).length === 0 ? (
            <p className="text-gray-500">No messages yet.</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {queries.map(q => (
                <div key={q.id} className="border p-2 rounded-lg">
                  <p className="text-sm text-gray-600">🧑‍💻 You: {q.message}</p>
                  {q.response && (
                    <p className="text-sm text-green-600 mt-1">
                      🏢 Admin: {q.response}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AdminMessage;
