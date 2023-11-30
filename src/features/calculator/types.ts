import { UPDATE_UNSECURED_DEBTS } from './actionTypes'

export type UnsecuredDebt = {
  id: string
  debtName: string
  remainingDebtAmount: string
  currentAPR: string
  currentMonthlyPayment: string
}

interface AddUnsecuredDebtAction {
  type: typeof UPDATE_UNSECURED_DEBTS
  payload: Record<string, UnsecuredDebt>
}

export type CalculatorActionTypes = AddUnsecuredDebtAction

export interface SystemState {
  calculator: {
    unsecuredDebts: Record<string, UnsecuredDebt>
  }
}
