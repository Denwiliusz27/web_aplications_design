import './App.css'
import HomePage from "./components/HomePage";
import {Link, Route, Routes} from "react-router-dom";
import ActiveTenders from "./components/ActiveTenders";
import CompletedTenders from "./components/CompletedTenders";
import NewTender from "./components/NewTender";
import ActiveTender from "./components/ActiveTender";
import CompletedTender from "./components/CompletedTender";

function App() {

  return (
      <div className="App">
          <div className="flex flex-row bg-amber-300 h-16 mb-12 sticky top-0">
              <div className="w-1/5 hover:scale-110 text-center transition-all duration-300 font-bold italic shadow-amber-700 text-white flex flex-row drop-shadow-xl shadow-black text-2xl items-center">
                  <Link to="/" className="px-12 ">Przetargi.pl</Link>
              </div>

              <div className="flex flex-row pl-20 text-white w-4/5 drop-shadow-xl shadow-black text-xl text-center">
                  <Link to="/aktywne" className="hover:bg-amber-500 flex flex-row items-center">
                      <p className="px-12">Aktywne przetargi</p>
                  </Link>
                  <Link to="/zakończone" className="hover:bg-amber-500 flex flex-row items-center">
                      <p className="px-12">Zakończone przetargi</p>
                  </Link>
                  <Link to="/dodaj" className="hover:bg-amber-500 flex flex-row items-center">
                      <p className="px-12">Dodaj przetarg</p>
                  </Link>
              </div>
          </div>

          <Routes>
              <Route path="/" element={<HomePage/>}></Route>
              <Route path="/aktywne" element={<ActiveTenders/>}></Route>
              <Route path="/aktywne/:id" element={<ActiveTender/>}></Route>
              <Route path="/zakończone" element={<CompletedTenders/>}></Route>
              <Route path="/zakończone/:id" element={<CompletedTender/>}></Route>
              <Route path="/dodaj" element={<NewTender/>}></Route>
          </Routes>
      </div>
  )
}

export default App
