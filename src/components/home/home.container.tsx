import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import * as homeActions from './home.actions';
import Counter from '../counter/counter.component';
import { RootState, AppDispatch } from 'src/reducers';

interface StateProps {
  count: number;
  changeCount: (val: boolean) => void;
}

const HomeUi = (props: StateProps) => {
  const { count, changeCount } = props;

  const { t } = useTranslation(['home']);

  return (
    <div>
      <h1>{t('home:title')}</h1>
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
