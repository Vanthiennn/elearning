import './scss/index.scss';
import React,{Suspense} from "react";
import { BrowserRouter , Route, Switch } from "react-router-dom";
import PageNotFound from "containers/PageNotFound";
import {renderRoutesHome,renderRoutesAdmin} from "./routes"

function App() {
  return (
   <Suspense>
     <BrowserRouter>
      <Switch>
        {renderRoutesHome()}
        {renderRoutesAdmin()}

        <Route exact path="" component={PageNotFound}/>
      </Switch>
     </BrowserRouter>
   </Suspense> 
  )
}

export default App;
