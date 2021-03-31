import React from "react";
import "./App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import { Provider } from "react-redux";
import store from "./redux/store";
import FilmsGridWrapper from "./Components/FilmsGridWrapper"


function App() {
  
  return <Provider store={store}>

   <div className="App">
    <Header/>
   <FilmsGridWrapper/>
   <Footer/>
    </div>
    </Provider>
    ;
}

export default App;
