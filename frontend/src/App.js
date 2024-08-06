import './App.css'
import Login from './Auth/pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './Auth/pages/Signup';
import Home from './Home/pages/Home';
import OTP from './Auth/pages/OTP';
import { useDispatch } from 'react-redux';
import { checkAuth } from './features/user'
import { useEffect } from 'react';
import ProtectedRoute from './ProtectedRoute';
import Add from './Home/pages/Add';
import ViewPassword from './Home/pages/ViewPassword';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth())
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/verify" element={<OTP />}></Route>
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>}>
        </Route>
        <Route path='/add' element={
          <ProtectedRoute>
            <Add />
          </ProtectedRoute>}>
        </Route>
        <Route path='/view/:id' element={
          <ProtectedRoute>
            <ViewPassword />
          </ProtectedRoute>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
