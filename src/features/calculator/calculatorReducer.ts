/* eslint-disable @typescript-eslint/default-param-last */

import { UPDATE_UNSECURED_DEBTS } from './actionTypes'
import { CalculatorActionTypes } from './types'
import { v4 as uuidv4 } from 'uuid'

const initialDebtId = uuidv4()

const initialState = {
  unsecuredDebts: {
    [initialDebtId]: {
      id: initialDebtId,
      debtName: '',
      remainingDebtAmount: '',
      currentAPR: '',
      currentMonthlyPayment: '',
    },
  },
}

export default (state = initialState, action: CalculatorActionTypes) => {
  switch (action.type) {
    case UPDATE_UNSECURED_DEBTS:
      let unsecuredDebts = { ...state.unsecuredDebts }
      unsecuredDebts = action.payload
      return { ...state, unsecuredDebts }
    default:
      return state
  }
}
