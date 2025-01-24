import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <>
      <Router>
        <h1 className="text-5xl text-center my-5 underline">Curd Operations</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/editUser/:id" element={<EditUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
