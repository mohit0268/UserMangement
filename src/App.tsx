import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from './pages/Signup';
import Dashboard from './pages/dashboard';
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";



function App() {
  return (
    <>
      //Routes
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
