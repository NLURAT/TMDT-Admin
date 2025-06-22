import {
    Col, Container, Row, Button, Card, Dropdown,
    Modal, Form
} from "react-bootstrap";
import AdminSidebar from "../components/AdminSidebar";
import AdminNav from "../components/AdminNav";
import { FaEdit, FaArrowDown } from "react-icons/fa";
import { MdDelete, MdAddBox } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { useEffect, useState } from "react";
import adminApi from "../api/adminApi";
import PaginationCom from "../components/PaginationCom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const VoucherManagement = () => {
    const { t } = useTranslation()
    const [voucher, setVoucher] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        code: "",
        description: "",
        quantity: "",
        discount: ""
    });

    const totalPages = Math.ceil(voucher.length / itemPerPage);
    const indexOfLast = currentPage * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    const currentList = voucher.slice(indexOfFirst, indexOfLast);
    const [editMode, setEditMode] = useState(false);      // true = edit, false = add
    const [editingId, setEditingId] = useState(null);      // lưu id khi edit



    useEffect(() => {
        fetchVoucher();
    }, []);

    const fetchVoucher = async () => {
        try {
            const response = await adminApi.getAllVoucher();
            setVoucher(response.data.result);
        } catch (err) {
            if (error.response) {
                const errMessage = error.response.data?.message || 'Đã xảy ra lỗi';
                toast.error(errMessage);
            }
        }
    };

    const handleEditVoucher = (voucher) => {
        setFormData({
            code: voucher.code,
            description: voucher.description,
            quantity: voucher.quantity,
            discount: voucher.discount
        });
        setEditingId(voucher.id);   // lưu id
        setEditMode(true);          // bật chế độ chỉnh sửa
        setShowModal(true);
    };


    const handleSaveVoucher = async () => {
        try {
            if (editMode) {
                // cập nhật voucher
                await adminApi.updateVoucher(editingId, formData);
                toast.success("Voucher updated successfully!");
            } else {
                // thêm mới voucher
                await adminApi.addVoucher(formData);
                toast.success("Voucher added successfully!");
            }

            setShowModal(false);
            setFormData({ code: "", description: "", quantity: "", discount: "" });
            setEditMode(false);
            setEditingId(null);
            fetchVoucher();

        } catch (error) {

            if (error.response) {
                const errMessage = error.response.data?.message || 'Đã xảy ra lỗi';
                toast.error(errMessage);
            }
        }
    };


    const deleteVoucher = async (id) => {
        if (!window.confirm("Are you sure you want to delete this voucher?")) return;
        try {
            const response = await adminApi.deleteVoucher(id);
            await fetchVoucher();
            toast.success("Delete success!");
        } catch (error) {
            if (error.response) {
                const errMessage = error.response.data?.message || 'Đã xảy ra lỗi';
                toast.error(errMessage);
            }
        }
    }



    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const deleteProduct = (id) => {
        // Cần cài đặt hoặc gọi API xóa voucher tại đây
        toast.info(`Delete voucher with id ${id} (not implemented)`);
    };

    const Filter = ({ setItemsPerPage }) => {
        const options = [5, 10, 15, 20];

        return (
            <Row className="g-3 my-4 mx-2 px-1">
                <Col md="1" className="p-0 me-1">
                    <Card className="shadow-sm border-0 bg-white p-2">
                        <Dropdown>
                            <Dropdown.Toggle variant="light" size="sm" className="fw-semibold border-0 p-0">

                                {t('voucherAdmin.itemsPerPage')}

                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {options.map((val) => (
                                    <Dropdown.Item key={val} onClick={() => setItemsPerPage(val)}>
                                        {val}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Card>
                </Col>

                <Col md="1" className="p-0 me-1">
                    <Card className="shadow-sm border-0 bg-white text-center p-2" style={{ cursor: "pointer" }}>
                        <div className="d-flex flex-row align-items-center gap-2">

                            <span className="fw-semibold">{t('voucherAdmin.code')}</span>

                            <FaArrowDown className="text-danger" size={14} />
                        </div>
                    </Card>
                </Col>

                <Col md="1" className="p-0 me-1">
                    <Card className="shadow-sm border-0 bg-white text-center p-2"
                        onClick={() => setShowModal(true)}
                        style={{ cursor: "pointer" }}>
                        <div className="d-flex flex-row align-items-center gap-2">
                            <MdAddBox size={18} />

                            <span className="fw-semibold">{t('voucherAdmin.add')}</span>

                        </div>
                    </Card>
                </Col>
            </Row>
        );
    };

    const VoucherRender = ({ data }) => {
        return (
            <div className="container mt-3">
                <div className="table-responsive rounded border bg-white shadow-sm">
                    <table className="table table-hover align-middle mb-0 text-center">
                        <thead className="table-light">
                            <tr>

                                <th>{t('voucherAdmin.code')}</th>
                                <th>{t('voucherAdmin.description')}</th>
                                <th>{t('voucherAdmin.quantity')}</th>
                                <th>{t('voucherAdmin.discount')}</th>

                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td className="fw-semibold">{row.code}</td>
                                    <td>{row.description}</td>
                                    <td>{row.quantity}</td>
                                    <td>{row.discount}%</td>
                                    <td>
                                        <Button className="me-2" onClick={() => handleEditVoucher(row)}>
                                            <FaEdit />
                                        </Button>
                                        <Button onClick={() => deleteProduct(row.id)}><MdDelete /></Button>
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
        <div style={{ backgroundColor: '#F5F6FA' }}>
            <Container fluid>
                <Row>
                    <Col md={2} className='p-0' style={{ minHeight: "100vh" }}>
                        <AdminSidebar />
                    </Col>
                    <Col md={10} style={{ minHeight: "100vh" }}>

                        <AdminNav title={'voucherAdmin.title'} />

                        <Filter setItemsPerPage={setItemPerPage} />
                        <VoucherRender data={currentList} />
                        {showModal && (
                            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">

                                            <h5 className="modal-title">
                                                {editMode ? t('voucherAdmin.editVoucher') : t('voucherAdmin.addVoucher')}
                                            </h5>
                                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                        </div>
                                        <div className="modal-body">
                                            <label>{t('voucherAdmin.code')}</label>

                                            <input
                                                className="form-control mb-2"
                                                value={formData.code}
                                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                            />


                                            <label>{t('voucherAdmin.description')}</label>

                                            <input
                                                className="form-control mb-2"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            />


                                            <label>{t('voucherAdmin.quantity')}</label>

                                            <input
                                                type="number"
                                                className="form-control mb-2"
                                                value={formData.quantity}
                                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                            />


                                            <label>{t('voucherAdmin.discount')} (%)</label>

                                            <input
                                                type="number"
                                                className="form-control mb-2"
                                                value={formData.discount}
                                                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                            />
                                        </div>
                                        <div className="modal-footer">

                                            <Button variant="secondary" onClick={() => setShowModal(false)}>{t('voucherAdmin.cancel')}</Button>
                                            <Button variant="primary" onClick={handleSaveVoucher}>{t('voucherAdmin.save')}</Button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <PaginationCom currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default VoucherManagement;
