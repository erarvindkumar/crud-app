import './App.css';
import Nav from './Components/Nav';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import PrivateComponent from './Components/PrivateComponent'
import Login from './Components/Login'
import AddStudents from './Components/AddStudents';
import StudentList from './Components/StudentList';
import UpdateStudent from './Components/UpdateComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Nav />
     <Routes>
       <Route element={<PrivateComponent />}>
       <Route path="/" element={<StudentList />} />
       <Route path="/add" element={<AddStudents />} />
       <Route path="/update/:name" element={<UpdateStudent />} />
       <Route path="/logout" element={<h1> Logout Component</h1>} />
       <Route path="/profile" element={<h1>Profile Component</h1>} />

       <Route path="/signup" element={<SignUp />} />
       <Route path="/login" element={<Login />} />
       </Route>

       

     </Routes>
     </BrowserRouter>
     <Footer />
    </div>
  );
}

export default App;
