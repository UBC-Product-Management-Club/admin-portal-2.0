
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.href,
        connection: import.meta.env.VITE_AUTH0_CONNECTION 
      }}
    >
      <ThemeProvider defaultTheme="system" storageKey="membership-portal-theme">
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
