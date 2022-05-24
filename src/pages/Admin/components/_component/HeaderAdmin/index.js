import React from 'react';
import { useHistory } from 'react-router-dom';


export default function HeaderAdmin() {
    const user = JSON.parse(localStorage.getItem("UserAdmin"));
    const history = useHistory()

    const hanldeLogout = () => {
        if (window.confirm(`Do you want to sign out ${user.taiKhoan} account ?`)) {
            localStorage.clear();
            history.push("/auth")
        }
    }
    return (
        <div style={{ height: 64, backgroundColor: "white", display: "flex", justifyContent: "flex-end" }}>
            <div className='header-admin mr-5'>
                <p className='mr-3' style={{ fontSize: 20 }}>Hello, <span style={{ color: "red" }} >{user.taiKhoan}</span> !</p>
                <button className='btn btn-danger' onClick={hanldeLogout}>Log out</button>
            </div>
        </div>
    )
}
