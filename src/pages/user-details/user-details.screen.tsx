import React from 'react';

import UserDetailsUI from './components/user-details.component';

interface StateProps {
  match: {
    params: {
      id: string;
    };
  };
}

const UserDetails = (props: StateProps) => {
  const id = props.match.params.id;

  return <UserDetailsUI userId={id} />;
};

export default UserDetails;
