export interface ProductDetailModel {
  product: Product | null;
  images: string[];
  comments: Comment[];
  owner: User | null;
  category: Category | null;
  sold: boolean;
};

export interface ProductDetailResponse {
  product: Product;
  category: Category;
  images: string[];
  comments: Comment[];
  owner: User;
  isSold: boolean;

}

export interface Product {
  id: number;
  name: string;
  price: number;
  qty: number;
  description: string;
  createAt: Date;
}

export interface Comment {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
  parentId: number;
  level: number;
  replies: Comment[] | [];
}


export interface User {
  id: number;
  name: string;
  soldOrderQty: number;
  rating: number;
  avatar: string;
}

export interface Category {
  title: string;
  link: string;
  
}

// {
//     "product": {
//         "id": 2,
//         "name": "Ao thun mau den",
//         "price": 200000.0,
//         "category": null,
//         "user": null,
//         "description": "Đẹp",
//         "images": [],
//         "comments": [],
//         "isSold": 0,
//         "isDeleted": 0,
//         "createdAt": null
//     },
//    "category": {
//         "id": 1,
//         "title": "Quần áo",
//         "link": "quan-ao",
//         "isDeleted": 0
//     },
//     "images": [
//        "quan-jean.png",
//        "kinh-channel.png",
//        "kinh-channel.png"
//     ],
//     "comments": [
//         {
//             "id": 1,
//             "productId": 2,
//             "userId": 2,
//             "userName": "Tri",
//             "content": "Hàng còn không",
//             "createdAt": "2025-05-23T11:45:07",
//             "parentId": 0,
//             "level": 0,
//             "replies": [
//                 {
//                     "id": 2,
//                     "productId": 2,
//                     "userId": 1,
//                     "userName": "To Nhat",
//                     "content": "Còn bạn ơi",
//                     "createdAt": "2025-05-23T11:45:31",
//                     "parentId": 1,
//                     "level": 1,
//                     "replies": []
//                 },
//                 {
//                     "id": 3,
//                     "productId": 2,
//                     "userId": 2,
//                     "userName": "Tri",
//                     "content": "B còn màu nào",
//                     "createdAt": "2025-05-23T11:49:45",
//                     "parentId": 1,
//                     "level": 1,
//                     "replies": []
//                 },
//                 {
//                     "id": 4,
//                     "productId": 2,
//                     "userId": 1,
//                     "userName": "To Nhat",
//                     "content": "Màu tím",
//                     "createdAt": "2025-05-23T11:50:32",
//                     "parentId": 1,
//                     "level": 1,
//                     "replies": []
//                 }
//             ]
//         },
//         {
//             "id": 5,
//             "productId": 2,
//             "userId": 3,
//             "userName": "Hau",
//             "content": "Giảm 50% không",
//             "createdAt": "2025-05-23T11:50:56",
//             "parentId": 0,
//             "level": 0,
//             "replies": [
//                 {
//                     "id": 6,
//                     "productId": 2,
//                     "userId": 1,
//                     "userName": "To Nhat",
//                     "content": "Giảm 20% thoi b",
//                     "createdAt": "2025-05-23T11:51:44",
//                     "parentId": 5,
//                     "level": 1,
//                     "replies": []
//                 }
//             ]
//         }
//     ],
//     "owner": {
//         "id": 1,
//         "name": "To Nhat",
//         "image": null,
//         "email": null,
//         "pwd": null,
//         "birthday": null,
//         "addresses": [],
//         "soldOrderQty": 0,
//         "rating": 0,
//         "totalReview": 0,
//         "isDeleted": 0,
//         "imageUrl": "images/avatars/quan-jean.png"

//     },
//     "sold": false
// }