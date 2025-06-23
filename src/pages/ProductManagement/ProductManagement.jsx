import { Col, Container, Row, Button, Modal, Form } from "react-bootstrap";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNav from "../../components/AdminNav";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  getProducts,
} from "../../api/productApi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PaginationCom from "../../components/PaginationCom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import classNames from "classnames/bind";
import styles from "./ProductManagement.module.scss";
import { Link } from "react-router-dom";
import { AspectRatio } from "react-bootstrap-icons";

const cx = classNames.bind(styles);

function formatMoney(value) {
  const amount = Number(value);
  if (isNaN(amount)) return "0 ₫";
  return amount.toLocaleString("vi-VN", { maximumFractionDigits: 0 }) + " ₫";
}

const actions = [
  {
    value: "none",
    title: "...",
  },
  {
    value: "DELETE",
    title: "Xóa",
  },
];

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

  const handleDetele = async (id) => {
    console.log("handleDetele");
    deleteProduct({ id })
      .then((data) => {
        if (data.success) {
          const filteredProducts = products.filter((item) => item.id !== id);
          setProducts(filteredProducts);
          toast.success("Xóa sản phẩm thành công");
        } else {
          toast.error("Xóa sản phẩm thất bại");
        }
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm:", err);
      });
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

  const ProductTable = ({ items }) => {
    return (
      <table className={cx("custom-table", "fixed-layout")}>
        <colgroup>
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "50%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Thông tin</th>
            <th>Người bán</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <ProductRow key={item.id} item={item} index={index} />
          ))}
        </tbody>
      </table>
    );
  };

  function ProductRow({ item, index }) {
    const [action, setAction] = useState(actions[0]?.value || "");
    const isLocked = item.status === "LOCKED";
    const handleActionChange = (e) => {
      const selectedAction = e.target.value;
      setAction(selectedAction);
      switch (selectedAction) {
        case "DELETE":
          handleDetele(item.id);
          break;
      }
    };

    return (
      <tr key={item.id} className={cx("product-item", { blocked: isLocked })}>
        <td>{index + 1}</td>
        <td>{item.id}</td>
        <td>
          <img src={item.thumbnail} />
        </td>
        <td>
          <p className={cx("name")}>{item.name}</p>
          <p className={cx("price")}>{formatMoney(item.price)}</p>
          <p className={cx("label")}>Mô tả</p>
          <p className={cx("description")}>{item.description}</p>
          <p className={cx("pickUpInfo")}>
            <span className={cx("label")}>Địa chỉ lấy hàng: </span>
            {item.pickUpInfo}
          </p>
        </td>
        <td className="center">
          <Link className={cx("saler-item")}>
            <div className={cx("grid-col-4")}>
              <img src={item.userAvatar} alt="" style={{ width: "100%" }} />
            </div>
            <p className={cx("userName")}>{item.userName}</p>
          </Link>
        </td>

        <td className="center">
          <div className={cx("d-flex-col")}>
            <select
              style={{ fontSize: "15px" }}
              value={action}
              onChange={handleActionChange}
            >
              {actions &&
                actions.map((acItem) => (
                  <option value={acItem.value} key={acItem.value}>
                    {acItem.title}
                  </option>
                ))}
            </select>
            {/* <Link
              className="fake-a"
              style={{ fontSize: "15px", marginTop: "15px" }}
              onClick={(e) => {
                e.preventDefault();
                handleClickItem(item);
              }}
            >
              Chi tiết
            </Link> */}
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div style={{ backgroundColor: "#F5F6FA", minHeight: "100vh" }}>
      <Container fluid>
        <Row>
          <Col md={2} className="p-0" style={{ minHeight: "100vh" }}>
            <AdminSidebar />
          </Col>
          <Col md={10} style={{ minHeight: "100vh" }}>
            <AdminNav title={t("productAdmin.title")} />
            <div className={cx("wrapper")}>
              <ProductTable items={products} />
            </div>
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
