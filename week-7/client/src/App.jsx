// firstly, Don't get overwhelmed and if you are then go with client-easy.
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home"
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';

function App() {

  return (
    <>
      {/* start  writing from here */}
      <Router>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
       </Routes>
      </Router>
    </>
  )
}

export default App
