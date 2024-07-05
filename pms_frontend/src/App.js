import './App.css';
import Layout from './components/UI/layout';
import Home from './components/Home/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utility/ProtectedRoute';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import Task from './components/Task/Task';
import News from './components/News/News';
import ProductivityMode from './components/Productivity/Productivity';
import Goal from './components/Goal/goal';
import Analytic from './components/Analytic/Analytic';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup /> } />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/analytic" element={<ProtectedRoute><Analytic/> </ProtectedRoute>}/>
          <Route path="/task" element={<ProtectedRoute><Task /></ProtectedRoute>} />
          <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
          <Route path="/productivity" element={<ProtectedRoute><ProductivityMode /></ProtectedRoute>} />
          <Route path="/goal" element={<ProtectedRoute><Goal /></ProtectedRoute>} />
        </Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
