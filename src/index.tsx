import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { loadDevTools } from 'jira-dev-tool'
import 'antd/dist/antd.less'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AppProviders } from './context'

loadDevTools(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <ConfigProvider locale={zhCN}>
          <App />
        </ConfigProvider>
      </AppProviders>
    </React.StrictMode>,
    document.getElementById('root')
  )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
