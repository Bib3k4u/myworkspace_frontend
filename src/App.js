// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TextEditor from './components/TextEditor';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className=' min-h-screen pt-16'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<TextEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
