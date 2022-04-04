import "./scss/index.scss"
import React,{Suspense} from "react";
import { BrowserRouter , Route, Switch } from "react-router-dom";
import PageNotFound from "pages/PageNotFound";
import {renderRoutesHome,renderRoutesAdmin} from "./routes"
import AuthPage from "pages/Admin/components/AuthPage";

function App() {
  return (
   <Suspense fallback={<div>Loading... </div>}>
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
