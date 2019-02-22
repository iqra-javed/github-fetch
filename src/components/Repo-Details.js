import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import '../styles/RepoDetails.css';

class RepoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readme: ''
    };
  }

  matchedRepo = this.props.repos.filter(
    repo => repo.name === this.props.match.params.name
  )[0];

  componentDidMount() {
    fetch(
      `https://api.github.com/repos/${this.matchedRepo.owner.login}/${
        this.matchedRepo.name
      }/readme`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then(data => {
        console.log(data);
        this.setState({ readme: data.html_url });
      })
      .catch(error => {
        console.log('Fetching Failed: ', error);
      });
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Link to='/repos'>
            <button
              style={{ margin: '20px 0', backgroundColor: 'mediumpurple' }}
            >
              Back
            </button>
          </Link>
          <h3>{this.matchedRepo.name}</h3>
        </div>

        <ul className='repo-info'>
          <li>
            <strong>Owner Username:</strong>
            {this.matchedRepo.owner.login}
          </li>
          <li>
            <strong>Repo URL:</strong>
            <a href={this.matchedRepo.html_url}>{this.matchedRepo.html_url}</a>
          </li>
          <li>
            <strong>Readme:</strong>
            <a href={this.state.readme}>{this.state.readme}</a>
          </li>
          <li>
            <strong>Watchers:</strong>
            {this.matchedRepo.watchers}
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(RepoDetails);
