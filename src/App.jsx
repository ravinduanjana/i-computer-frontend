import { Route, Routes } from "react-router-dom";
import Test from "./components/test"
import AdminPage from "./pages/admin"
import HomePage from "./pages/home";
import LoginPage from "./pages/login";



export default function App() {
  

  return (
    <div className="w-full h-screen bg-amber-700">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/>
      </Routes>
    </div>
  );
}

