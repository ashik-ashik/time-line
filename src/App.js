import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import DataProvider from "./context/DataProvider/DataProvider";
import Home from "./Components/Home/Home";
import TimeLine from "./Components/TimeLine/TimeLine";
import Dairy from "./Components/Dairy/Dairy";
import Header from "./Components/Common/Header/Header";
import Footer from "./Components/Common/Footer/Footer";
import firebaseInit from "./firebase/firebase.init/firebase.init";

  firebaseInit();
  
function App() {
  return (
    <>
    <DataProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/timeline" element={<TimeLine />} />
          <Route path="/dairy" element={<Dairy />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </DataProvider>
    </>
  );
}

export default App;
