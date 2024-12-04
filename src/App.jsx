import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddVender from './components/AddVender';
import Layout from './components/Layout';
import ManageVendor from './components/ManageVendor';
import Broadcast from './components/Broadcast';
import InAppPoint from './components/InAppPoint';
import Loginpage from './components/loginpage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Loginpage />} />

        {/* Protected Routes */}
        <Route
          path="/addvendor"
          element={
            <ProtectedRoute>
              <Layout>
                <AddVender />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-vendor"
          element={
            <ProtectedRoute>
              <Layout>
                <ManageVendor />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/broadcast-notif"
          element={
            <ProtectedRoute>
              <Layout>
                <Broadcast />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/in-app-points"
          element={
            <ProtectedRoute>
              <Layout>
                <InAppPoint />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
}

export default App;
