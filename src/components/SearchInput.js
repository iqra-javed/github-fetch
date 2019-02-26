import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/SearchInput.css';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: ''
    };
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchDataAndClearInput = () => {
    this.props.fetchUserHandler(this.state.currentUser);
    this.setState({ currentUser: '' });
  };

  render() {
    return (
      <div className='input-container'>
        {this.props.error && (
          <div className='error-message'>
            <span>
              {this.props.error.status === 404 ? '' : this.props.error.status}
            </span>
            {this.props.error.statusText === 'Not Found'
              ? 'User not found. Please try again.'
              : this.props.error.statusText || this.props.error}
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
        <Link to={'/repos'}>
          <button className='search-btn' onClick={this.fetchDataAndClearInput}>
            Search
          </button>
        </Link>
      </div>
    );
  }
}

export default SearchInput;
