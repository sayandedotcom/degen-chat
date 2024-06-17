import { motion } from "framer-motion";

interface Message {
  id: number;
  message: string;
}
export const Message: React.FC<Message> = ({ id, message }) => {
  return (
    <motion.div
      className=" text-white p-4 mb-2 rounded"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {message}
    </motion.div>
  );
};
