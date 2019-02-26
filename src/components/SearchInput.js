import React, { Component } from 'react';

import '../styles/SearchInput.css';

const SearchInput = props => {


 
    return (
      <div className='input-container'>
        {props.error && (
          <div className='error-message'>
            <span>
              {props.error.status === 404 ? '' : props.error.status}
            </span>
            {props.error.statusText === 'Not Found'
              ? 'User not found. Please try again.'
              : props.error.statusText || props.error}
          </div>
        )}
        <form onSubmit={props.fetchUserHandler}>
        <input
          type='text'
          placeholder='Enter Github Username'
          name='currentUser'
        />
          <button className='search-btn'>
            Search
          </button>
          </form>
      </div>
    );
}

export default SearchInput;
