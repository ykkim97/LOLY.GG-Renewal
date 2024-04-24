import './App.css'
import Layout from './Layout'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import ChampionInfo from './pages/ChampionInfo/ChampionInfo'

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        >
        </Route>
        <Route
          path="/championInfo"
          element={<ChampionInfo />}
        >
        </Route>
      </Routes>
    </Layout>
  )
}

export default App
