import React, { Fragment,useEffect } from "react";
import { Route } from "react-router-dom";
import Navbar from "../../layouts/Home/components/navbar/Navbar";
import Footer from "../../layouts/Home/components/footer";


export default function Home(props) {
  const { exact, path, component } = props;
  useEffect(() =>{
    window.scrollTo(0,0)
  })
  return (
    <Fragment>
      <Navbar/>
      <Route exact={exact} path={path} component={component}></Route>
      <Footer/>
    </Fragment>
  )
}
