import React from 'react';

import '../styles/RepoCard.css';

const RepoCard = props => {
    return (
        <div className="repo-card">
            <h4 className="border-bottom">{props.name}</h4>
            {/* <hr></hr> */}
            <p>{props.description}</p>
            <p>{props.language}</p>
        </div>
    )
}

export default RepoCard;