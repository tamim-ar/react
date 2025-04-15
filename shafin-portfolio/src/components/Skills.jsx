import { motion } from 'framer-motion';
import { FaPython, FaHtml5, FaCss3Alt, FaReact, FaUnity } from 'react-icons/fa';
import { SiCplusplus, SiTensorflow, SiAdobephotoshop } from 'react-icons/si';

const Skills = () => {
  const skills = [
    { name: 'Python', icon: <FaPython /> },
    { name: 'C++', icon: <SiCplusplus /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'HTML5', icon: <FaHtml5 /> },
    { name: 'CSS3', icon: <FaCss3Alt /> },
    { name: 'TensorFlow', icon: <SiTensorflow /> },
    { name: 'Unity', icon: <FaUnity /> },
    { name: 'Adobe', icon: <SiAdobephotoshop /> },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1000px] mx-auto px-8"
      >
        <h2 className="text-4xl font-bold text-white mb-8">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center p-6 bg-darkSlate rounded-lg"
            >
              <div className="text-4xl text-secondary mb-4">{skill.icon}</div>
              <p className="text-white">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;
