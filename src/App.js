import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import User from './components/users/User';
import About from './components/pages/About';
import './App.css';

class App extends React.Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  // // Fetch data and update state object(users and loading)
  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const response = await fetch(
  //     `https://api.github.com/users?client_io=${
  //       process.env.REACT_APP_GITHUB_CLIENT_ID
  //     }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   const data = await response.json();

  //   this.setState({ users: data, loading: false });
  // }

  // Search Github users and update state object(users and loading)
  searchUsers = async text => {
    this.setState({ loading: true });

    const response = await fetch(
      `https://api.github.com/search/users?q=${text}&client_io=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await response.json();
    this.setState({ users: data.items, loading: false }); // data.items is only for the search results
  };

  // Get single Github user
  getSingleUser = async username => {
    this.setState({ loading: true });

    const response = await fetch(
      `https://api.github.com/users/${username}?client_io=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await response.json();
    this.setState({ user: data, loading: false });
  };

  // Get users repos
  getUserRepos = async username => {
    this.setState({ loading: true });

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:ascc&client_io=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await response.json();
    this.setState({ repos: data, loading: false });
  };

  // Clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // Set alert
  setAlert = (msg, style) => {
    this.setState({ alert: { msg: msg, style: style } });
    // Delete alert after 4sec
    setTimeout(() => {
      this.setState({ alert: null });
    }, 4000);
  };

  render() {
    const { users, loading, user, repos } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Alert alert={this.state.alert} />
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />

              <Route exact path='/about' component={About} />

              {/* :login can be acces in User component as a parameter */}
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getSingleUser={this.getSingleUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
