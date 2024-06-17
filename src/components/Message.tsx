import { motion } from "framer-motion";

interface Message {
  message: string;
  username: string;
}
export const MessageComponent: React.FC<Message> = ({ username, message }) => {
  return (
    <motion.div
      className=" text-white p-4 mb-2 rounded flex gap-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <p>{username}</p>
      <p>{message}</p>
    </motion.div>
  );
};
