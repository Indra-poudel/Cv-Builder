import { connect } from 'react-redux';
import React, { useEffect } from 'react';

import * as clientDetailsAction from './client-details.action';
import ClientDetailUI from './components/client-details.component';

interface StateProps {
  match: {
    params: {
      id: string;
    };
  };
  fetchClientDetails: (id: string) => void;
}

const ClientDetail = (props: StateProps) => {
  const id = props.match.params.id;

  useEffect(() => {
    props.fetchClientDetails(id);
  }, []);

  return <ClientDetailUI />;
};

const mapDispatchToProps = (dispatch: Function) => ({
  fetchClientDetails: (id: string) => dispatch(clientDetailsAction.fetchClientDetail(id)),
});

export default connect(null, mapDispatchToProps)(ClientDetail);
