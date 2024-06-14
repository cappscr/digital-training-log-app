import { Routes } from './Routes'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

import 'bootstrap-icons/font/bootstrap-icons.css'

function App() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'digital-training-log-app.firebaseapp.com',
    projectId: 'digital-training-log-app',
    storageBucket: 'digital-training-log-app.appspot.com',
    messagingSenderId: '249849079109',
    appId: '1:249849079109:web:972f47b64653ac40f80a2c',
  }
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)

  return (
    <div className="App">
      <Routes />
    </div>
  )
}

export default App
