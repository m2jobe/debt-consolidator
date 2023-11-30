import { SystemState, UnsecuredDebt } from './types'
import * as finance from '../../services/modules/finance'

//Todo: Unit test these selector functions and consider improved error handling
export const getUnsecuredDebts = (state: SystemState) =>
  state.calculator.unsecuredDebts

export const getNewMonthlyRepayment = (
  state: SystemState,
  loanAPR: number,
  loanTerm: number
) => {
  const unsettedDebtsArray = Object.values(state.calculator.unsecuredDebts)

  const totalDebtAmount = unsettedDebtsArray.reduce(
    (a: number, debt: UnsecuredDebt) =>
      a + parseFloat(debt.remainingDebtAmount),
    0
  )

  const financedPaymentAmount = finance.calculatePayment(
    totalDebtAmount,
    loanTerm,
    loanAPR
  )

  return financedPaymentAmount
}

export const getCurrentMonthlyPayment = (state: SystemState) => {
  const unsettedDebtsArray = Object.values(state.calculator.unsecuredDebts)

  const totalMonthlyPayment = unsettedDebtsArray.reduce(
    (a: number, debt: UnsecuredDebt) =>
      a + parseFloat(debt.currentMonthlyPayment),
    0
  )

  return totalMonthlyPayment
}

export const getCurrentTotalPayment = (state: SystemState) => {
  const unsettedDebtsArray = Object.values(state.calculator.unsecuredDebts)

  let currentTotalPayment = 0
  for (let debt of unsettedDebtsArray) {
    let monthsLeftToPayOff = finance.calculateMonths(
      debt.remainingDebtAmount,
      debt.currentAPR,
      debt.currentMonthlyPayment
    )

    currentTotalPayment +=
      monthsLeftToPayOff * parseFloat(debt.currentMonthlyPayment)
  }

  return currentTotalPayment
}
