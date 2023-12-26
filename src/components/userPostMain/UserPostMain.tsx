import React, { useState } from 'react';
import UserPosts from '../userPosts/UserPosts';
import { Grid } from '@mui/material';
import SearchNameEmail from '../searchNameEmail/SearchNameEmail';
import UsersTableContainer from '../userTableContainer/UsersTableContainer';

interface UsersPostMainProps { }

const UsersPostMain: React.FC<UsersPostMainProps> = () => {
    // State to manage the selected user's ID
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    // State to manage the selected user's name
    const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
    // State to manage the search term for filtering users
    const [searchTerm, setSearchTerm] = useState<string>('');

 
// JSX structure of the component
    return <>
        <SearchNameEmail setSearchTerm={setSearchTerm} />        
        <Grid container spacing={2}>
            <Grid item xs={selectedUserId ? 8 : 12}>
                <UsersTableContainer searchTerm={searchTerm}  selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} setSelectedUserName={setSelectedUserName}/>
            </Grid>
          { selectedUserId && <Grid item xs={selectedUserId ? 4 : 0}>
                <UserPosts selectedUserId={selectedUserId} selectedUserName={selectedUserName}/>
            </Grid>}
        </Grid>
    </>;
};
// Exporting the component as the default export
export default UsersPostMain;
