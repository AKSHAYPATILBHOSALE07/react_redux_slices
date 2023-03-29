import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch('http://localhost:3006/contacts');
    const data = await response.json();
    return data;
  } 
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (post) => {
    console.log("post",post)
    const response = await fetch('http://localhost:3006/contacts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
    const data = await response.json();
    return data.name;
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (post) => {
    const response = await fetch(`http://localhost:3006/contacts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
    const data = await response.json();
    return data;
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId) => {
    const response = await fetch(`http://localhost:3006/contacts/${postId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        const existingPost = state.items.find((post) => post.id === id);
        if (existingPost) {
          Object.assign(existingPost, action.payload);
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        const index = state.items.findIndex((post) => post.id === id);
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      });
  }
});

export default postsSlice.reducer;