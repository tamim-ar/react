import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiPython, SiTensorflow, SiScikitlearn, SiKaggle } from 'react-icons/si';

const Home = () => {
  const socialLinks = [
    { icon: <FaGithub size={20} />, url: 'https://github.com/shafin-tamim' },
    { icon: <FaLinkedin size={20} />, url: 'https://linkedin.com/in/shafin-kader-tamim' },
    { icon: <FaEnvelope size={20} />, url: 'mailto:sktamim2000@gmail.com' }
  ];

  const skills = [
    { icon: <SiPython />, name: 'Python' },
    { icon: <SiTensorflow />, name: 'TensorFlow' },
    { icon: <SiScikitlearn />, name: 'Scikit-learn' },
    { icon: <SiKaggle />, name: 'Kaggle' }
  ];

  return (
    <section className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-content mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-secondary-light dark:text-secondary-dark text-lg font-medium mb-4 block">
              Data Scientist & ML Engineer
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-light dark:text-text-dark mb-6">
              Transforming Data into <span className="text-secondary-light dark:text-secondary-dark">Insights</span>
            </h1>
            
            <p className="text-lg text-muted-light dark:text-muted-dark mb-8 max-w-xl">
              Specializing in machine learning, deep learning, and data analytics. 
              Turning complex data into meaningful solutions.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center p-4 bg-surface-light dark:bg-surface-dark rounded-lg"
                >
                  <div className="text-2xl text-secondary-light dark:text-secondary-dark mb-2">
                    {skill.icon}
                  </div>
                  <span className="text-sm text-muted-light dark:text-muted-dark">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 mb-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-surface-light dark:bg-surface-dark rounded-full text-muted-light dark:text-muted-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <div className="flex gap-4">
              <a href="#projects" className="px-6 py-3 bg-secondary-light dark:bg-secondary-dark text-white rounded-lg hover:bg-accent-light dark:hover:bg-accent-dark transition-colors">
                View Projects
              </a>
              <a href="/resume.pdf" target="_blank" className="px-6 py-3 border-2 border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark rounded-lg hover:bg-secondary-light/10 dark:hover:bg-secondary-dark/10 transition-colors">
                Download CV
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-light/20 to-accent-light/20 dark:from-secondary-dark/20 dark:to-accent-dark/20 rounded-2xl blur-3xl animate-pulse"></div>
              <img 
                src="https://i.ibb.co/RMWvXT6/photo-2020-10-07-22-31-25.jpg"
                alt="Shafin Kader"
                className="relative w-full h-full rounded-2xl object-cover shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
