import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Navigation from './components/Navigation/Navigation';
import { store } from './state/store';
import JobForm from './pages/JobForm/JobForm';
import { CVForm } from './pages/CVForm/CVForm';
import MyCV from './pages/MyCV/MyCV';

const App: React.FC = () => {
  return (
  <Provider store={store}>
    <div className="App">
      
      <BrowserRouter>
      <Navigation />
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/new-job" element={<JobForm/>}/>
            <Route path="/new-cv" element={<CVForm/>}/>
            <Route path="/my-cv" element={<MyCV/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
