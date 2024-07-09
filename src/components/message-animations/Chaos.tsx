import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  _id: any;
  message: string;
  username: string;
  profilePic: string;
}

interface ChaosProps {
  newMessage: Message | null;
}

const Chaos: React.FC<ChaosProps> = ({ newMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (newMessage) {
      const messageWithPosition = {
        ...newMessage,
        position: {
          x: Math.random() * (window.innerWidth - 200),
          y: Math.random() * (window.innerHeight - 100),
        },
      };
      setMessages((prevMessages) => [...prevMessages, messageWithPosition]);

      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg._id !== newMessage._id)
        );
      }, 3000 + Math.random() * 1000);
    }
    console.log(newMessage!.message);
  }, [newMessage]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message._id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="absolute  text-white p-2 rounded-lg  max-w-xs"
            style={{
              left: message.position?.x,
              top: message.position?.y,
            }}
          >
            <div className="flex items-center space-x-2">
              {/* <img
                src={message.profilePic}
                alt={message.username}
                className="w-8 h-8 rounded-full"
              /> */}
              <div>
                <p className="font-bold">kraken</p>
                <p>the pain of an average man.</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Chaos;
