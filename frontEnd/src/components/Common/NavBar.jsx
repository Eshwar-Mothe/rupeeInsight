import React, { useEffect, useState } from 'react';
import logo from '/logo.png';
import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ heroRef, statsRef, featuresRef, aboutRef, taxRef, reviewsRef }) => {
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgotpassword';

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || '🌙');
  const [animate, setAnimate] = useState(false);

  const handleTheme = () => {
    setAnimate(true);
    setTimeout(() => {
      setTheme((prev) => {
        const newTheme = prev === '⛅' ? '🌙' : '⛅';
        localStorage.setItem('theme', newTheme);
        return newTheme;
      });
      setAnimate(false);
    }, 400);
  };

  const handleScroll = (ref) => {
    if (ref?.current) ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.body.classList.toggle('light', theme === '🌙');
    document.body.classList.toggle('dark', theme !== '🌙');

    const navbar = document.getElementById('navBar');
    if (navbar) {
      navbar.classList.toggle('bg-light', theme === '🌙');
      navbar.classList.toggle('bg-dark-subtle', theme !== '🌙');
    }
  }, [theme]);

  useEffect(() => {
    const observerOptions = { root: null, threshold: 0.5};
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = [heroRef, statsRef, featuresRef, aboutRef, reviewsRef, taxRef];

    sections.forEach((ref) => ref?.current && observer.observe(ref.current));

    return () => {
      sections.forEach((ref) => ref?.current && observer.unobserve(ref.current));
    };
  }, []);

  return (
    <nav id="navBar" className="navbar bg-body-tertiary navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ fontWeight: 500 }}>
          <img src={logo} alt="rupeeInsight" width="40" height="40" /> Rupee Insight
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {[
            { ref: heroRef, label: 'Home', id: 'hero' },
            { ref: featuresRef, label: 'Features', id: 'features' },
            { ref: aboutRef, label: 'How We Do', id: 'about' },
            { ref: reviewsRef, label: 'User Reviews', id: 'reviews' },
            { ref: taxRef, label: 'Tax Calculator', id: 'tax' },
          ].map(({ ref, label, id }) => (
            <li className="nav-item" key={id}>
              <button
                className={`nav-link ${activeSection === id ? 'active-link' : ''}`}
                onClick={() => handleScroll(ref)}
                disabled={isAuthPage}
                style={isAuthPage ? { cursor: 'not-allowed', opacity: 0.6 } : {}}
              >
                {label}
              </button>
            </li>
          ))}
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Register/Login
            </Link>
          </li>
        </ul>

        <button
          style={{
            border: 'none',
            background: 'none',
            fontSize: '2rem',
            cursor: isAuthPage ? 'not-allowed' : 'pointer',
            transition: 'transform 0.3s ease-in-out',
            fontWeight: '500',
            transform: animate ? 'rotateY(180deg)' : 'rotateY(0deg)',
            opacity: isAuthPage ? 0.6 : 1,
          }}
          onClick={!isAuthPage ? handleTheme : undefined}
          title="Change Theme"
          disabled={isAuthPage}
        >
          {theme}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
