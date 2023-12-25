import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { User } from '../../services/types';
import './UsersTable.css';

type columnsSupported = 'name' | 'email'

interface UsersTableProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  isLoading: boolean;
  error: Error | null;
  selectedUserId: number | null,
  setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>,
  setSelectedUserName :React.Dispatch<React.SetStateAction<string | null>>
}

const UsersTable: React.FC<UsersTableProps> = ({ users, setUsers, isLoading, error, selectedUserId, setSelectedUserId ,setSelectedUserName}) => {
  const [sortOrder, setSortOrder] = useState({
    name: 'asc',
    email: 'asc',
  });
//this sort function 
  const handleSort = (column: columnsSupported) => {
    const newSortOrder = { ...sortOrder };
    newSortOrder[column] = newSortOrder[column] === 'asc' ? 'desc' : 'asc';

    const sortedUsers = [...users].sort((a, b) => {
      const aValue = a[column].toLowerCase();
      const bValue = b[column].toLowerCase();

      if (newSortOrder[column] === 'asc') {
        //-1 in ascending order i want 
        return aValue.localeCompare(bValue);
      } else {
        //1 
        return bValue.localeCompare(aValue);
      }
    });

    setUsers(sortedUsers);
    setSortOrder(newSortOrder);
  };

  const renderCell = (title: string, sortPropertyName?: columnsSupported) => {
    return <TableCell>
      {title}
      {sortPropertyName && (
        <Tooltip title="Sort">
          <IconButton onClick={() => handleSort(sortPropertyName)}>
            {sortOrder.name === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </IconButton>
        </Tooltip>)}
    </TableCell>
  }

  return (
    <>
    {isLoading && <p>Loading users...</p>}
    {error && <p>Error fetching users: {error.message}</p>}
    <TableContainer component={Paper} sx={{/*p:2*/ }}>
      <Table>
        <TableHead>
          <TableRow >
            {renderCell('Name', 'name')}
            {renderCell('Email', 'email')}
            {renderCell('Company name')}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 &&
            users.map((user: User) => (
            <TableRow className={user.id === selectedUserId ? 'selected-row' : 'table-row'} onClick={() => { setSelectedUserId(user.id); setSelectedUserName(user.name);}} key={user.id}>
                <TableCell  >{user.name}</TableCell>
                <TableCell >{user.email}</TableCell>
                <TableCell  >{user.company.name}</TableCell>
              </TableRow>

            ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default UsersTable;
