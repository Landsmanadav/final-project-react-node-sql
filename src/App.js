import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './comp/Header'
import Main from './comp/Main'
import './App.css';
function App({ children }) {
  const [update, setUpdate] = useState(false)
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    if (localStorage.username) {
      setAuth(true)
    }
  }, [])
  return (
    <div className="App">
      <Router>
        <Header setUpdate={setUpdate} update={update} auth={auth} setAuth={setAuth} />
        <Main setUpdate={setUpdate} update={update} auth={auth} setAuth={setAuth} />
      </Router>
    </div>
  );
}

export default App;
