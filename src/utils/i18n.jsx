import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            //admin
            "currency": "${{value}}",
            "nav": {
                "dashboard": "Dashboard",
                "users": "Users",
                "settings": "Settings",
                "admin": "Admin",
                "logout": "Logout",
                "profile": "Profile"
            },
            "adminTitle": {
                "dashboard": "Dashboard",
                "usermanagement": "Users",
                "productmanagement": "Products",
                "ordermanagement": "Orders",
                "vouchermanagement": "Vouchers",
                "productstockmanagement": "Product Stock",
                "logmanagement": "Log"
            },
            "adminHome": {
                "totalOrder": "Total Order",
                "totalSales": "Total Sales",
                "bestSelling": "Best week's selling",
                "cancelledOrders": "Cancelled Orders",
                "upFromLastWeek": "Up from past week",
                "downFromLastWeek": "Down from past week",
                "salesDetails": "Sales Details",
                "thisWeek": "This Week",
                "thisMonth": "This month",
                "thisYear": "This year",
                "loading": "Loading..."
            },
            "log": {
                "title": "Log Management",
                "itemsPerPage": "Items/Page",
                "date": "Date",
                "reset": "Reset",
                "id": "ID",
                "action": "Action",
                "dataIn": "Data In",
                "dataOut": "Data Out",
                "ip": "IP",
                "level": "Level",
                "resource": "Resource",
                "user": "User"
            },
            "orderAdmin": {
                "title": "Order Management",
                "filter": "Filter",
                "reset": "Reset",
                "date": "Date",
                "method": "Method",
                "status": "Status",
                "username": "Username",
                "totalValue": "Total Value",
                "quantity": "Quantity",
                "payment": "Payment",
                "editStatus": "Edit Order Status",
                "selectStatus": "Select Status",
                "statusCancel": "Cancelled",
                "statusComplete": "Completed",
                "cancel": "Cancel",
                "update": "Update"
            },
            "productAdmin": {
                "title": "Product Management",
                "name": "Name",
                "price": "Price",
                "category": "Category",
                "image": "Image",
                "description": "Description",
                "rating": "Rating",
                "confirmDelete": "Are you sure you want to delete this product?",
                "deleteSuccess": "Delete success!",
                "deleteFail": "Failed to delete product"
            },
            "stock": {
                "title": "Product Stock",
                "name": "Name",
                "image": "Image",
                "date": "Date",
                "quantity": "Quantity",
                "price": "Price",
                "id": "ID",
                "remain": "Remain",
                "records": "Records",
                "reset": "Reset",
                "itemsPerPage": "Items/Page"
            },
            "userAdmin": {
                "title": "User Management",
                "name": "Name",
                "email": "Email",
                "phone": "Phone",
                "birthday": "Birthday",
                "role": "Role",
                "editUserRole": "Edit User Role",
                "selectRole": "Select Role",
                "admin": "Admin",
                "user": "User",
                "cancel": "Cancel",
                "update": "Update"
            },
            "voucherAdmin": {
                "title": "Voucher Management",
                "code": "Code",
                "description": "Description",
                "quantity": "Quantity",
                "discount": "Discount",
                "cancel": "Cancel",
                "save": "Save",
                "add": "Add",
                "editVoucher": "Edit Voucher",
                "addVoucher": "Add New Voucher",
                "itemsPerPage": "Items/Page"
            }
        },
    },
    vi: {
        translation: {
            //admin
            "currency": "{{value}}VNĐ",
            "nav": {
                "dashboard": "Bảng điều khiển",
                "users": "Người dùng",
                "settings": "Cài đặt",
                "admin": "Quản trị",
                "logout": "Đăng xuất",
                "profile": "Hồ sơ"
            },
            "adminTitle": {
                "dashboard": "Thống kê",
                "usermanagement": "Người dùng",
                "productmanagement": "Sản phẩm",
                "ordermanagement": "Đơn hàng",
                "vouchermanagement": "Mã giảm giá",
                "productstockmanagement": "Kho hàng",
                "logmanagement": "Nhật ký"
            },
            "adminHome": {
                "totalOrder": "Tổng đơn hàng",
                "totalSales": "Tổng doanh thu",
                "bestSelling": "Sản phẩm bán chạy nhất tuần",
                "cancelledOrders": "Đơn bị hủy",
                "upFromLastWeek": "Tăng so với tuần trước",
                "downFromLastWeek": "Giảm so với tuần trước",
                "salesDetails": "Chi tiết doanh thu",
                "thisWeek": "Tuần này",
                "thisMonth": "Tháng này",
                "thisYear": "Năm nay",
                "loading": "Đang tải..."
            },
            "log": {
                "title": "Quản lý nhật ký",
                "itemsPerPage": "Mục/Trang",
                "date": "Ngày",
                "reset": "Đặt lại",
                "id": "ID",
                "action": "Hành động",
                "dataIn": "Dữ liệu vào",
                "dataOut": "Dữ liệu ra",
                "ip": "IP",
                "level": "Mức độ",
                "resource": "Tài nguyên",
                "user": "Người dùng"
            },
            "orderAdmin": {
                "title": "Quản lý đơn hàng",
                "filter": "Bộ lọc",
                "reset": "Đặt lại",
                "date": "Ngày",
                "method": "Phương thức",
                "status": "Trạng thái",
                "username": "Người dùng",
                "totalValue": "Tổng tiền",
                "quantity": "Số lượng",
                "payment": "Thanh toán",
                "editStatus": "Chỉnh sửa trạng thái đơn hàng",
                "selectStatus": "Chọn trạng thái",
                "statusCancel": "Đã hủy",
                "statusComplete": "Hoàn tất",
                "cancel": "Hủy",
                "update": "Cập nhật"
            },
            "productAdmin": {
                "title": "Quản lý sản phẩm",
                "name": "Tên",
                "price": "Giá",
                "category": "Danh mục",
                "image": "Hình ảnh",
                "description": "Mô tả",
                "rating": "Đánh giá",
                "confirmDelete": "Bạn có chắc chắn muốn xóa sản phẩm này?",
                "deleteSuccess": "Xóa sản phẩm thành công!",
                "deleteFail": "Xóa sản phẩm thất bại"
            },
            "stock": {
                "title": "Tồn kho sản phẩm",
                "name": "Tên",
                "image": "Hình ảnh",
                "date": "Ngày",
                "quantity": "Số lượng",
                "price": "Giá",
                "id": "ID",
                "remain": "Hàng tồn kho",
                "records": "Lịch sử nhập",
                "reset": "Đặt lại",
                "itemsPerPage": "Mục/trang"
            },
            "userAdmin": {
                "title": "Quản lý người dùng",
                "name": "Tên",
                "email": "Email",
                "phone": "Số điện thoại",
                "birthday": "Ngày sinh",
                "role": "Vai trò",
                "editUserRole": "Chỉnh sửa vai trò người dùng",
                "selectRole": "Chọn vai trò",
                "admin": "Quản trị viên",
                "user": "Người dùng",
                "cancel": "Hủy",
                "update": "Cập nhật"
            },
            "voucherAdmin": {
                "title": "Quản lý mã giảm giá",
                "code": "Mã",
                "description": "Mô tả",
                "quantity": "Số lượng",
                "discount": "Giảm giá",
                "cancel": "Hủy",
                "save": "Lưu",
                "add": "Thêm",
                "editVoucher": "Chỉnh sửa voucher",
                "addVoucher": "Thêm voucher mới",
                "itemsPerPage": "Mục/trang"
            }
        },
    },
};

i18n
    .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
    .use(initReactI18next) // Kết nối với React
    .init({
        resources,
        fallbackLng: 'en', // Ngôn ngữ mặc định nếu không phát hiện được
        interpolation: {
            escapeValue: false, // React đã xử lý XSS
        },
    });

export default resources;