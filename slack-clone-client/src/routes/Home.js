/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const Home = ({ data: {allUsers = [] }}) =>
  (allUsers.map(user => <h1 key={user.id}>{user.email}</h1>));

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

export default () => <Query query={allUsersQuery}>{Home}</Query>;
