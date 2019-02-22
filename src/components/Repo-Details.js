import React from 'react';
import { withRouter } from 'react-router-dom';

import '../styles/RepoDetails.css'

const RepoDetails = props => {
   
    let matchedRepo = props.repos.filter(repo => repo.name === props.match.params.name)[0]
 
    return (
        <div>
            <h3>{matchedRepo.name}</h3>
            <ul className="repo-info">
                <li>{`Owner Username: ${matchedRepo.owner.login}`}</li>
                <li>{`Repo URL: ${matchedRepo.url}`}</li>
                <li>{`Watchers: ${matchedRepo.watchers}`}</li>
                
            </ul>
        </div>
    )
}


export default withRouter(RepoDetails);