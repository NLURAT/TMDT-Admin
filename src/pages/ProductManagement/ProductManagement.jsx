import { Col, Container, Row, Button, Modal, Form } from "react-bootstrap";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNav from "../../components/AdminNav";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PaginationCom from "../../components/PaginationCom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";

const cx = classNames.bind(styles);
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

  const [products, setProducts] = useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    console.log("fetchProducts");
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm:", err);
      });
  };

  //   const deleteProduct = async (id) => {
  //     if (!window.confirm(t("product.confirmDelete"))) return;
  //     try {
  //       await productApi.deleteProduct(id);
  //       await fetchProduct();
  //       toast.success(t("product.deleteSuccess"));
  //     } catch (error) {
  //       if (error.response && error.response.status === 404) {
  //         toast.error("Product not found or already deleted.");
  //       } else {
  //         toast.error("Failed to delete this product: " + error.message);
  //       }
  //     }
  //   };

  //   const updateProduct = async (productData) => {
  //     try {
  //       await productApi.updateProduct(selectedProduct.id, productData);
  //       await fetchProduct();
  //       setShowModal(false);
  //       toast.success("Update product success!");
  //     } catch (error) {
  //       toast.error("Failed to update product: " + error.message);
  //     }
  //   };

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

  const ProductList = ({ items }) => {
    return (
      <div>{items && items.map((item) => <ProductItem item={item} />)}</div>
    );
  };

  const ProductItem = ({ item }) => {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("d-flex")}>
            <div className={cx("grid-col-1")}>
            <img src="" alt=""  style={{width:"100%"}} />
        </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: "#F5F6FA", minHeight: "100vh" }}>
      <Container fluid>
        <Row>
          <Col md={2} className="p-0" style={{ minHeight: "100vh" }}>
            <AdminSidebar />
          </Col>
          <Col md={10} style={{ minHeight: "100vh" }}>
            <AdminNav title={t("productAdmin.title")} />
            <ProductList items={products} />
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
