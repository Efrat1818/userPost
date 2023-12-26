import React, { useState, useEffect } from 'react';
import { fetchPostsByUserId } from '../../services/api';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  List,
  ListItem,
  Paper,
} from '@mui/material';
import { Post } from '../../services/types'; // Assuming a Post interface
import NewPost from '../newPost/NewPost';
import {createPost} from '../../services/api';


interface UserPostsProps {
  selectedUserId: number | null;
  selectedUserName:string | null;
}

const UserPosts: React.FC<UserPostsProps> = ({ selectedUserId,selectedUserName }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // useEffect to fetch posts when selectedUserId changes
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch posts by the selected user's ID
        const fetchedPosts = await fetchPostsByUserId(selectedUserId as number);
        // Update the posts state with the fetched data
        setPosts(fetchedPosts);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    // Check if a user is selected before fetching posts
    if (selectedUserId) {
      fetchPosts();
    } else {
      // If no user is selected, reset the posts array
      setPosts([]);
    }
  }, [selectedUserId]);

  // Function to handle post creation
  const handleCreatePost = async (postData: Post) => {
    try {
      // Create a new post using the createPost service function
      const newPost = await createPost(postData);
      // Update the posts state with the new post
      setPosts([...posts, newPost]); 
    } catch (error: any) {
      // Handle errors during post creation
      console.error('Error creating post:', error.message);
    }
  };
  return (
    <>
      {isLoading && <p>Loading Posts...</p>}
      {error && <p>Error fetching posts: {error.message}</p>}
      <NewPost createPost={createPost} onPostCreated={handleCreatePost} />      
      <Paper elevation={3} sx={{ p: 2, width: 320, maxHeight: 400, overflow: 'auto', borderRadius: 'sm' }}>
        <List>
         {posts.map((post) => (
            <ListItem key={post.id}>
              <Card>
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: '#ef9a9a' }} aria-label="recipe">{selectedUserName ? selectedUserName.charAt(0) : ''}</Avatar>}
                  title={post.title}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post.body}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default UserPosts;
