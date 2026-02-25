import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Landing from './pages/Landing';
import Layout from './components/Layout';

const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  if (!token) return false;

  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return false;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const { exp } = JSON.parse(jsonPayload);
    if (exp * 1000 < Date.now()) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        <Route path="/" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
