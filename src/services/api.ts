import axios from 'axios';

import { User, Post } from './types';// Import types for data structuring

// Create an Axios instance with a base URL for API requests
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// Function to fetch users from the API
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
    const response = await api.get<Post[]>(`/posts?userId=${userId}`);// GET request with userId parameter
    return response.data;// Return the parsed post data
  } catch (error) {
    throw new Error('Failed to fetch posts');// Handle errors
  }
};

export const createPost = async (postData: Post): Promise<Post> => {
  try {
    const response = await api.post<Post>('/posts', postData);
    const createdPost = response.data;

    console.log('Post created:', createdPost);
    return createdPost;
  } catch (error) {
    throw new Error('Failed to create post');
  }

};
