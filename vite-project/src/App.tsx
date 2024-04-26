import './App.css';
import './components/HomePage';
import {HomePage} from './components/HomePage';
import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
      </Routes>
    </HashRouter>
  )
}
export default App
