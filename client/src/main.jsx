import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ConfigProvider } from 'antd'
import {Provider} from 'react-redux'
import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimary: '#40513B',
          colorPrimaryHover: '40513B',
          borderRadius: '6px',
        },
      },
      token: {
        borderRadius: '8px',
      }
    }}>
    <App />
    </ConfigProvider>
  </Provider>,
)
