import Header from './pages/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import {Toaster} from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import Upload from './Upload'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element= {<Upload />}/>
        <Route path='/login' element= {<Login />}/>
        <Route path='/register' element= {<Register />}/>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
