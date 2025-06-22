import { Col, Container, Row, Button, Modal, Form } from "react-bootstrap";
import AdminSidebar from "../components/AdminSidebar";
import AdminNav from "../components/AdminNav";
import { useEffect, useState } from "react";
import productApi from "../api/productApi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PaginationCom from "../components/PaginationCom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ProductManagement = () => {
    const { t } = useTranslation();
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const itemPerPage = 10;
    const totalPages = Math.ceil(productList.length / itemPerPage);
    const indexOfLast = currentPage * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    const currentProductList = productList.slice(indexOfFirst, indexOfLast);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        const response = await productApi.getAllProduct();
        const data = response.data;
        setProductList(data);
    };

    const deleteProduct = async (id) => {
        if (!window.confirm(t("product.confirmDelete"))) return;
        try {
            await productApi.deleteProduct(id);
            await fetchProduct();
            toast.success(t("product.deleteSuccess"));
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Product not found or already deleted.");
            } else {
                toast.error("Failed to delete this product: " + error.message);
            }
        }
    };

    const updateProduct = async (productData) => {
        try {
            await productApi.updateProduct(selectedProduct.id, productData);
            await fetchProduct();
            setShowModal(false);
            toast.success("Update product success!");
        } catch (error) {
            toast.error("Failed to update product: " + error.message);
        }
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const categoryId = parseInt(e.target.categoryId.value);
        if (isNaN(categoryId)) {
            toast.error("Category ID không hợp lệ!");
            return;
        }
        const productData = {
            id: selectedProduct.id,
            name: e.target.name.value,
            price: parseFloat(e.target.price.value),
            image: e.target.image.value,
            category: { id: parseInt(e.target.categoryId.value) }, // Giả sử có category ID
            description: e.target.description.value,
            color: e.target.color.value,
            rating: parseInt(e.target.rating.value),
        };
        updateProduct(productData);
    };

    const user = JSON.parse(localStorage.getItem("user"));

    const TableRender = ({ data }) => {
        return (
            <div className="container mt-3">
                <div className="table-responsive rounded border bg-white shadow-sm">
                    <table className="table table-hover align-middle mb-0 text-center">
                        <thead className="table-light">
                            <tr>
                                <th>{t("productAdmin.name")}</th>
                                <th>{t("productAdmin.price")}</th>
                                <th>{t("productAdmin.category")}</th>
                                <th>{t("productAdmin.image")}</th>
                                <th>{t("productAdmin.description")}</th>
                                <th>{t("productAdmin.rating")}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td className="fw-semibold">{row.name}</td>
                                    <td>{t("currency", { value: row.price })}</td>
                                    <td>{row.category.name}</td>
                                    <td>
                                        <img src={row.image} alt="product" style={{ height: "50px", objectFit: "cover" }} />
                                    </td>
                                    <td>{row.description}</td>
                                    <td>{row.rating}</td>
                                    <td>
                                        <Button className="me-2" onClick={() => handleEditClick(row)}>
                                            <FaEdit />
                                        </Button>
                                        <Button onClick={() => deleteProduct(row.id)}>
                                            <MdDelete />
                                        </Button>
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
        <div style={{ backgroundColor: "#F5F6FA", minHeight: "100vh" }}>
            <Container fluid>
                <Row>
                    <Col md={2} className='p-0' style={{ minHeight: "100vh" }}>
                        <AdminSidebar />
                    </Col>
                    <Col md={10} style={{ minHeight: "100vh" }}>
                        <AdminNav title={t("productAdmin.title")} />
                        <TableRender data={currentProductList} />
                        <PaginationCom
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            totalPages={totalPages}
                        />
                    </Col>
                </Row>
            </Container>

            {/* Modal for Editing Product */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    defaultValue={selectedProduct.name}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    step="0.01"
                                    defaultValue={selectedProduct.price}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="image"
                                    defaultValue={selectedProduct.image}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category ID</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="categoryId"
                                    defaultValue={selectedProduct.category.id}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    defaultValue={selectedProduct.description}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="color"
                                    defaultValue={selectedProduct.color}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="rating"
                                    defaultValue={selectedProduct.rating}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default ProductManagement;