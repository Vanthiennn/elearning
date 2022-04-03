import HomeTemplate from "containers/HomeTemplate";
import AdminTemplate from "containers/AdminTemplate";
import { lazy } from "react";

const routesHome = [
    {
        exact:true,
        path:"/",
        component:lazy(() => import("containers/HomeTemplate/HomePage"))
    },
    {
        exact:false,
        path:"/detail/:maKhoaHoc",
        component:lazy(() => import("containers/HomeTemplate/DetailCourse/detail"))
    },
    {
        exact:false,
        path:"/category/:maDanhMuc",
        component:lazy(() => import("containers/HomeTemplate/DetailCategory/index"))
    },
    {
        exact:false,
        path:"/courses/all",
        component:lazy(() => import("containers/HomeTemplate/AllCourse/AllCourse")),
    },
    {
        exact:false,
        path:"/login",
        component:lazy(() => import("containers/HomeTemplate/Login/Login")),
    },
    {
        exact:false,
        path:"/register",
        component:lazy(() => import("containers/HomeTemplate/Register/register")),
    },
    {
        exact:false,
        path:"/my-cart",
        component:lazy(() => import("containers/HomeTemplate/MyCart/MyCart")),
    },
    {
        exact:false,
        path:"/profile",
        component:lazy(() => import("containers/HomeTemplate/Profile/Profile")),
    },


]

const routesAdmin = []

const renderRoutesHome = () => {
    return routesHome.map((route,index) => {
        return <HomeTemplate key={index} exact={route.exact} path={route.path} component={route.component}/>
    })
}

const renderRoutesAdmin = () => {
    return routesAdmin.map((route,index) => {
        return <AdminTemplate key={index} exact={route.exact} path={route.path} component={route.component}/>
    })
}

export {renderRoutesHome , renderRoutesAdmin}