import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Paper } from './pages/Paper'
import { Papers } from './pages/Papers' 
import { Publish } from './pages/Publish'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/paper/:id" element={<Paper />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/publish" element={<Publish />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App