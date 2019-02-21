import React from 'react';

import RepoCard from './RepoCard';
import '../styles/RepoContainer.css';

const RepoContainer = props => {
  let non_forked_repos = props.repos.filter(repo => !repo.fork);

  return (
    <div className='repo-container'>
      {non_forked_repos.map(repo => (
        <RepoCard
          key={repo.id}
          name={repo.name}
          description={repo.description}
          language={
            repo.language ? (
              `Languages: ${repo.language}`
            ) : (
              <span
                style={{
                  border: '1px solid lightgray ',
                  backgroundColor: '#eee',
                  borderRadius: '3px',
                  padding: '5px'
                }}
              >
                No Language Detected
              </span>
            )
          }
        />
      ))}
    </div>
  );
};

export default RepoContainer;
