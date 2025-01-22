import './App.css';
import { Route, Routes } from 'react-router-dom';
import Posts from './features/Posts/Posts.tsx';
import AppToolBar from './components/AppToolBar/AppToolBar.tsx';
import RegisterPage from './features/Users/RegisterPage.tsx';
import LoginPage from './features/Users/LoginPage.tsx';

const App = () => {
  return (
    <>
      <AppToolBar />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
