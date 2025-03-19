import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ExploreButton = () => {

  return (
    <Link to="/signup" className="explore w-50 btn btn-light">
      Explore More &rarr;
    </Link>
  );
};

export default ExploreButton;
