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
// Type for supported columns in sorting
type columnsSupported = 'name' | 'email'

// Props for the UsersTable component
interface UsersTableProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  isLoading: boolean;
  error: Error | null;
  selectedUserId: number | null,
  setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>,
  setSelectedUserName :React.Dispatch<React.SetStateAction<string | null>>
}
// UsersTable component
const UsersTable: React.FC<UsersTableProps> = ({ users, setUsers, isLoading, error, selectedUserId, setSelectedUserId ,setSelectedUserName}) => {
  // State to manage sorting order for each column
  const [sortOrder, setSortOrder] = useState({
    name: 'asc',
    email: 'asc',
  });
  // Function to handle sorting when a column header is clicked
  const handleSort = (column: columnsSupported) => {
    // Clone the current sorting order state to avoid mutation
    const newSortOrder = { ...sortOrder };
    // Toggle the sorting order for the clicked column
    newSortOrder[column] = newSortOrder[column] === 'asc' ? 'desc' : 'asc';
    // Clone the current users array to avoid mutation
    const sortedUsers = [...users].sort((a, b) => {
      // Extract the values of the clicked column for comparison
      const aValue = a[column].toLowerCase();
      const bValue = b[column].toLowerCase();

      // Compare values based on the sorting order
      if (newSortOrder[column] === 'asc') {
      // In ascending order, use localeCompare for string comparison       
       return aValue.localeCompare(bValue);
      } else {
      // In descending order, reverse the localeCompare result
        return bValue.localeCompare(aValue);
      }
    });
    // Update the users state with the sorted array
    setUsers(sortedUsers);
    // Update the sorting order state for the clicked column
    setSortOrder(newSortOrder);
  };
  // Function to render a table cell with optional sorting button
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
