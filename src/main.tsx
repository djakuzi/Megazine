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
import ReguareAuth from './helper/ReguareAuth';
import { ProfileMenu } from './layout/ProfileMenu/ProfileMenu';
import { InfoProfile } from './pages/InfoProfile/InfoProfile';
import { OrdersProfile } from './pages/OrdersProfile/OrdersProfile';


const Menu = lazy( ()=>import('./pages/Menu/Menu'))
const Cart = lazy( ()=>import('./pages/Cart/Cart'))

const Router = createBrowserRouter([
  {
    path: '/Megazine',
    element: <Megazine/>,
     children: [
      {
        path: 'start',
        element: <Start />,
      },
      {
        path: 'show',
        element: <ReguareAuth> <Show /> </ReguareAuth> ,
        children:[
          {
            path: 'menu',
            element: <Menu />,
            errorElement: <>error</>,
            
          },
          {
            path: 'cart',
            element: <Cart />
          },
          {
            path: 'profile',
            element: <ProfileMenu />,
            children:[
              {
                path: 'infoProfile',
                element: <InfoProfile />,
              },
              {
                path: 'orders',
                element: <OrdersProfile />,
              },
            ]
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
