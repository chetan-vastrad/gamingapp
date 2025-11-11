import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/user/Profile"
import Login from "./pages/authpages/Login";
import Register from "./pages/authpages/Register";
import Home from "./pages/user/Home";
import Wallet from "./pages/user/Wallet";
import History from "./pages/user/History";
import ProtectedRoute from "./component/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Recharges from "./pages/admin/Recharges";
import OpenNumber from "./pages/admin/OpenNumber"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Route */}

        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/wallet" element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        } />
        <Route path="/history" element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        {/* Admin Rout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/allusers"
          element={
            <ProtectedRoute allowedRole="admin">
              <Users />
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/recharge"
          element={
            <ProtectedRoute allowedRole="admin">
              <Recharges />
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/declared-number"
          element={
            <ProtectedRoute allowedRole="admin">
              <OpenNumber />
            </ProtectedRoute>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
