import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Truglow from "./pages/truglow";

import "./css/style.css";

const App = () => {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  
  return(
    <HashRouter>
      <Routes>
        <Route path="/truglow" element={<Truglow></Truglow>}></Route>
      </Routes>
    </HashRouter>
  )
}

export default App;
