import React from 'react';
import { FiClock, FiGrid, FiHeart, FiGift, FiList, FiBox, FiSettings, FiPower, FiUser } from 'react-icons/fi';
import { Nav, } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const menuItems = [
    { icon: <FiClock />, key: 'dashboard', link: '/AdminHome' },
    { icon: <FiGrid />, key: 'productmanagement', link: '/ProductManagement' },
    { icon: <FiUser />, key: 'usermanagement', link: '/UserManagement' },
    { icon: <FiGift />, key: 'vouchermanagement', link: '/VoucherManagement' },
    { icon: <FiList />, key: 'ordermanagement', link: '/OrderManagement' },
];

const AdminSidebar = () => {
    const { t } = useTranslation();

    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <div className="w-64 h-100 bg-white border-r px-4 py-6">
            <h1 className="text-2xl font-bold mb-4 pt-4">
                <span className="text-black">PASS FASHION</span>
            </h1>

            {menuItems.map((item, idx) => (
                <Nav.Link
                    key={idx}
                    as={Link}
                    to={item.link}
                    className={`nav-item-custom d-flex align-items-center gap-2 py-2 px-3 rounded ${currentPath === item.link ? 'bg-blue-100 text-blue-600 fw-bold' : 'text-dark'}`}
                >
                    <span className="text-lg py-2">{item.icon}</span>
                    <span>{t(`adminTitle.${item.key}`)}</span> {/* dịch từ file translation */}
                </Nav.Link>
            ))}
        </div>
    );
};

export default AdminSidebar;
