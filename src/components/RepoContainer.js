import React from 'react';

import RepoCard from './RepoCard';
import '../styles/RepoContainer.css'

const RepoContainer = props => {
  let non_forked_repos = props.repos.filter(repo => !repo.fork);

  return (<div className="repo-container">{non_forked_repos.map(repo => (
    <RepoCard
      key={repo.id}
      name={repo.name}
      description={repo.description}
      language={repo.language}
    />
  ))}</div>);
};

export default RepoContainer;
