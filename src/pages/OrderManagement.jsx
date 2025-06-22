import { Col, Container, Row, Card, Button } from "react-bootstrap";
import AdminSidebar from "../components/AdminSidebar";
import AdminNav from "../components/AdminNav";
import { CiFilter } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { FaArrowDown, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import orderApi from "../api/orderApi";
import PaginationCom from "../components/PaginationCom";
import { toast } from "react-toastify";

import { useTranslation } from "react-i18next";

const OrderManagement = () => {
    const { t } = useTranslation();
    const [orderList, setOrderList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 10;
    const totalPages = Math.ceil(orderList.length / itemPerPage);
    const indexOfLast = currentPage * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    const currentOrderList = orderList.slice(indexOfFirst, indexOfLast);

    const [showModal, setShowModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(0);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            const response = await orderApi.getAllOrder();
            setOrderList(response.data.result || []);
        } catch (error) {
            toast.error("Error fetching order list.");
        }
    };



    const handleEditClick = (id, status) => {
        setSelectedOrderId(id);
        setNewStatus(status);
        setShowModal(true);
    };

    const handleUpdateStatus = async () => {
        try {
            await orderApi.updateOrder(selectedOrderId, { status: newStatus });
            toast.success(t("order.statusUpdated"));
            setShowModal(false);
            fetchOrder();
        } catch (error) {
            toast.error("Failed to update status: " + (error?.message || error));
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const filterData = [
        { value: "date" },
        { value: "status" },
    ];

    const Filter = ({ filterData }) => (
        <Row className="g-3 my-4 mx-2 px-1">
            <Col md="1" className="p-0 me-1">
                <Card className="shadow-sm border-0 bg-white text-center p-2">
                    <div className="d-flex flex-row align-items-center gap-2">
                        <CiFilter size={20} />
                        <span className="fw-semibold">{t("orderAdmin.filter")}</span>
                    </div>
                </Card>
            </Col>
            {filterData.map((item, idx) => (
                <Col key={idx} md="2" className="p-0 me-1">
                    <Card className="shadow-sm border-0 bg-white text-center p-2">
                        <div className="d-flex flex-row align-items-center gap-2">
                            <span className="fw-semibold">{t(`orderAdmin.${item.value.toLowerCase()}`)}</span>
                            <FaArrowDown className="text-danger" size={14} />
                        </div>
                    </Card>
                </Col>
            ))}
            <Col md="1" className="p-0 me-1">
                <Card className="shadow-sm border-0 bg-white text-center p-2">
                    <div className="d-flex flex-row align-items-center gap-2">
                        <GrPowerReset size={18} />
                        <span className="fw-semibold">{t("orderAdmin.reset")}</span>
                    </div>
                </Card>
            </Col>
        </Row>
    );

    const OrderRender = ({ orderData }) => (
        <div className="container mt-3">
            <div className="table-responsive rounded border bg-white shadow-sm">
                <table className="table table-hover align-middle mb-0 text-center">
                    <thead className="table-light">
                        <tr>
                            <th>{t("orderAdmin.username")}</th>
                            <th>{t("orderAdmin.totalValue")}</th>
                            <th>{t("orderAdmin.date")}</th>
                            <th>{t("orderAdmin.quantity")}</th>
                            <th>{t("orderAdmin.status")}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.map((row, index) => (
                            <tr key={index}>
                                <td className="fw-semibold">{row.userResponse.username}</td>
                                <td>{t("currency", { value: row.totalPrice })}</td>
                                <td>{row.orderDate}</td>
                                <td>{row.totalQuantity}</td>
                                <td>
                                    <span className={`badge rounded-pill px-3 py-2 ${row.status === "COMPLETE"
                                        ? "bg-success-subtle text-success"
                                        : row.status === "PROCESSING"
                                            ? "bg-primary-subtle text-primary"
                                            : "bg-secondary-subtle text-secondary"
                                        }`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td>
                                    <Button className="me-2" onClick={() => handleEditClick(row.id, row.status)}>
                                        <FaEdit />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div style={{ backgroundColor: "#F5F6FA", minHeight: "100vh" }}>
            <Container fluid>
                <Row>
                    <Col md={2} className="p-0" style={{ minHeight: "100vh" }}>
                        <AdminSidebar />
                    </Col>
                    <Col md={10} style={{ minHeight: "100vh" }}>
                        <AdminNav title={t("orderAdmin.title")} />
                        <Filter filterData={filterData} />
                        <OrderRender orderData={currentOrderList} />
                        <PaginationCom
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            totalPages={totalPages}
                        />
                        {showModal && (
                            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">{t("orderAdmin.editStatus")}</h5>
                                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                        </div>
                                        <div className="modal-body">
                                            <label className="form-label">{t("orderAdmin.selectStatus")}</label>
                                            <select
                                                className="form-select"
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(e.target.value)}
                                            >
                                                <option value="CANCEL">{t("orderAdmin.statusCancel")}</option>
                                                <option value="COMPLETE">{t("orderAdmin.statusComplete")}</option>
                                            </select>
                                        </div>
                                        <div className="modal-footer">
                                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                                {t("orderAdmin.cancel")}
                                            </Button>
                                            <Button variant="primary" onClick={handleUpdateStatus}>
                                                {t("orderAdmin.update")}
                                            </Button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default OrderManagement;
