
import React, { useState } from 'react';
import { Dialog, DialogTitle, TextField } from '@mui/material';
import { Post } from '../../services/types';
import './NewPost.css';
import { StyledButton, StyledDialogContent } from './NewPostStyles';

interface NewPostProps {
  createPost: (postData: Post) => Promise<Post>;
  onPostCreated: (post: Post) => void;
}
//This component handels the creations of new post and submits request server

const NewPost: React.FC<NewPostProps> = ({ createPost, onPostCreated }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState<string>('');

  const handleClose = () => {
    setOpen(false);
    setError(''); // Clear error when closing the dialog
  };

  const handleSubmit = async () => {
    try {
      // Validate input before creating the post
      if (title && body) {
        const newPost = await createPost({ userId: 1, id: 0, title, body });
        onPostCreated(newPost); // Add the new post to the list
        setOpen(false);
        setTitle('');
        setBody('');
        setError(''); // Clear error on successful submission
      } else {
        setError('Please fill in both title and body before creating a post.');
             }
      }
      catch (error: any) {
      console.error('Error creating post:', error.message);
    }
  };

  return (
    <>
      <StyledButton onClick={() => setOpen(true)}>Create Post</StyledButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className='title'>Create New Post</DialogTitle>
        <StyledDialogContent>
          <div className='textField'>
          <TextField label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField label="Body" variant="outlined" multiline rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </StyledDialogContent>
      <StyledButton onClick={handleSubmit}>Create</StyledButton>
      </Dialog>
    </>
  );
};

export default NewPost;
