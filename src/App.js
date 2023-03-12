import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import CssBaseline from '@mui/material/CssBaseline';


function App() {
  return (
    <>
    <CssBaseline />
    <div className="App">
      <div className='container'>
        <Header />
        <div>
          <Home />
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
