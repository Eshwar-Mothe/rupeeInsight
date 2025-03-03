import React from 'react'

const Footer = () => {

  const footerStyles = {
    textAlign: 'center',
    fontSize: '1rem',
    paddingBlock: '1rem',
  }

  return (
    <>
    <footer class="fixed-bottom bg-dark-subtle text-dark-emphasis" style={footerStyles}>
        This is a footer component 
    </footer>
    </>
  )
}

export default Footer