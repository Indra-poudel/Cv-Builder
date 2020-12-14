import React from 'react';
import { connect } from 'react-redux';
import { RootState, AppDispatch } from 'src/reducers';

import * as homeActions from './home.actions';
import Counter from '../counter/counter.component';

interface StateProps {
  count: number;
  changeCount: (val: boolean) => void;
}

const HomeUi = (props: StateProps) => {
  const { count, changeCount } = props;

  return (
    <div>
      <h1>HOME</h1>
      <Counter changeCount={changeCount} count={count} />
    </div>
  );
};

const Home = (props: StateProps) => {
  return <HomeUi count={props.count} changeCount={props.changeCount} />;
};

function mapStateToProps(state: RootState) {
  return {
    count: state.home.count,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    changeCount: (shouldIncrement: Boolean) => {
      shouldIncrement ? dispatch(homeActions.incrementCount()) : dispatch(homeActions.decrementCount());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
