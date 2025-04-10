import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  
  const handleClick = () => setNav(!nav);

  const links = [
    { to: "/", text: "Home" },
    { to: "/about", text: "About" },
    { to: "/projects", text: "Projects" },
  ];

  return (
    <header className="fixed w-full h-20 flex justify-between items-center px-8 bg-primary-light/90 dark:bg-primary-dark/90 backdrop-blur-sm text-text-light dark:text-text-dark shadow-lg z-50 transition-all duration-300">
      <Link to="/" className="text-2xl font-bold text-secondary-light dark:text-secondary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors">
        SK.T
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-8">
        <ul className="flex gap-8">
          {links.map((link, index) => (
            <li key={index}>
              <Link 
                to={link.to}
                className="text-lg hover:text-secondary-light dark:hover:text-secondary-dark transition-colors duration-300"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-card-light dark:hover:bg-card-dark transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <FaSun className="text-secondary-dark" /> : <FaMoon className="text-secondary-light" />}
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button onClick={handleClick} className="md:hidden text-2xl">
        {!nav ? <FaBars /> : <FaTimes />}
      </button>

      {/* Mobile Menu */}
      {nav && (
        <div className="fixed inset-0 bg-primary/95 md:hidden">
          <nav className="h-full flex items-center justify-center">
            <ul className="flex flex-col gap-8 text-center">
              {links.map((link, index) => (
                <li key={index}>
                  <Link 
                    onClick={handleClick}
                    to={link.to}
                    className="text-2xl hover:text-secondary-light dark:hover:text-secondary-dark transition-colors duration-300"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
