import HomeTemplate from "containers/HomeTemplate";
import AdminTemplate from "containers/AdminTemplate";

import { lazy } from "react";

const routesHome = []

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