import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ({ heroRef, statsRef, featuresRef, aboutRef, taxRef, reviewsRef }) => {

  const footerStyles = {
    textAlign: 'center',
    fontSize: '1rem',
    paddingBlock: '1rem',
    border: '3px solid #010e01',
    borderStyle: 'solid none none none '
  }

  return (
    <>
      <footer className="bg-dark-subtle text-dark-emphasis" style={footerStyles}>
        {/* <h3>RupeeInsight</h3> */}
        <div className="d-flex justify-content-around text-center">
          <div>
            <ul>
            <h4>RupeeInsight</h4>
              <li className="nav-item">All Copy Rights Reserved &copy;2025</li>
            </ul>
          </div>

          <div>
            <ul>
            <h4>Join Our Community</h4>
              <li className="nav-item"> <Link to={'/signup'} className='nav-link'>SingUp</Link></li>
              <li className="nav-item"> <Link to={'/signin'} className='nav-link'>SignIn</Link></li>
            </ul>
          </div>

          <div>
            <ul>
            <h4>About Us</h4>
              <li className="nav-item" ref={featuresRef}>Features</li>
              <li className="nav-item"><Link to="./" className="nav-link">How we Do..?</Link></li>
              <li className="nav-item"><Link to="./" className="nav-link">Tax</Link></li>
            </ul>
          </div>

          <div>
            <ul>
            <h4>Reach Us</h4>
              <li className="nav-item"><Link to="./" className="nav-link">linkedIn</Link></li>
              <li className="nav-item"><Link to="./" className="nav-link">Twitter</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer