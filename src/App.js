import { useState } from "react";
import { LoginForm } from "./components/login/Login";
import TabelComponent from "./components/Tabel-component";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


export default function App() {
 
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="team-members" element={<TabelComponent/>} />
    </Routes>
  </BrowserRouter>,
    </div>
  );
}
