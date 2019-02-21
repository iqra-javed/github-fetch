import React from 'react';

import RepoCard from './RepoCard';

const RepoContainer = props => {
  let non_forked_repos = props.repos.filter(repo => !repo.fork);

  return non_forked_repos.map(repo => (
    <RepoCard
      key={repo.id}
      name={repo.name}
      description={repo.description}
      language={repo.language}
    />
  ));
};

export default RepoContainer;
