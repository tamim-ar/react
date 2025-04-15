import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: "Tomato Leaf Disease Detection",
      description: "Developed a system for detecting tomato leaf diseases using image analysis. The system utilizes YOLOv8 for accurate disease detection and classification, with a web interface for easy access.",
      technologies: ["YOLOv8", "Flask", "Python", "HTML", "CSS"],
      github: "#",
      demo: "#"
    },
    {
      title: "Railway Management System",
      description: "Created a GUI-based railway ticketing and schedule management system. Features include ticket booking, schedule management, and passenger information tracking.",
      technologies: ["Java", "Swing", "MySQL"],
      github: "#"
    },
    {
      title: "Restaurant Management System",
      description: "Designed an efficient order and delivery management application. Streamlines restaurant operations with features for order processing and delivery tracking.",
      technologies: ["Java", "Swing"],
      github: "#"
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
            Featured Projects
          </h1>
          <p className="text-lg text-muted-light dark:text-muted-dark">
            A collection of my notable works and contributions
          </p>
        </motion.div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">
                  {project.title}
                </h3>
                <p className="text-muted-light dark:text-muted-dark">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-primary-light dark:bg-primary-dark rounded-full text-muted-light dark:text-muted-dark"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-secondary-light dark:text-secondary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                  >
                    <FaGithub /> Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-secondary-light dark:text-secondary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                    >
                      <FaExternalLinkAlt /> Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
