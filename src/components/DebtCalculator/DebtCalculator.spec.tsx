import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { actionTypes } from '../../features/calculator'
import DebtCalculator from './DebtCalculator'
import { BrowserRouter } from 'react-router-dom'

describe('DebtCalculator', () => {
  const mockStore = configureStore([])
  const mockDebtId = '1'
  const mockUnsecuredDebts = {
    [mockDebtId]: {
      id: mockDebtId,
      debtName: 'Test',
      remainingDebtAmount: '1500',
      currentAPR: '8',
      currentMonthlyPayment: '100',
    },
  }
  const store = mockStore({
    calculator: {
      unsecuredDebts: mockUnsecuredDebts,
    },
  })

  // Add jest mock spy to watch for store.dispatch method. See https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname for more info
  jest.spyOn(store, 'dispatch')

  test('renders without crashing.', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DebtCalculator />
        </BrowserRouter>
      </Provider>
    )

    const pageTitle = screen.getByText('ENTER YOUR CURRENT DEBTS')
    expect(pageTitle).toBeInTheDocument()
  })

  describe('when calculate savings button is clicked', () => {
    test('should store unsettledDebts and navigate to  savings page ', () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <DebtCalculator />
          </BrowserRouter>
        </Provider>
      )

      const calculateSavingsButton = screen.getByTestId('calculate-savings')
      fireEvent.click(calculateSavingsButton)

      expect(store.dispatch).toHaveBeenCalledTimes(1)

      expect(store.dispatch).toHaveBeenCalledWith({
        type: actionTypes.UPDATE_UNSECURED_DEBTS,
        payload: mockUnsecuredDebts,
      })
    })
  })
})
