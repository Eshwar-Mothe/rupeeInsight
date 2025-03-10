import React, { useEffect, useRef, useState } from 'react'
import logo from '/logo.png'
import { Link } from 'react-router-dom'
const NavBar = () => {

  // Theme Button Styles

  const btnStyles = {
    border: 'none',
    alignItems: 'center',
    background: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
    fontWeight: '500',
  }

  const li = {
    fontSize: '1rem',
  }

  const [Theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "🌙";
  });
  const [animate, setAnimate] = useState(false);

  const handleTheme = () => {
    setAnimate(true);
    setTimeout(() => {
      setTheme((prev) => {
        const newTheme = prev === "⛅" ? "🌙" : "⛅";
        localStorage.setItem("theme", newTheme);
        return newTheme;
      });
      setAnimate(false);
    }, 400);
  };




  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(Theme === "🌙" ? "light" : "dark");

    const navbar = document.getElementById("navBar");
    if (navbar) {
      navbar.classList.remove("bg-light", "bg-dark-subtle");
      navbar.classList.add(Theme === "🌙" ? "bg-light" : "bg-dark-subtle");
    }
  }, [Theme]);


  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const navbarToggler = document.getElementById("navbarSupportedContent");

    const handleNavbarOpen = () => setIsOpen(true);
    const handleNavbarClose = () => setIsOpen(false);

    navbarToggler?.addEventListener("shown.bs.collapse", handleNavbarOpen);
    navbarToggler?.addEventListener("hidden.bs.collapse", handleNavbarClose);

    return () => {
      navbarToggler?.removeEventListener("shown.bs.collapse", handleNavbarOpen);
      navbarToggler?.removeEventListener("hidden.bs.collapse", handleNavbarClose);
    };
  }, []);



  return (
    <>
      <nav id='navBar' className="navbar  bg-body-tertiary navbar-expand-lg">
        <div className="container-fluid ">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="rupeeInsight" width="40" height="40" />Rupee Insight
          </Link>
          <button id='toggle' className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            
            {isOpen ? <span id="hamburger">&#10006;</span> : <span className="navbar-toggler-icon" id="hamburger"></span>}
          
          </button>
        </div>
        <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={li}>
            <li className="nav-item">
              <a className="nav-link active" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#stats">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#features">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={'#facts'}>How We Do</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#taxCal">Tax Calculator</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={'#security'}>Security</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={'#joinForm'}>Register/Login</a>
            </li>
          </ul>

          {/* button to toggle the theme */}
          <button style={{ ...btnStyles, transform: animate ? 'rotateY(180deg)' : 'rotateY(0deg)' }} onClick={handleTheme} title='change theme'>{Theme}</button>
        </div>
      </nav>
    </>
  )
}

export default NavBar