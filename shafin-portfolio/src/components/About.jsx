import { motion } from 'framer-motion';
import { FaGraduationCap, FaChartBar, FaLaptopCode } from 'react-icons/fa';

const About = () => {
  const experiences = [
    {
      icon: <FaGraduationCap />,
      title: "Education",
      description: "B.Sc. in Computer Science",
      details: "Focus on AI & Data Science",
      period: "2020 - 2024"
    },
    {
      icon: <FaChartBar />,
      title: "Data Science",
      description: "Machine Learning & Analytics",
      details: "Predictive Modeling, Data Mining",
      period: "2+ years"
    },
    {
      icon: <FaLaptopCode />,
      title: "Tech Stack",
      description: "Python, TensorFlow, SQL",
      details: "Data Processing & Modeling",
      period: "3+ years"
    }
  ];

  return (
    <section className="min-h-screen py-section px-4">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-6">
            About Me
          </h1>
          <p className="text-lg text-muted-light dark:text-muted-dark">
            Passionate about leveraging technology to solve real-world problems. 
            Specialized in machine learning and software development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 bg-surface-light dark:bg-surface-dark rounded-2xl"
            >
              <div className="text-3xl text-secondary-light dark:text-secondary-dark mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
                {item.title}
              </h3>
              <p className="text-muted-light dark:text-muted-dark mb-1">
                {item.description}
              </p>
              <p className="text-sm text-muted-light dark:text-muted-dark mb-2">
                {item.details}
              </p>
              <p className="text-sm text-secondary-light dark:text-secondary-dark">
                {item.period}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
