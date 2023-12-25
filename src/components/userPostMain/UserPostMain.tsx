import React, { useState } from 'react';
import UserPosts from '../userPosts/UserPosts';
import { Grid } from '@mui/material';
import SearchNameEmail from '../searchNameEmail/SearchNameEmail';
import UsersTableContainer from '../userTableContainer/UsersTableContainer';

interface UsersPostMainProps { }

const UsersPostMain: React.FC<UsersPostMainProps> = () => {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

 

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

export default UsersPostMain;
