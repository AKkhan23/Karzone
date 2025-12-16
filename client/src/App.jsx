 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Profile from './pages/Profile';
import Dashboard from './admin/Dashboard';
import AllUsers from './admin/AllUsers';
import AllCars from './admin/AllCars';
import AddCar from './admin/AddCar';
import AllBookings from './admin/AllBooking';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cars" element={<Cars />} />
          <Route path="carsdeatail/:id" element={<CarDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="register"element={<Register/>} />
          <Route path="login" element={<Login/> }/>
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="cars" element={<AllCars />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="bookings" element={<AllBookings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
