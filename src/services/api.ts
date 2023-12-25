import axios from 'axios';
import { User ,Post} from './types';
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchUsers = async () => {
  try {
    const response = await api.get<User[]>('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export const fetchPostsByUserId = async (userId: number) => {
  try {
    const response = await api.get<Post[]>(`/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};
export const createPost = async (postData: Post): Promise<Post> => {
  try {
    // Simulate post creation using the fetch API
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    // Check if the request was successful (status code 2xx)
    if (response.ok) {
    // Modify the returned data to include the original postData
      const createdPost: Post = {
        ...postData,
        userId: postData.userId || 1, // Set userId to postData.userId if available, or default to 1
        id: Math.floor(Math.random() * 1000), // Generate a random ID (replace this with your logic)
      };
      
      console.log('Post created:', createdPost);
      return createdPost;
    } else {
      // Handle errors (status code other than 2xx)
      console.error('Failed to create post:', response.status, response.statusText);
      throw new Error('Failed to create post');
    }
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
};
// Placeholder for createPost since the API doesn't allow actual creation
// export const createPost = async (postData: Post) => {
//   try {
//     // Simulate post creation using the fetch API
//     ///////////!!!!!!!!!!!!!!!!!!!!!!!https://jsonplaceholder.typicode.com/posts??????short
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//       method: 'POST',
//       body: JSON.stringify(postData),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     });

//     // Check if the request was successful (status code 2xx)
//     if (response.ok) {
//       const createdPost = await response.json();
//       console.log('Post created:', createdPost);
//       return createdPost;
//     } else {
//       // Handle errors (status code other than 2xx)
//       console.error('Failed to create post:', response.status, response.statusText);
//       throw new Error('Failed to create post');
//     }
//   } catch (error) {
//     console.error('Error creating post:', error);
//     throw new Error('Failed to create post');
//   }
// };


