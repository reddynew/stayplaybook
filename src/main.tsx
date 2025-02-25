
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext'
import { HotelProvider } from './contexts/HotelContext'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <HotelProvider>
      <App />
    </HotelProvider>
  </AuthProvider>
);
