import React, { Fragment,useEffect } from "react";
import { Route } from "react-router-dom";
import Navbar from "./_components/navbar/Navbar";
import Footer from "./_components/footer/Footer";


export default function HomeTemplate(props) {
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
