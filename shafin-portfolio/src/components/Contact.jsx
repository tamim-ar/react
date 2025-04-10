import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1000px] mx-auto px-8"
      >
        <h2 className="text-4xl font-bold text-white">Contact Me</h2>
        <p className="text-[#8892b0] py-4">
          Feel free to reach out if you'd like to collaborate or have any questions.
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;
