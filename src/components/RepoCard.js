import React from 'react';

const RepoCard = props => {
    return (
        <div style={{height: "200px", width: "200px"}}>
            <h4>{props.name}</h4>
            <hr></hr>
            <p>{props.description}</p>
            <p>{props.language}</p>
        </div>
    )
}

export default RepoCard;