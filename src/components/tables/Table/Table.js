import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';

export const Table = styled.div`
  display: table;
  border-spacing: 0 1rem;
  width: 100%;
`;

export const TableHead = styled.div`
  display: table-header-group;
`;

export const TableBody = styled.div`
  display: table-row-group;
`;

export const TableHeadCell = styled.div`
  display: table-cell;
  padding: 11px 18px;
  color: #a1abb8;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 15px;
  text-transform: uppercase;
`;

export const TableBodyCell = styled.div`
  display: table-cell;
  padding: 11px 18px;
  height: 56px;
  color: #4f5660;
  font-size: 14px;
  line-height: 16px;
  vertical-align: middle;

  &.nowrap {
    white-space: nowrap;
  }

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }
`;

export const TableRow = ({ children, link, href }) => {
  const style = css`
    display: table-row;
    margin: 1rem 0;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(178, 195, 214 ,0.5);

    &:nth-child(odd) {
      background: #ffffff;
    }
    
    &:nth-child(even) {
      background: #f3f4f5;
    }
  `;

  if (link) {
    const RowLink = styled(Link)`${style}`;

    return (
      <RowLink to={link}>
        {children}
      </RowLink>
    );
  }

  if (href) {
    const RowLink = styled.a`${style}`;

    return (
      <RowLink href={href}>
        {children}
      </RowLink>
    );
  }

  const RowLink = styled.div`${style}`;

  return (
    <RowLink>
      {children}
    </RowLink>
  );
};

TableRow.propTypes = {
  children: PropTypes.array.isRequired,
  href: PropTypes.string,
  link: PropTypes.string,
};

