import React, { Component } from 'react';

import RepoContainer from './RepoContainer';
import '../styles/SearchInput.css';

class SearchInput extends Component {
  state = {
    currentUser: '',
    currentUserRepos: [],
    error: ''
  };

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchUserHandler = () => {
    let user = this.state.currentUser;

    fetch(`https://api.github.com/users/${user}/repos`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        let error = Object.assign(
          {},
          {
            status: response.status,
            statusText: response.statusText
          }
        );
        this.setState({ error });
        return Promise.reject(error);
      })
      .then(data => {
       data.sort((a, b) => {
          return b.stargazers_count - a.stargazers_count;
        });
        this.setState({ currentUserRepos: data, currentUser: '', error: {} });
      })
      .catch(error => {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.statusText
        );
      });
  };

  render() {
    return (
      <div className='input-container'>
        {this.state.error && (
          <div className='error-message'>
            <span>
              {this.state.error.status === 404 ? '' : this.state.error.status}
            </span>
            {this.state.error.statusText === 'Not Found'
              ? 'User not found. Please try again.'
              : this.state.error.statusText}
          </div>
        )}
        <input
          type='text'
          placeholder='Enter Github Username'
          name='currentUser'
          value={this.state.currentUser}
          onChange={this.inputChangeHandler}
        />
        <button onClick={this.fetchUserHandler}>Search</button>
        <RepoContainer repos={this.state.currentUserRepos}/>
      </div>
    );
  }
}

export default SearchInput;
