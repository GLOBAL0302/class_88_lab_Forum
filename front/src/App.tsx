import './App.css';
import { Route, Routes } from 'react-router-dom';
import Posts from './features/Posts/Posts.tsx';
import AppToolBar from './components/AppToolBar/AppToolBar.tsx';
import RegisterPage from './features/Users/RegisterPage.tsx';
import LoginPage from './features/Users/LoginPage.tsx';
import AddPost from './features/ModifyPost/AddPost.tsx';
import PostPage from './features/Comments/PostPage.tsx';

const App = () => {
  return (
    <>
      <AppToolBar />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/postPage/:id" element={<PostPage />} />
      </Routes>
    </>
  );
};

export default App;
