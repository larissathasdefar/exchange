import React from 'react'
import _ from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import Loading from 'ui/Loading'
import { Container } from './Rates.styles'

const exchangeMoney = (to, from, rates) => rates['EUR'] / rates[to] * rates[from]

const Rates = ({ followedRates, rates, currencies }) => {
  return (
    <Container elevation={1}>
      <Typography variant="h4" align="center" paragraph>
        Rates
      </Typography>
      {
        Object.keys(rates).length === 0
          ? <Loading />
          : (
            <Table>
              <TableBody>
                {
                  followedRates.map(({ from, to }) => (
                    <TableRow key={`${from}-${to}`}>
                      <TableCell>
                        <Typography variant="h5">
                          {`1 ${from}`}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h5">
                          { exchangeMoney(from, to, rates).toFixed(2) }
                        </Typography>
                        <Typography variant="caption">
                          { currencies[to] }
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          )
      }
    </Container>
  )
}

Rates.propTypes = {
  followedRates: _.arrayOf(_.shape({
    form: _.string,
    to: _.string,
  })),
  rates: _.shape({}).isRequired,
  currencies: _.shape({}).isRequired,
}

export default Rates
