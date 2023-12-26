import React, { useState, useEffect } from 'react';
import UsersTable from '../usersTable/UsersTable';
import { fetchUsers } from '../../services/api';
import { User } from '../../services/types';

interface UsersTableContainerProps { 
    searchTerm:string|null,
    selectedUserId:number|null,
    setSelectedUserId:React.Dispatch<React.SetStateAction<number | null>>,
    setSelectedUserName:React.Dispatch<React.SetStateAction<string | null>>
}

const UsersTableContainer: React.FC<UsersTableContainerProps> = ({searchTerm, selectedUserId,setSelectedUserId, setSelectedUserName}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // useEffect to fetch users when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch users using the API service
                const fetchedUsers = await fetchUsers();
                // Set the fetched users in the state
                setUsers(fetchedUsers);
                console.log('Fetched users:', fetchedUsers);
            } catch (error) {
                // Handle any errors that occur during data fetching
                setError(error as Error);
            } finally {
                // Set loading status to false, regardless of success or failure
                setIsLoading(false);
            }
        };
        // Invoke the fetchData function when the component mounts
        fetchData();
    }, []);
    
  // Filter users based on the search term (if provided)
  const filteredUsers = users.filter(
    (user) =>
    searchTerm?
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()):true
  );
    // Render the UsersTable component with the filtered users and other props
    return  <UsersTable users={filteredUsers} setUsers={setUsers} isLoading={isLoading} error={error} selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} setSelectedUserName={setSelectedUserName}/>
     
};

export default UsersTableContainer;
