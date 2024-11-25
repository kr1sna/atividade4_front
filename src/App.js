import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./paginas/Home/Home";
import Dados from "./paginas/dados/Dados";
import Graficos from "./paginas/graficos/Graficos";

function App() {

  console.log("App is rendering...");
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graphs" element={<Graficos />} />
          <Route path="/data" element={<Dados />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
