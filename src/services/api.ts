import axios from 'axios';

import { User, Post } from './types';

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
    const response = await api.post<Post>('/posts', postData);
    const createdPost = response.data;

    console.log('Post created:', createdPost);
    return createdPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }

};
