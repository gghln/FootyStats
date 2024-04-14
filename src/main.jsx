import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Teams from './components/Teams.jsx'
import Player from './components/Player.jsx'
import './index.css'

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
      path: "teams",
      element: <Teams />,
    },
    {
      path: "player",
      element: <Player />,
    }
  ])

  
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
