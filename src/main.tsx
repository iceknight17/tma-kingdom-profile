import React from 'react'
import ReactDOM from 'react-dom/client'
import WebApp from '@twa-dev/sdk'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import './index.css'

WebApp.ready();

ReactDOM.createRoot(document.getElementById('root')!).render(
<TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json" actionsConfiguration={{ twaReturnUrl: 'https://t.me/happpydaybot' }}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</TonConnectUIProvider>,
)
