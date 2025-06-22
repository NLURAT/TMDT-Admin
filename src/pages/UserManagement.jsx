import { Button, Col, Container, Row } from "react-bootstrap";
import AdminSidebar from "../components/AdminSidebar";
import AdminNav from "../components/AdminNav";
import userApi from "../api/userApi";
import { use, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PaginationCom from "../components/PaginationCom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


const UserManagement = () => {
    const { t } = useTranslation()
    const [UserList, SetUserList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 10;
    const totalPages = Math.ceil(UserList.length / itemPerPage);
    const indexOfLast = currentPage * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    const currentUserList = UserList.slice(indexOfFirst, indexOfLast);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        fetchUser();
    }, []);


    const fetchUser = async () => {
        try {
            const response = await userApi.getAllUser();
            SetUserList(response.data); // Chỉ lấy response.data vì API trả về danh sách trực tiếp
        } catch (error) {
            toast.error(t('userAdmin.fetchError'));
            console.error(error);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const response = await userApi.deleteUser(id);
            await fetchUser();
            toast.success("Delete success!");
        } catch (error) {
            toast.error("Failed to fetch users:", error);
        }
    }

    const UserRender = ({ data }) => {
        return (
            <div className="container mt-3">
                <div className="table-responsive rounded border bg-white shadow-sm">
                    <table className="table table-hover align-middle mb-0 text-center">
                        <thead className="table-light">
                            <tr>

                                <th>{t('userAdmin.name')}</th>
                                <th>{t('userAdmin.email')}</th>
                                <th>{t('userAdmin.phone')}</th>
                                <th>{t('userAdmin.birthday')}</th>
                                <th>{t('userAdmin.role')}</th>

                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td className="fw-semibold">{row.name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.phone}</td>
                                    <td>{row.birthday}</td>
                                    <td>{row.role}</td>
                                    <td>
                                        <Button onClick={() => deleteUser(row.id)}><MdDelete /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };


    return (
        <div style={{ backgroundColor: '#F5F6FA', minHeight: "100vh" }}>
            <Container fluid>
                <Row>
                    <Col md={2} className='p-0' style={{ minHeight: "100vh" }}>
                        <AdminSidebar></AdminSidebar>
                    </Col>
                    <Col md={10} style={{ minHeight: "100vh" }}>

                        <AdminNav title={t('userAdmin.title')} />

                        <UserRender data={currentUserList}></UserRender>
                        <PaginationCom currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages}></PaginationCom>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default UserManagement;