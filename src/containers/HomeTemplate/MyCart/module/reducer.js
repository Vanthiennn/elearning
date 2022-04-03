import * as ActionType from "./constant"

const initState = {
    listCart:[
        {
            "maKhoaHoc": "67",
            "biDanh": "tieng-viet-lop-1",
            "tenKhoaHoc": "Tiếng Việt Lớp 1",
            "moTa": "Sách Giáo Khoa Tiếng Việt Lớp 1 giúp các em làm quen với bảng chữ cái và các dấu câu, các âm cơ bản trong tiếng việt và học cách đánh vần.\n\nPhân biệt chữ thường, chữ hoa trong cách viết. Với những hình vẽ sinh động, thực tế và cách phát âm chính xác giúp các em làm quen với môn tiếng việt dễ dàng.",
            "luotXem": 100,
            "hinhAnh": "https://elearning0706.cybersoft.edu.vn/hinhanh/tieng-viet-lop-1_gp05.jpg",
            "maNhom": "GP05",
            "ngayTao": "10/10/2020",
            "soLuongHocVien": 0,
            "nguoiTao": {
                "taiKhoan": "admin94",
                "hoTen": "admin",
                "maLoaiNguoiDung": "GV",
                "tenLoaiNguoiDung": "Giáo vụ"
            },
            "danhMucKhoaHoc": {
                "maDanhMucKhoahoc": "TuDuy",
                "tenDanhMucKhoaHoc": "Tư duy lập trình"
            },
            "fee": 76
        },
        {
            "maKhoaHoc": "asdasd",
            "biDanh": "asdasdasdada",
            "tenKhoaHoc": "asdasdasdada",
            "moTa": "asdasdsad",
            "luotXem": 100,
            "hinhAnh": "https://elearning0706.cybersoft.edu.vn/hinhanh/asdasdasdada_gp05.jpg",
            "maNhom": "GP05",
            "ngayTao": "17/07/2021",
            "soLuongHocVien": 0,
            "nguoiTao": {
                "taiKhoan": "thaitran456",
                "hoTen": "thaitran",
                "maLoaiNguoiDung": "GV",
                "tenLoaiNguoiDung": "Giáo vụ"
            },
            "danhMucKhoaHoc": {
                "maDanhMucKhoahoc": "DiDong",
                "tenDanhMucKhoaHoc": "Lập trình di động"
            },
            "fee": 91
        },
        {
            "maKhoaHoc": "FontEnd-1C",
            "biDanh": "html-css-sass",
            "tenKhoaHoc": "HTML - CSS - SASS ",
            "moTa": "12121",
            "luotXem": 100,
            "hinhAnh": "https://elearning0706.cybersoft.edu.vn/hinhanh/html-css-sass_gp05.png",
            "maNhom": "GP05",
            "ngayTao": "03/07/2021",
            "soLuongHocVien": 0,
            "nguoiTao": {
                "taiKhoan": "duyanh123",
                "hoTen": "vuduyanhdeptrai",
                "maLoaiNguoiDung": "GV",
                "tenLoaiNguoiDung": "Giáo vụ"
            },
            "danhMucKhoaHoc": {
                "maDanhMucKhoahoc": "FrontEnd",
                "tenDanhMucKhoaHoc": "Lập trình Front end"
            },
            "fee": 80
        }
    ]
}

const listCartReducer = (state=initState , action) => {
    switch (action.type) {
        case ActionType.ADD_TO_CART:{
            let index = state.listCart.findIndex(item => {
                return item.maKhoaHoc === action.data.maKhoaHoc
            })
            if(index === -1) {
                state.listCart = [...state.listCart, action.data]
            }
            return {...state}
        }  
        case ActionType.DELETE_CART:{
            let listCart = [...state.listCart]
            let indexx = state.listCart.findIndex(item => {
                return item.maKhoaHoc === action.maKhoaHoc
            })
            listCart.splice(indexx,1)
            state.listCart = listCart
            return {...state}
        }   
        case ActionType.RELOAD_CART:{
            state.listCart = []
            return {...state}
        }
        default: return {...state}
    }
}

export default listCartReducer