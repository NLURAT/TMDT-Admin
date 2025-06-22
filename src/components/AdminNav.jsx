import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Col, Row, Card, Form, Container, Button, Dropdown, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';
import { useTranslation } from 'react-i18next';

const TopNavbar = ({ title }) => {
    const { user, isLoggedIn, resetAuth } = useAuth();
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    const logout = () => {
        resetAuth(); // Gọi đúng hàm resetAuth
        navigate("/login"); // Optional: chuyển hướng sau khi logout
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    function SelectLanguage() {
        const handleChange = (e) => {
            const lang = e.target.value;
            i18n.changeLanguage(lang);
        };

        return (
            <Form.Select aria-label="Chọn ngôn ngữ" onChange={handleChange} value={i18n.language}>
                <option value="en">English</option>
                <option value="vi">Tiếng Việt</option>
            </Form.Select>
        );
    }

    return (
        <Row className="flex items-center justify-between px-4 py-2 bg-white shadow-sm pt-4">
            {/* Left: Menu + Search */}
            <Col md={4}>
                <h2>{t(title)}</h2>
            </Col>
            <Col md={5}></Col>
            {/* Right: Notification, Language, User */}
            <Col md={3}>
                <Row className="justify-between">
                    {/* Language Selector */}
                    <Col className="d-flex align-items-center">
                        <SelectLanguage></SelectLanguage>
                    </Col>

                    {/* User Info */}
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" className='btn-menu-dropdown d-flex align-items-center'>
                                <AccountCircleIcon />
                                <MenuIcon />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/Profile">
                                    {t('nav.profile')}
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to="/AdminHome">
                                    {/* Hiển thị thông tin người dùng */}
                                    {t('nav.admin')}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={logout}>
                                    {t('nav.logout')}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                </Row>
            </Col>
        </Row>
    );
};

export default TopNavbar;
