import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Home from './components/Home';
import OldMembers from './components/OldMembers/OldMembers';
import Gallery from './components/Gallery/Gallery';
import ContactPositions from './components/ContactPositions';
import NewTeam from './components/New Team/NewTeam';
import Preloader from './components/Preloader';
import './App.css';

import { AnimatePresence } from 'framer-motion';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollRestoration />
        <Layout />
      </>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/gallery',
        element: <Gallery />,
      },
      {
        path: '/contact-positions',
        element: <ContactPositions />,
      },
      {
        path: '/new-team',
        element: <NewTeam />,
      },
      {
        path: '/old-members',
        element: <OldMembers />,
      },
    ],
  },
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      <RouterProvider router={router} />
    </>
  );
}

export default App;
