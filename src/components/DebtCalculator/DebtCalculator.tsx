import React, { useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { useSelector, useDispatch } from 'react-redux'
import { actionTypes, selectors } from '../../features/calculator'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

const DebtCalculator: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [unsecuredDebts, setUnsecuredDebts] = useState(
    useSelector(selectors.getUnsecuredDebts)
  )
  let unsecuredDebtsArray = unsecuredDebts ? Object.values(unsecuredDebts) : []

  const calculateSavings = useCallback(() => {
    const doAllFieldsHaveValues = unsecuredDebtsArray.every((debt) =>
      Object.values(debt).every((attr) => Boolean(attr))
    )

    if (!doAllFieldsHaveValues) {
      alert('Please ensure all fields are filled')
      return
      // save product
    }

    dispatch({
      type: actionTypes.UPDATE_UNSECURED_DEBTS,
      payload: unsecuredDebts,
    })

    navigate('/savings')
  }, [unsecuredDebts])

  const handleTextFieldChanges = (debtId: string, debtAttribute: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target
    let debts = { ...unsecuredDebts }

    // Update the changed item.
    debts[debtId] = {
      ...debts[debtId],
      [debtAttribute]: value,
    }

    setUnsecuredDebts(debts)
  }

  const addUnsecuredDebt = () => {
    let debts = { ...unsecuredDebts }
    const newDebtId = uuidv4()
    debts[newDebtId] = {
      id: newDebtId,
      debtName: '',
      remainingDebtAmount: '',
      currentAPR: '',
      currentMonthlyPayment: '',
    }
    setUnsecuredDebts(debts)
  }

  const deleteUnsecuredDebt = (debtId: string) => () => {
    let debts = { ...unsecuredDebts }
    delete debts[debtId]
    setUnsecuredDebts(debts)
  }

  return (
    <Box sx={{ mt: 4 }}>
      <h4> ENTER YOUR CURRENT DEBTS</h4>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <h6>DEBT NAME</h6>
        </Grid>
        <Grid item xs={3}>
          <h6>REMAINING DEBT AMOUNT</h6>
        </Grid>
        <Grid item xs={3}>
          <h6>CURRENT APR</h6>
        </Grid>
        <Grid item xs={3}>
          <h6>CURRENT MONTHLY PAYMENT</h6>
        </Grid>
      </Grid>
      {/*Todo: Refactor this into its own component */}
      {unsecuredDebtsArray?.map((unsecuredDebt, index) => (
        <Grid
          sx={{ mb: 1 }}
          alignItems="center"
          key={`unsecured-debt-id-${unsecuredDebt.id}`}
          container
          spacing={2}
        >
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              defaultValue={unsecuredDebt.debtName}
              onChange={handleTextFieldChanges(unsecuredDebt.id, 'debtName')}
              placeholder="e.g. Medical"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              required
              type="number"
              defaultValue={unsecuredDebt.remainingDebtAmount}
              onChange={handleTextFieldChanges(
                unsecuredDebt.id,
                'remainingDebtAmount'
              )}
              placeholder="5000"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              variant="outlined"
              type="number"
              defaultValue={unsecuredDebt.currentAPR}
              onChange={handleTextFieldChanges(unsecuredDebt.id, 'currentAPR')}
              placeholder="15.99"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              type="number"
              defaultValue={unsecuredDebt.currentMonthlyPayment}
              onChange={handleTextFieldChanges(
                unsecuredDebt.id,
                'currentMonthlyPayment'
              )}
              placeholder="200"
            />
          </Grid>
          {index > 0 ? (
            <Grid item xs={1}>
              <IconButton
                onClick={deleteUnsecuredDebt(unsecuredDebt.id)}
                aria-label="delete"
                size="small"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          ) : null}
        </Grid>
      ))}
      <Button onClick={addUnsecuredDebt} startIcon={<AddIcon />}>
        Add Another Debt
      </Button>

      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <Button
          data-testid="calculate-savings"
          name="calculate-savings"
          onClick={calculateSavings}
          variant="contained"
        >
          Calulate Savings
        </Button>
      </Grid>
    </Box>
  )
}

export default DebtCalculator
