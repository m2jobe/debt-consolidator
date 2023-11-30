import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Savings } from './pages/Savings'
import { Home } from './pages/Home'
import { Container } from '@mui/material'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Container maxWidth="md">
          <h1>Debt Consolidation Savings Calculator</h1>
          <p>
            Enter the details of your current unsecured debt and see how much
            you may be able to save after conslidating the debts in to a single
            loan. Only include credit card debt, medical debt, personal debt,
            and other types of unsecured debt.
          </p>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/savings" element={<Savings />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
