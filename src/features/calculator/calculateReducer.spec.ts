import { UPDATE_UNSECURED_DEBTS } from './actionTypes'
import calculatorReducer from './calculatorReducer'
import { CalculatorActionTypes, UnsecuredDebt } from './types'

describe('features > calculator > calculatorReducer', () => {
  test(`updates unsecuredDebts, if ${UPDATE_UNSECURED_DEBTS} action is provided`, () => {
    let mockUnsettledDebt: UnsecuredDebt = {
      id: '1',
      debtName: 'test',
      remainingDebtAmount: '500',
      currentAPR: '8',
      currentMonthlyPayment: '24',
    }
    const mockUnsettledDebts = { [mockUnsettledDebt.id]: mockUnsettledDebt }

    const initialState = {
      unsecuredDebts: {},
    }

    const expectedState = {
      unsecuredDebts: mockUnsettledDebts,
    }

    const action: CalculatorActionTypes = {
      type: UPDATE_UNSECURED_DEBTS,
      payload: mockUnsettledDebts,
    }

    expect(calculatorReducer(initialState, action)).toEqual(expectedState)
  })
})
