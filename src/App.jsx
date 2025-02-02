import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Layout from './pages/Layout.jsx';
import Login from './pages/Login.jsx';

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
              path="login"
              element={
                <Suspense fallback="loading...">
                  <Login />
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
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
