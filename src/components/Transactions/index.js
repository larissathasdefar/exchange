import React, { PureComponent, Fragment } from 'react'
import _ from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { Container, BlueText } from './Transactions.styles'
import { format, isToday, isThisYear } from 'date-fns'

const formatMoney = (amount, currency) => amount
  .toLocaleString(undefined, { style: 'currency', currency: currency })

const formatOldDay = date =>
  `${format(date, isThisYear(date) ? 'DD MMM' : 'DD MMM YYYY')} - ${format(date, 'HH:mm')}`

class Transactions extends PureComponent {
  render() {
    const { transactions } = this.props
    return (
      <Container elevation={1}>
        <Typography variant="h5" align="center" paragraph>
          Transactions
        </Typography>
        {
          transactions.length === 0
            ? <Typography align="center">You don't have transactions yet.</Typography>
            : (
              <Table>
                <TableBody>
                  {
                    transactions.map(({ from, to, date }) => (
                      <TableRow key={date.toString()}>
                        <TableCell>
                          <Typography variant="h5">
                            {`Exchanged to ${to.code}`}
                          </Typography>
                          <Typography variant="caption">
                            {
                              isToday(date)
                                ? format(date, 'HH:mm')
                                : formatOldDay(date)
                            }
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h5">
                            {`- ${formatMoney(from.amount, from.code)}`}
                          </Typography>
                          <BlueText variant="caption">
                            {`+ ${formatMoney(to.amount, to.code)}`}
                          </BlueText>
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
}

Transactions.propTypes = {
  transactions: _.arrayOf(_.shape({
    form: _.shape({
      code: _.string,
      amount: _.number,
    }),
    to: _.shape({
      code: _.string,
      amount: _.number,
    }),
    date: _.date,
  })),
}

export default Transactions
