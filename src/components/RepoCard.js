import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/RepoCard.css';

const RepoCard = props => {
  return (
    <div className='repo-card'>
      <h4 className='border-bottom'>
        <Link to={`/repos/${props.name}`}>{props.name}</Link>
      </h4>
      <p>{props.description}</p>
      <p>{props.language}</p>
    </div>
  );
};

export default RepoCard;
