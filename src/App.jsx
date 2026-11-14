import { Route, Routes } from "react-router-dom";
import Test from "./components/test"
import AdminPage from "./pages/admin"
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import { Toaster } from "react-hot-toast";



export default function App() {
  

  return (

    <div className="w-full h-screen bg-primary text-secondary">
      <Toaster position="top-center"/> {/* npm install react-hot-toaster gahala dgtha library eka meka methanta demmama mulu project ekama cover weno e wagema msg eka display wenna ona thena position eka dena kemthi widiyta ctrl + space ghla. */}
      <Routes>{/* Routes walin krnna eka eka url eka anuwa pennana web page eka decide kirima. */}
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/> {/* /* oken wenne admint passe wena monawa thibbath url eke admin page eka show krai */}
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </div>
  );
}

