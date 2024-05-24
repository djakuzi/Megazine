import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './index.css'
import Auth from './layout/Auth/Auth';
import Megazine from './layout/Megazine/Megazine';
import Show from './layout/Show/Show';
import Start from './layout/Start/Start';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import {Provider} from 'react-redux' 
import { store } from './redux/store';


const Menu = lazy( ()=>import('./pages/Menu/Menu'))
const Cart = lazy( ()=>import('./pages/Cart/Cart'))

const Router = createBrowserRouter([
  {
    path: '/megazine',
    element: <Megazine/>,
     children: [
      {
        path: 'start',
        element: <Start />,
      },
      {
        path: 'show',
        element: <Show />,
        children:[
          {
            path: 'menu',
            element: <Menu />,
            errorElement: <>error</>,
            
          },
          {
            path: 'cart',
            element: <Cart />
          }
        ]
      },
      {
        path: 'auth',
        element: <Auth />,
        children:[
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register/>
          }
        ]
      }
     ]
  },
  {
    path: "*",
    element: <>Произошла ошибка{'((('}</>,
  }

]); 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>,
)
