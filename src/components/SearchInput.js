import React, { Component } from 'react';

import RepoContainer from './RepoContainer';
import '../styles/SearchInput.css';
import logo from '../logo.svg';

class SearchInput extends Component {
  state = {
    currentUser: '',
    currentUserRepos: [],
    error: '',
    isLoading: false
  };

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchUserHandler = () => {
    this.setState({ isLoading: true });
    let user = this.state.currentUser;
    user
      ? fetch(`https://api.github.com/users/${user}/repos?per_page=100`)
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
            this.setState({
              error: error,
              currentUserRepos: [],
              isLoading: false
            });
            return Promise.reject(error);
          })
          .then(data => {
            data.sort((a, b) => {
              return b.stargazers_count - a.stargazers_count;
            });
            this.setState({
              currentUserRepos: data,
              currentUser: '',
              error: '',
              isLoading: false
            });
          })
          .catch(error => {
            console.log('Fetching Failed: ', error.statusText);
          })
      : this.setState({ error: 'Please enter a user to continue.' });
  };

  render() {
    const loading = <img src={logo} className='app-logo' alt='logo' />;
    return (
      <React.Fragment>
        <div className='input-container'>
          {this.state.error && (
            <div className='error-message'>
              <span>
                {this.state.error.status === 404 ? '' : this.state.error.status}
              </span>
              {this.state.error.statusText === 'Not Found'
                ? 'User not found. Please try again.'
                : this.state.error.statusText || this.state.error}
            </div>
          )}
          <input
            type='text'
            placeholder='Enter Github Username'
            name='currentUser'
            value={this.state.currentUser}
            onChange={this.inputChangeHandler}
            required
          />
          <button onClick={this.fetchUserHandler}>Search</button>
        </div>
        {!this.state.isLoading ? (
          <RepoContainer repos={this.state.currentUserRepos} />
        ) : (
          loading
        )}
      </React.Fragment>
    );
  }
}

export default SearchInput;
