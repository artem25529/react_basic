import { lazy, Suspense, useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Layout from './pages/Layout.jsx';
import Login from './pages/Login.jsx';
import NewPost from './pages/NewPost.jsx';
import Favorites from './pages/Favorites.jsx';

const Blog = lazy(() => import('./pages/Blog.jsx'));
const About = lazy(() => import('./pages/About.jsx'));

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback="loading...">
                  <Blog />
                </Suspense>
              }
            />
            <Route
              path="blog"
              element={
                <Suspense fallback="loading...">
                  <Blog />
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense fallback="loading...">
                  <About />
                </Suspense>
              }
            />
            <Route
              path="new-post"
              element={
                <Suspense fallback="loading...">
                  <NewPost />
                </Suspense>
              }
            />
            <Route
              path="favorites"
              element={
                <Suspense fallback="loading...">
                  <Favorites />
                </Suspense>
              }
            />

            <Route path="login" element={<Login key={1} isLogin={true} />} />
            <Route path="signup" element={<Login key={2} isLogin={false} />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
