import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import NativeSelect from '@material-ui/core/NativeSelect';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    backgroundColor: '#f5f3da'
  },
  excludeSelect: {
    fontSize: '0.8125rem'
  }
});

class PersonTable extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    people: PropTypes.array.isRequired,
    exclusionOptions: PropTypes.array.isRequired,
    onExclusionChange: PropTypes.func.isRequired
  }

  handleExclusionChange = person => event => {
    const { onExclusionChange } = this.props;

    onExclusionChange(person.name, event.target.value);
  }

  render() {
    const { classes, exclusionOptions, people } = this.props;

    return people.length ? (
      <Paper className={ classes.root }>
        <Table>
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
                  <TableCell>{ person.name }</TableCell>
                  <TableCell>
                    <NativeSelect
                      value={ person.exclude }
                      onChange={ this.handleExclusionChange(person.name) }
                      name="exclusion"
                      className={ classes.excludeSelect }
                    >
                      <option value="">Select...</option>
                      { exclusionOptions
                          .filter(name => name !== name)
                          .map(name => (
                            <option value={ name }>{ name }</option>
                          )) }
                    </NativeSelect>
                  </TableCell>
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
