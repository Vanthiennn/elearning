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

const routesAdmin = [
    {
        exact: false,
        path: "/admin/course-list/approval/:idCourse",
        component: lazy(() => import("pages/Admin/components/ApprovalPage"))
    },
    {
        exact: false,
        path: "/admin/course-list/unsubscribe/:idCourse",
        component: lazy(() => import("pages/Admin/components/UnsubscribeByCoursePage"))
    },
    {
        exact: false,
        path: "/admin/course-list/subscribe/:idCourse",
        component: lazy(() => import("pages/Admin/components/SubscribeByCoursePage"))
    },
    {
        exact: false,
        path: "/admin/course-list/edit-course/:courseCode",
        component: lazy(() => import("pages/Admin/components/EditCoursePage"))
    },
    {
        exact: false,
        path: "/admin/course-list/add-course",
        component: lazy(() => import("pages/Admin/components/AddCoursePage"))
    },
    {
        exact: false,
        path: "/admin/course-list",
        component: lazy(() => import("pages/Admin/components/CoursePage"))
    },
    // ------------------------------------------------------------------
    {
        exact: false,
        path: "/admin/user-list/approval/:account",
        component: lazy(() => import("pages/Admin/components/ApprovalCoursePage"))
    },
    {
        exact: false,
        path: "/admin/user-list/unsubscribe/:account",
        component: lazy(() => import("pages/Admin/components/UnsubscribeByUserPage"))
    },
    {
        exact: false,
        path: "/admin/user-list/subscribe/:account",
        component: lazy(() => import("pages/Admin/components/SubscribeByUserPage")),
    },
    {
        exact: false,
        path: "/admin/user-list/edit-user/:account",
        component: lazy(() => import("pages/Admin/components/EditUserPage"))
    },
    {
        exact: false,
        path: "/admin/user-list/add-user",
        component: lazy(() => import("pages/Admin/components/AddUserPage")),
    },
    {
        exact: false,
        path: "/admin/user-list/page:number",
        component: lazy(() => import("pages/Admin/components/UserPage"))
    },
    // ------------------------------------------------------------------
    {
        exact: false,
        path: "/admin",
        component: lazy(() => import("pages/Admin/components/DashboardPage"))
    },
    
]

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

export { renderRoutesHome, renderRoutesAdmin }