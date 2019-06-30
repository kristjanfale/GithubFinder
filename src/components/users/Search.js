import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  // props - searchUser, clearUsers, showClear
  state = {
    text: ''
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  // When typing in input field, update state object(text)
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // When submiting the form: 1) Call searchUsers() (a prop method) with updated state object(text) as an parameter. 2) Update state object(text)
  onSubmit = e => {
    e.preventDefault();
    // Show alert if there is no text in input field
    if (this.state.text === '') {
      this.props.setAlert('Please enter a name', 'danger'); // Sending this 'up' to App.js component
    } else {
      this.props.searchUsers(this.state.text); // Sending this 'up' to App.js component
      this.setState({ text: '' });
    }
  };

  render() {
    const { showClear, clearUsers } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='User Name...'
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-light btn-block'
          />
        </form>
        {/* if this.props.showClear is true, then show <button>... */}
        {showClear && (
          <button
            className='btn btn-dark btn-block'
            onClick={clearUsers} // Sending this 'up' to App.js component
          >
            Clear All
          </button>
        )}
      </div>
    );
  }
}

export default Search;
