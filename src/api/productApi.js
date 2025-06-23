import axiosInstance from "./axiosInstance";
export const SERVER_URL_BASE = "http://localhost:8080";

const productApi = {
  getAllProduct: () => {
    return axiosInstance.get("/products");
  },
  getProduct: (productId) => {
    return axiosInstance.get(`/products/${productId}`);
  },
  deleteProduct: (productId) => {
    return axiosInstance.delete(`/products/delete/${productId}`);
  },
  updateProduct: (productId, data) => {
    return axiosInstance.put(`products/${productId}`, data);
  },
  createProduct: (data) => {
    return axiosInstance.post("/products", data);
  },
};

export async function getProductDetail({ id }) {
  console.log("getProductDetail: " + id);
  const url = `/products/detail/${id}`;
  const response = await axiosInstance.get(url);
  const data = response.data;

  const details = data.productDetails.map(
    (item) =>
      new ProductDetailModel.Detail(
        item.id,
        item.title,
        item.initPrice,
        item.price,
        item.qty,
        item.discount
      )
  );

  const images = data.images.map(
    (item) => new ProductDetailModel.Image(`${SERVER_URL_BASE}/${item}`)
  );

  const reviews = data.reviews.map(
    (item) =>
      new ProductDetailModel.Review(
        item.id,
        item.user.id,
        item.user.name,
        item.rating,
        item.content,
        item.productDetail
      )
  );

  const productDetail = new ProductDetailModel(
    data.id,
    data.name,
    data.label,
    data.brand,
    data.avgRating,
    data.totalReview,
    data.soldQty,
    data.description,
    details,
    images,
    reviews
  );

  // console.log(JSON.stringify(productDetail,null,2));

  return productDetail;
}

export async function getProducts() {
  console.log("getProducts: ");
  let url = `/ad/products/all`;
  // const params = { keyword, priceRange, sortBy, direction, page, size };

  const response = await axiosInstance.post(url, {});

  const data = response.data;
  console.log("data:" + JSON.stringify(data, null, 2));

  const products = data.content.map((item) => {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      thumbnail: `${SERVER_URL_BASE}/${item.thumbnail}`,
      description: item.description,
      pickUpInfo: item.pickUpInfo,
      userId: item.userId,
      userName: item.userName,
      userAvatar: `${SERVER_URL_BASE}/${item.userAvatar}`,
      isSold: item.sold, // hoặc item.isSold tùy backend
    };
  });

  console.log("products: " + JSON.stringify(products, null, 2));

  return products;
}

export async function deleteProduct({id}) {
  console.log("deleteProducts: id" + id);
  let url = `/ad/products/delete/${id}`;
  const params = { };

  const response = await axiosInstance.post(url, {});

  const data = response.data;
  console.log("data:" + JSON.stringify(data, null, 2));

  return {
    success: data.success,
    id : data.id
  }

  
}



export default productApi;
