import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:3005/users');

  // DEV ONLY!!! Trick to see `Loading...` on the screen
  await pause(2000);

  return response.data; // action.payload in slice
});

// DEV ONLY!!! Trick to see `Loading...` on the screen
const pause = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };
