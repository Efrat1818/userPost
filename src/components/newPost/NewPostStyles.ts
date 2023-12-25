import { styled } from '@mui/system';
import {Button,DialogContent } from '@mui/material';
export const StyledButton = styled(Button)({
    backgroundColor: '#ef9a9a',
    borderRadius: '5px',
    color: 'white',
    '&:hover': { background: 'linear-gradient(to right, #ef9a9a, #ef1a9a)' },
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom:"20px",
});

export const StyledDialogContent = styled(DialogContent)({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
