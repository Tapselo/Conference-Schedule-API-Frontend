import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import DarkLayout from "./layout/layout";

function App() {
  return (
    <div>
        <Router>
            <DarkLayout/>
        </Router>
    </div>
  );
}
export default App;
