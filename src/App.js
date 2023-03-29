// import { useDispatch, useSelector } from "react-redux";
// import { fetchTodos } from "./redux/slice/todo";
// import "./App.css";

// function App() {
//   const dispatch = useDispatch();
//   const state = useSelector((state) => state);

//   console.log("State", state);

//   if (state.todo.isLoading) {
//     return <h1>Loading....</h1>;
//   }

//   return (
//     <div className="App">
//       <button onClick={(e) => dispatch(fetchTodos())}>Fetch Todos</button>
//       {state.todo.data && state.todo.data.map((e,i) => <li key={i}>{e.name}</li>)}
//     </div>
//   );
// }

// export default App;


// App.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchPosts, createPost, updatePost, deletePost } from './postsSlice';
import { fetchPosts, createPost, updatePost, deletePost  } from './redux/slice/crudSlice';

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status); 
  const error = useSelector((state) => state.posts.error);
  const [formData, setFormData] = React.useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createPost(formData));
    setFormData({ name: '', email: '' });
  };

  const handleUpdate = (id) => {
    dispatch(updatePost({ id, ...formData }));
    setFormData({ name: '', email: '' });
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div>
      <h1>Posts</h1>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>{error}</div>}
      {status === 'succeeded' && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>Name: {post.name}, Email: {post.email}</p>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
              <form onSubmit={() => handleUpdate(post.id)}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Update name"
                />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Update email"
                />
                <button type="submit">Update</button>
              </form>
            </li>
          ))}
        </ul>
      )}
      <h2>Add a Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <br></br><br></br>
    </div>
  );
}

export default App;

