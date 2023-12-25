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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
                console.log('Fetched users:', fetchedUsers);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    

  const filteredUsers = users.filter(
    (user) =>
    searchTerm?
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()):true
  );

    return  <UsersTable users={filteredUsers} setUsers={setUsers} isLoading={isLoading} error={error} selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} setSelectedUserName={setSelectedUserName}/>
     
};

export default UsersTableContainer;
