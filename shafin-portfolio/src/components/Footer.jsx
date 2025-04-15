import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/shafin-tamim', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/shafin-kader-tamim', label: 'LinkedIn' },
    { icon: <FaEnvelope />, url: 'mailto:sktamim2000@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="w-full bg-darkSlate py-6 px-8">
      <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-lightSlate">© 2023 Shafin Kader Tamim</p>
        <div className="flex gap-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent text-xl transition-colors"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
