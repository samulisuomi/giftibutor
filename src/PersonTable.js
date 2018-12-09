import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700,
  }
});

class PersonTable extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    people: PropTypes.array.isRequired
  }

  render() {
    const { classes, people } = this.props;

    return people.length ? (
      <Paper className={ classes.root }>
        <Table className={ classes.table }>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Don't match with</TableCell>
              <TableCell>Giftee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map(person => {
              return (
                <TableRow key={ person.name }>
                  { /* <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell> */ }
                  <TableCell>{ person.name }</TableCell>
                  <TableCell>TODO</TableCell>
                  <TableCell>{ person.giftee }</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    ) : null;
  }
}

export default withStyles(styles)(PersonTable);
