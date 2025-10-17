import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const MessageIcon = ({ userId, onClick }:{ userId: number; onClick: () => void; }) => {
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/query/user/${userId}/queries`);
        const data = await res.json();
        // Check if any message has a new admin response
        const newMsg = data.some((q: { isResponded: boolean; response: any; userSeen: boolean }) => q.isResponded && q.response && !q.userSeen);
        setHasNewMessage(newMsg);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQueries();
  }, [userId]);

  return (
    <div
      className="fixed bottom-6 right-6 cursor-pointer relative"
      onClick={onClick}
    >
      <MessageCircle size={40} className="text-blue-600" />
      {hasNewMessage && (
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
      )}
    </div>
  );
};

export default MessageIcon;
