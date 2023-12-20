import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './landing';

function App() {
  return (
   <Router  >
    <Routes>
      <Route path="/" element={<Landing/>}/>
    </Routes>
   </Router>
  );
}

export default App;
