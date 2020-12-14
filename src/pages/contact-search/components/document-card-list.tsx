import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ContentLoader from 'react-content-loader';
import React, { ReactNode, useState } from 'react';
import { List, AutoSizer, ListRowProps, InfiniteLoader, WindowScroller } from 'react-virtualized';

import { RootState } from 'src/reducers';
import SearchEmpty from './search-empty';
import DocumentCard from './document-card';
import ToolTip from 'src/components/tool-tip';
import { MdFilterList } from 'react-icons/md';
import DocumentSortDialog from './document-sort-dialog';
import SecondarySearchBar from './secondary-search-bar';
import { LARGE_DEVICE, MEDIUM_DEVICE } from './constant';
import { IDocumentDetail } from '../contact-search.types';
import LoadingIndicator from 'src/components/loading-indicator';
import * as documentSearchActions from '../document-search.action';

interface StateProps {
  documents: Array<IDocumentDetail>;
  isContentLoading: boolean;
  hasNextPage: boolean;
  isDocumentEmpty: boolean;
  isDocumentLoading: boolean;
  loadMoreDocuments: () => void;
  searchDocuments: (secondarySearchKey: string) => void;
}

const DocumentsCardList = (props: StateProps) => {
  const { t } = useTranslation();

  const { documents, hasNextPage, isDocumentEmpty, isDocumentLoading, loadMoreDocuments } = props;
  const [isSortDialogOpen, toggleSortDialog] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>('');

  const _openSortDialog = () => toggleSortDialog(true);

  const _closeSortDialog = () => toggleSortDialog(false);

  const [itemPerRow, setItemPerRow] = useState<number>(4);

  const ITEMS_COUNT = documents.length;
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
    loadMoreDocuments();
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

    const rowItems: Array<ReactNode> = documents
      .slice(fromIndex, toIndex)
      .map((document) => <DocumentCard key={document.id} document={document} />);

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
            rowHeight={225}
            style={{ overflow: 'visible' }} // To make room for showing shadow effects of cards on the edge
            onRowsRendered={onRowsRendered}
            rowRenderer={_rowRenderer}
          />
          {props.isContentLoading && <ContentLoader />}
        </div>
      )}
    </AutoSizer>
  );

  const onSearch = (searchValue: string) => {
    setSearchKey(searchValue);
    props.searchDocuments(searchValue);
  };

  const onSearchCleared = () => onSearch('');

  const MainContent = () => {
    if (isDocumentEmpty)
      return (
        <SearchEmpty
          title={t('contactSearch.searchEmpty.documentTitle')}
          description={t('contactSearch.searchEmpty.documentDescription1', { searchKey: searchKey })}
        />
      );
    else if (isDocumentLoading) return <LoadingIndicator />;
    return (
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
    );
  };

  return (
    <>
      <div className="content-right">
        <SecondarySearchBar onSearchSubmit={onSearch} onCloseClicked={onSearchCleared} />
        <button className="btn btn__with-icon btn__with-icon--xs btn--outlined-grey ml-2x" onClick={_openSortDialog}>
          <ToolTip isAlwaysVisible description={t('tool-tip:sortDocuments')}>
            <MdFilterList />
          </ToolTip>
        </button>
      </div>
      <MainContent />

      <DocumentSortDialog isDialogOpen={isSortDialogOpen} closeDialog={_closeSortDialog} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  documents: state.documentSearch.documents,
  hasNextPage: state.documentSearch.hasNextPage,
  isDocumentEmpty: state.documentSearch.isDocumentEmpty,
  isContentLoading: state.documentSearch.isContentLoading,
  isDocumentLoading: state.documentSearch.isDocumentLoading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  searchDocuments: (secondarySearchKey: string) => dispatch(documentSearchActions.searchDocuments(secondarySearchKey)),
  loadMoreDocuments: () => dispatch(documentSearchActions.loadMoreDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsCardList);
