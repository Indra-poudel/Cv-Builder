import React from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { SortDirection, SortDirectionType } from 'react-virtualized';

interface RcSortIconProps {
  sortDirection?: SortDirectionType;
  size?: number;
}

const RcSortIcon = (props: RcSortIconProps) => {
  return (
    <div className="sort-icon">
      <MdArrowDropUp
        className={
          'sort-icon-top ' + (props.sortDirection === SortDirection.DESC ? 'sort-icon-active' : 'sort-icon-disable')
        }
        size={props.size || 20}
      />
      <MdArrowDropDown
        className={
          'sort-icon-bottom ' + (props.sortDirection === SortDirection.ASC ? 'sort-icon-active' : 'sort-icon-disable')
        }
        size={props.size || 20}
      />
    </div>
  );
};

export default RcSortIcon;
