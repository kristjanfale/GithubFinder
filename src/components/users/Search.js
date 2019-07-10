import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  // Initialize Github and Alert Context
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');

  // When typing in input field, update state object(text)
  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    // Show alert if there is no text in input field
    if (text === '') {
      alertContext.setAlert('Please enter a name', 'danger');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='User Name...'
          value={text}
          onChange={onChange}
        />
        <input type='submit' value='Search' className='btn btn-primary' />
      </form>
      {/* if showClear is true, then show <button>... */}
      {githubContext.users.length > 0 && (
        <button className='btn btn-dark' onClick={githubContext.clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
