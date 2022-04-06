import "./scss/index.scss"
import React,{Suspense} from "react";
import { BrowserRouter , Route, Switch } from "react-router-dom";
import PageNotFound from "pages/PageNotFound";
import {renderRoutesHome,renderRoutesAdmin} from "./routes"
import AuthPage from "pages/Admin/components/AuthPage";
import Loading from "components/Loading";
import { useEffect } from 'react'
import { reloadCart } from "store/cart/actions"
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reloadCart());
  }, []);
  return (
   <Suspense fallback={<Loading/>}>
     <BrowserRouter>
      <Switch>
        {renderRoutesHome()}
        {renderRoutesAdmin()}
        <Route path="/auth" component={AuthPage}/>
        <Route path="" component={PageNotFound}/>
      </Switch>
     </BrowserRouter>
   </Suspense> 
  )
}

export default App;
