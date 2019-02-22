import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AppBar from './components/AppBar';
import SearchInput from './components/SearchInput';
import RepoDetails from './components/Repo-Details';
import './App.css';
import RepoContainer from './components/RepoContainer';
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserRepos: [],
      error: '',
      isLoading: false
    };
  }

  fetchUserHandler = user => {
    this.setState({ isLoading: true });

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
            // sort in decending order by number of stars
            data.sort((a, b) => {
              return b.stargazers_count - a.stargazers_count;
            });
            this.setState({
              currentUserRepos: data,
              error: '',
              isLoading: false
            });
          })
          .catch(error => {
            console.log('Fetching Failed: ', error.statusText);
          })
      : this.setState({
          error: 'Please enter a user to continue.',
          isLoading: false
        });
  };

  render() {
    let loading = <img src={logo} className='app-logo' alt='logo' />;
   
    return (
      <div className='App'>
        <AppBar title='Github Browser' />
        <SearchInput {...this.state} fetchUserHandler={this.fetchUserHandler} />
        <Switch>
        <Route exact path='/repos'>
          {!this.state.isLoading ? (
            <RepoContainer repos={this.state.currentUserRepos} />
          ) : (
            loading
          )}
        </Route>
        <Route
          exact
          path='/repos/:name'
          render={() => <RepoDetails repos={this.state.currentUserRepos} />}
        />
        </Switch>
      </div>
    );
  }
}

export default App;
