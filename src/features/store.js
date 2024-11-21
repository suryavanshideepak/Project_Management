import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectsReducer from '../features/project/projectSlice';
import tasksReducer from '../features/task/taskSlice';
import userReducer from '../features/users/userSlice';

const store = configureStore({
  reducer: {
    users:userReducer,
    auth: authReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
  },
});

export default store;
