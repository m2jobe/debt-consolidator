import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Slider from '@mui/material/Slider'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectors } from '../features/calculator'
import { SystemState } from '../features/calculator/types'

const DEFAULT_LOAN_APR = 8
const DEFAULT_LOAN_TERM_IN_MONTHS = 24
const loanAPRMarks = [
  {
    value: 4,
    label: '4%',
  },
  {
    value: 36,
    label: '36%',
  },
]

const loanTermMarks = [
  {
    value: 12,
    label: '12 mo.',
  },
  {
    value: 60,
    label: '60 mo.',
  },
]

function valuetext(value: number) {
  return `${value}`
}

export const Savings: React.FC = () => {
  const navigate = useNavigate()
  const [loanAPR, setLoanAPR] = useState(DEFAULT_LOAN_APR)
  const [loanTerm, setLoanTerm] = useState(DEFAULT_LOAN_TERM_IN_MONTHS)
  //Todo: Use FinanceJS to format these values into currencies
  const currentMonthlyPayment = useSelector((state: SystemState) =>
    selectors.getCurrentMonthlyPayment(state)
  )
  const newMonthlyRepayMent = useSelector((state: SystemState) =>
    selectors.getNewMonthlyRepayment(state, loanAPR, loanTerm)
  )
  const totalMonthlySavings = currentMonthlyPayment - newMonthlyRepayMent
  const newTotalRepayment = newMonthlyRepayMent * loanTerm
  const currentTotalRepayment = useSelector((state: SystemState) =>
    selectors.getCurrentTotalPayment(state)
  )
  const totalRepaymentSavings = currentTotalRepayment - newTotalRepayment

  const goBack = () => {
    navigate('/')
  }

  const handleAPRChange = (event: Event, newValue: number | number[]) => {
    setLoanAPR(newValue as number)
  }

  const handleTermChange = (event: Event, newValue: number | number[]) => {
    setLoanTerm(newValue as number)
  }

  return (
    <div>
      <Button onClick={goBack} startIcon={<ArrowBackIcon />}>
        Update Your Current Debts
      </Button>

      {/* Todo: Refactor this into its own component with unit test, it is becoming hard to read. */}
      <Card variant="outlined">
        <CardContent>
          <h4>CONFIGURE YOUR CONSOLIDATED LOAN</h4>
          <small>
            Use the sliders below to simulate the new APR and loan term.
          </small>

          {/* Desired AR */}
          <Grid sx={{ mt: 2, pr: 3 }} alignItems="center" container spacing={2}>
            <Grid item xs={3}>
              <small>DESIRED APR</small>
              <Typography sx={{ color: 'primary.main' }} variant="h5">
                {loanAPR}%
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Slider
                aria-label="APR marks"
                value={loanAPR}
                getAriaValueText={valuetext}
                step={1}
                min={4}
                max={36}
                valueLabelDisplay="auto"
                marks={loanAPRMarks}
                onChange={handleAPRChange}
              />
            </Grid>
          </Grid>

          {/* Desired Loan Term */}
          <Grid sx={{ mt: 2, pr: 3 }} alignItems="center" container spacing={2}>
            <Grid item xs={3}>
              <small>DESIRED LOAN TERM</small>
              <Typography sx={{ color: 'primary.main' }} variant="h5">
                {loanTerm} Months{' '}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Slider
                aria-label="Loan term marks"
                value={loanTerm}
                getAriaValueText={valuetext}
                step={1}
                min={12}
                max={60}
                valueLabelDisplay="auto"
                marks={loanTermMarks}
                onChange={handleTermChange}
              />
            </Grid>
          </Grid>

          <Divider />

          <Grid sx={{ mt: 2 }} container spacing={2}>
            <Grid style={{ borderRight: '0.1em solid grey' }} item xs={6}>
              <div>
                <h6>New Total Repayment</h6>
                <div>${Math.ceil(newTotalRepayment)}</div>
              </div>
              <div>
                <h6>Current Total Repayment</h6>
                <div>${Math.ceil(currentTotalRepayment)}</div>
              </div>

              <div>
                <h6> Total Repayment Savings</h6>
                <div>${Math.floor(totalRepaymentSavings)}</div>
              </div>

              <br />
              <br />
            </Grid>

            <Grid item xs={6}>
              <div>
                <h6>New Monthly Repayment</h6>
                <div>${newMonthlyRepayMent}</div>
              </div>
              <div>
                <h6>Current Monthly Repayment</h6>
                <div>${currentMonthlyPayment}</div>
              </div>

              <div>
                <h6> Total Monthly Savings</h6>
                <div>${totalMonthlySavings.toFixed(2)}</div>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}
