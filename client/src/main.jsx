import { createRoot } from 'react-dom/client'
import App from "./App";
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import store from './store/store.js'
import { Provider } from 'react-redux'
import { Toaster } from './components/ui/toaster.jsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
      <Provider store={store}>
           <App />
           <Toaster/>
      </Provider>
      </StrictMode>

  </BrowserRouter>


)
