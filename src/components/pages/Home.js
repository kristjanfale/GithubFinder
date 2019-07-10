import React, { Fragment } from 'react';
import Alert from '../layout/Alert';
import Users from '../users/Users';
import Search from '../users/Search';

function Home() {
  return (
    <Fragment>
      <Alert />
      <Search />
      <Users />
    </Fragment>
  );
}

export default Home;
