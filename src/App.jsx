import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Components/Header/Header";
import Tableshow from "./Components/Tableshow/Tableshow";
import Edit from "./Components/Edit";
import Create from "./Components/Create";
import View from "./Components/View";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import UserContextProvider from "./Components/Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoutes";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DefaultCode from "./Components/Code";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/table" element={<Tableshow />} />
          <Route path="/edit" element={<ProtectedRoute element={<Edit />} />} />
          <Route
            path="/dashboard/create"
            element={<ProtectedRoute element={<Create />} />}
          />
          <Route path="/view" element={<View />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<Edit />} />
          <Route path="/table" element={<Tableshow />} />
          {/* <Route path="/edit" element={<Edit />} /> */}
          {/* <Route path="/:id" element={<Edit />} /> */}
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
          <Route path="/code" element={<DefaultCode />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
