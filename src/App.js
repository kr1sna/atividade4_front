import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./paginas/Home/Home";
import Dados from "./paginas/dados/Dados";
import GraficosIndoor from "./paginas/graficos/Graficos_Indoor";
import GraficosOutdoorUm from "./paginas/graficos/Graficos_Outdoor_1";
import GraficosOutdoorDois from "./paginas/graficos/Graficos_Outdoor_2";
import GraficosOutdoorTres from "./paginas/graficos/Graficos_Outdoor_3";
import SelectCenario from "./paginas/Home/SelectCenario";
import SelectOutdoor from "./paginas/Home/SelectOutdoor";

function App() {

  console.log("App is rendering...");
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scenarios" element={<SelectCenario />} />
          <Route path="/outdoor" element={<SelectOutdoor />} />
          <Route path="/indoor" element={<GraficosIndoor />} />
          <Route path="/outdoor01" element={<GraficosOutdoorUm />} />
          <Route path="/outdoor02" element={<GraficosOutdoorDois />} />
          <Route path="/outdoor03" element={<GraficosOutdoorTres />} />
          <Route path="/data" element={<Dados />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
