import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import DataProvider from "./context/DataProvider/DataProvider";
import Home from "./Components/Home/Home";
import TimeLine from "./Components/TimeLine/TimeLine";
import Dairy from "./Components/Dairy/Dairy";
import Header from "./Components/Common/Header/Header";
import Footer from "./Components/Common/Footer/Footer";
import firebaseInit from "./firebase/firebase.init/firebase.init";
import LogIn from "./Components/Authentication/LogIn/LogIn";
import TaggedPosts from "./Components/TaggedPost/TaggedPosts";
import EditPost from "./Components/EditPost/EditPost";
import SingleOne from "./Components/SingleOne/SingleOne";
import Error from "./Components/Error/Error";
import Addnew from "./Components/Addnew/Addnew";
import About from "./Components/About/About";
import Modal from "./Components/Common/Modal/Modal";
import MyBooks from "./Components/MyBooks/MyBooks";
import AddBook from "./Components/MyBooks/AddBook";
import EditBook from "./Components/MyBooks/EditBook";
import MySelf from "./Components/MyBooks/Filters/MySelf";
import ReadBook from "./Components/MyBooks/Filters/ReadBook";
import ToRead from "./Components/MyBooks/Filters/ToRead";
import ToBuy from "./Components/MyBooks/Filters/ToBuy";
import BoiBrikkho from "./Components/MyBooks/Filters/BoiBrikkho";
import Gifted from "./Components/MyBooks/Filters/Gifted";
import AllBooks from "./Components/MyBooks/Filters/AllBooks";
import PrivateRoute from "./Components/Common/PrivateRoute/PrivateRoute";
import AdminRoute from "./Components/AdminRoute/AdminRoute";

  firebaseInit();
  
function App() {
  return (
    <>
    <DataProvider>
      <BrowserRouter>
        <Header />
        <Modal />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route path="/addnew" element={<AdminRoute><Addnew /></AdminRoute>} />
          <Route path="/edit/:postId" element={<AdminRoute><EditPost /></AdminRoute>} />
          <Route path="/timeline" element={<PrivateRoute><TimeLine /></PrivateRoute>} />
          <Route path="/dairy" element={<PrivateRoute><Dairy /></PrivateRoute>} />
          <Route path="/mybooks" element={<PrivateRoute><MyBooks /></PrivateRoute>}>
            <Route path="" element={<AllBooks />} />
            <Route path="myself" element={<MySelf />} />
            <Route path="read" element={<ReadBook />} />
            <Route path="toread" element={<ToRead />} />
            <Route path="tobuy" element={<ToBuy />} />
            <Route path="boibrikkho" element={<BoiBrikkho />} />
            <Route path="gifted" element={<Gifted />} />
          </Route>
          <Route path="/addbook" element={<AdminRoute><AddBook /></AdminRoute>} />
          <Route path="/editbook/:id" element={<AdminRoute><EditBook /></AdminRoute>} />
          <Route path="/tags/:tagName" element={<PrivateRoute><TaggedPosts /></PrivateRoute>} />
          <Route path="/timeline/:id" element={<PrivateRoute><SingleOne /></PrivateRoute>} />
          <Route path="/no" element={<Error />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </DataProvider>
    </>  
  );
}

export default App;
