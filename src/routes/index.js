import HomeTemplate from "containers/HomeTemplate";
import AdminTemplate from "containers/AdminTemplate";

import { lazy } from "react";

const routesHome = [
    {
        exact: true,
        path: "/",
        component: lazy(() => import("../containers/HomeTemplate/HomePage/index.js"))
    }
]

const routesAdmin = [
    {
        exact: false,
        path: "/admin/course-list/approval/:idCourse",
        component: lazy(() => import("../containers/AdminTemplate/ApprovalPage"))
    },
    {
        exact: false,
        path: "/admin/course-list/unsubscribe/:idCourse",
        component: lazy(() => import("../containers/AdminTemplate/UnsubscribeByCoursePage"))
    },
    {
        exact: false,
        path: "/admin/course-list/subscribe/:idCourse",
        component: lazy(() => import("../containers/AdminTemplate/SubscribeByCoursePage"))
    },
    {
        exact: false,
        path: "/admin/course-list/edit-course/:courseCode",
        component: lazy(() => import("../containers/AdminTemplate/EditCoursePage"))
    },
    {
        exact: false,
        path: "/admin/course-list/add-course",
        component: lazy(() => import("../containers/AdminTemplate/AddCoursePage"))
    },
    {
        exact: false,
        path: "/admin/course-list",
        component: lazy(() => import("../containers/AdminTemplate/CoursePage"))
    },
    // ------------------------------------------------------------------
    {
        exact: false,
        path: "/admin/user-list/approval/:account",
        component: lazy(() => import("../containers/AdminTemplate/ApprovalCoursePage"))
    },
    {
        exact: false,
        path: "/admin/user-list/unsubscribe/:account",
        component: lazy(() => import("../containers/AdminTemplate/UnsubscribeByUserPage"))
    },
    {
        exact: false,
        path: "/admin/user-list/subscribe/:account",
        component: lazy(() => import("../containers/AdminTemplate/SubscribeByUserPage")),
    },
    {
        exact: false,
        path: "/admin/user-list/edit-user/:account",
        component: lazy(() => import("../containers/AdminTemplate/EditUserPage"))
    },
    {
        exact: false,
        path: "/admin/user-list/add-user",
        component: lazy(() => import("../containers/AdminTemplate/AddUserPage")),
    },
    {
        exact: false,
        path: "/admin/user-list/page:number",
        component: lazy(() => import("../containers/AdminTemplate/UserPage"))
    },
    // ------------------------------------------------------------------
    {
        exact: false,
        path: "/admin",
        component: lazy(() => import("../containers/AdminTemplate/DashboardPage"))
    },
    
]

const renderRoutesHome = () => {
    return routesHome.map((route, index) => {
        return <HomeTemplate key={index} exact={route.exact} path={route.path} component={route.component} />
    })
}

const renderRoutesAdmin = () => {
    return routesAdmin.map((route, index) => {
        return <AdminTemplate key={index} exact={route.exact} path={route.path} component={route.component} breabcrumbs={route.breabcrumbs} />
    })
}

export { renderRoutesHome, renderRoutesAdmin }