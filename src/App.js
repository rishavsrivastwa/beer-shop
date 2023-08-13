import react from 'react';
import './App.css';
import Home from './components/Home';
import Favourite from './components/Favourite';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/fav' element={<Favourite/>}></Route>
      </>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
