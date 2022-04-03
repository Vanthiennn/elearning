import Home from "pages/Home";
import Admin from "pages/Admin";
import { lazy } from "react";

const routesHome = [
    {
        exact:true,
        path:"/",
        component:lazy(() => import("pages/Home/components/HomePage"))
    },
    {
        exact:false,
        path:"/detail/:maKhoaHoc",
        component:lazy(() => import("pages/Home/components/DetailCourse"))
    },
    {
        exact:false,
        path:"/category/:maDanhMuc",
        component:lazy(() => import("pages/Home/components/DetailCategory"))
    },
    {
        exact:false,
        path:"/courses/all",
        component:lazy(() => import("pages/Home/components/AllCourse")),
    },
    {
        exact:false,
        path:"/login",
        component:lazy(() => import("components/Login")),
    },
    {
        exact:false,
        path:"/register",
        component:lazy(() => import("pages/Home/components/Register")),
    },
    {
        exact:false,
        path:"/my-cart",
        component:lazy(() => import("pages/Home/components/MyCart")),
    },
    {
        exact:false,
        path:"/profile",
        component:lazy(() => import("pages/Home/components/Profile")),
    },


]

const routesAdmin = []

const renderRoutesHome = () => {
    return routesHome.map((route,index) => {
        return <Home key={index} exact={route.exact} path={route.path} component={route.component}/>
    })
}

const renderRoutesAdmin = () => {
    return routesAdmin.map((route,index) => {
        return <Admin key={index} exact={route.exact} path={route.path} component={route.component}/>
    })
}

export {renderRoutesHome , renderRoutesAdmin}