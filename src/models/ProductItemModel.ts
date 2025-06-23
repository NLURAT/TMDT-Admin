export interface DetailProductItemModel {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  description: string; 
  pickUpInfo: string;
  userId: number;
  userName: string;
  userAvatar: string;
  isSold: boolean;
};

export interface DetailProductItemModelList {
  detailProductItemModels :DetailProductItemModel[]
};

export interface ProductItemModel {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  isSold: boolean;
};


export interface PaginatedProductsResult {
  products: ProductItemModel[];
  isFirst: boolean;
  isLast: boolean;
  nextPage: number | 0;
  
}

export interface ProductResponse<T> {
  content: T[];
  number: number; // so trang hien tai: 0,1,2,...
  first: boolean;
  last: boolean;
  size: number;
  numberOfElements: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  empty: boolean;
}
