import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// Thêm vào đầu file App.js
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login.jsx';
import { AuthProvider } from './api/AuthContext.jsx'
import AdminHome from './pages/AdminHome.jsx'
import OrderManagement from './pages/OrderManagement.jsx'
import UserManagement from './pages/UserManagement.jsx'
import ProductManagement from './pages/ProductManagement.jsx'
import VoucherManagement from './pages/VoucherManagement.jsx'
function App() {
    return (
        <Router>
            <AuthProvider>
                <>
                    <Routes>
                        {/* Admin pages */}
                        <Route path="/" element={<AdminHome />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/OrderManagement" element={<OrderManagement />} />
                        <Route path="/ProductManagement" element={<ProductManagement />} />
                        <Route path="/UserManagement" element={<UserManagement />} />
                        <Route path="/VoucherManagement" element={<VoucherManagement />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    <ToastContainer position="top-right" autoClose={3000} />
                </>
            </AuthProvider>
        </Router>
    );
}


export default App;
