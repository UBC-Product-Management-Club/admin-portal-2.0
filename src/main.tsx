
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

const domain = 'your-auth0-domain.auth0.com' // Replace with your Auth0 domain
const clientId = 'your-auth0-client-id' // Replace with your Auth0 client ID
const redirectUri = window.location.origin

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri
      }}
    >
      <ThemeProvider defaultTheme="system" storageKey="membership-portal-theme">
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
