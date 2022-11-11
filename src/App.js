
import './App.css';
import { Routes, Route } from "react-router-dom";

import { Footer } from './components/Footer';
import { Header } from './components/Header';

import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { PostPage } from './pages/PostPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UserPage } from './pages/UserPage';
import { SearchPage } from './pages/SearchPage';
import { LikesPage } from './pages/LikesPage';
import { EditProfilePage } from './pages/EditProfilePage';

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:id" element={<PostPage />} />
        <Route path="/user/info/:id" element={<UserPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/likes/:id" element={<LikesPage />} />
        <Route path="/user/info" element={<EditProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>


      <Footer />
    </main>
  );
}

export default App;
