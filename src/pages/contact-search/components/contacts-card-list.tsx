import { connect } from 'react-redux';
import { MdFilterList } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import ContentLoader from 'react-content-loader';
import React, { ReactNode, useState } from 'react';
import { List, AutoSizer, ListRowProps, InfiniteLoader, WindowScroller } from 'react-virtualized';

import ContactCard from './contact-card';
import { RootState } from 'src/reducers';
import SearchEmpty from './search-empty';
import ToolTip from 'src/components/tool-tip';
import ContactSortDialog from './contact-sort-dialog';
import { IContactDetail } from '../contact-search.types';
import { LARGE_DEVICE, MEDIUM_DEVICE } from './constant';
import LoadingIndicator from 'src/components/loading-indicator';
import * as contactSearchActions from '../contact-search.action';

interface StateProps {
  contacts: Array<IContactDetail>;
  loadMoreContacts: () => void;
  isContentLoading: boolean;
  hasNextPage: boolean;
  isRecordEmpty: boolean;
  isLoading: boolean;
  searchKey: string;
}

const ContactsCardList = (props: StateProps) => {
  const { contacts, loadMoreContacts, hasNextPage } = props;

  const { t } = useTranslation();

  const [isSortDialogOpen, toggleSortDialog] = useState<boolean>(false);

  const _openSortDialog = () => toggleSortDialog(true);

  const _closeSortDialog = () => toggleSortDialog(false);

  const [itemPerRow, setItemPerRow] = useState<number>(4);

  const ITEMS_COUNT = contacts.length;
  const rowcount = Math.ceil(ITEMS_COUNT / itemPerRow);

  const handleResize = () => {
    if (window.innerWidth >= LARGE_DEVICE) setItemPerRow(4);
    else if (window.innerWidth >= MEDIUM_DEVICE) setItemPerRow(3);
    else setItemPerRow(2);
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // cannot match the requested type by "loadMoreRows" in InfiniteLoader component
  const _loadMoreRows = (): any => {
    if (props.isContentLoading) {
      return;
    }

    loadMoreContacts();
  };

  const _containerStyle = () => ({
    width: '100%',
    height: 'calc(100vh - 205px)',
  });

  const _isRowLoaded = ({ index }: { index: number }): boolean => !hasNextPage || index < rowcount;

  const infiniteLoaderRowCount = hasNextPage ? rowcount + 1 : rowcount;

  const _rowRenderer = ({ index, key, style }: ListRowProps) => {
    const fromIndex = index * itemPerRow;
    const toIndex = Math.min(fromIndex + itemPerRow, ITEMS_COUNT);

    const rowItems: Array<ReactNode> = contacts
      .slice(fromIndex, toIndex)
      .map((contact) => <ContactCard key={contact.id} contact={contact} />);

    return (
      <div key={key} style={style}>
        <div className="row">{rowItems}</div>
      </div>
    );
  };

  const VirtualizedContent = ({ height, scrollTop, isScrolling, onRowsRendered, registerChild }: any) => (
    <AutoSizer disableHeight>
      {({ width }) => (
        <div>
          <List
            ref={registerChild}
            autoHeight={true}
            height={height}
            width={width}
            scrollTop={scrollTop}
            isScrolling={isScrolling}
            rowCount={rowcount}
            rowHeight={210}
            style={{ overflow: 'visible' }} // To make room for showing shadow effects of cards on the edge
            onRowsRendered={onRowsRendered}
            rowRenderer={_rowRenderer}
          />
          {props.isContentLoading && <ContentLoader />}
        </div>
      )}
    </AutoSizer>
  );

  if (props.isLoading) return <LoadingIndicator />;

  if (props.isRecordEmpty)
    return (
      <SearchEmpty
        title={t('contactSearch.searchEmpty.title')}
        description={t('contactSearch.searchEmpty.description1', { searchKey: props.searchKey })}
      />
    );

  return (
    <>
      <div className="content-right">
        <button className="btn btn__with-icon btn__with-icon--xs btn--outlined-grey ml-2x" onClick={_openSortDialog}>
          <ToolTip isAlwaysVisible description={t('tool-tip:sortDocuments')}>
            <MdFilterList />
          </ToolTip>
        </button>
      </div>
      <InfiniteLoader
        loadMoreRows={_loadMoreRows}
        rowCount={infiniteLoaderRowCount}
        isRowLoaded={_isRowLoaded}
        threshold={2}
        style={_containerStyle()}>
        {({ onRowsRendered, registerChild }) => {
          return (
            <div style={_containerStyle()}>
              <WindowScroller>
                {(props) => (
                  <VirtualizedContent {...props} onRowsRendered={onRowsRendered} registerChild={registerChild} />
                )}
              </WindowScroller>
            </div>
          );
        }}
      </InfiniteLoader>
      <ContactSortDialog isDialogOpen={isSortDialogOpen} closeDialog={_closeSortDialog} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoading: state.contactSearch.isLoading,
  contacts: state.contactSearch.contacts,
  isContentLoading: state.contactSearch.isContentLoading,
  hasNextPage: state.contactSearch.hasNextPage,
  isRecordEmpty: state.contactSearch.isRecordEmpty,
  searchKey: state.contactSearch.searchKey,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loadMoreContacts: () => dispatch(contactSearchActions.loadMoreContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsCardList);
