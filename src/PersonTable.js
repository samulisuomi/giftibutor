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

import IconButton from '@material-ui/core/IconButton';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    backgroundColor: '#f5f3da'
  },
  exclusionSelect: {
    fontSize: '0.8125rem'
  },
  noExclusionSelect: {
    fontSize: '0.8125rem',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  noSelection: {
    root: {
      color: 'red'
    }
  },
  removeCell: {
    width: '1px',
    textAlign: 'center'
  },
  removeIcon: {
    color: '#dc5757'
  }
});

class PersonTable extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    people: PropTypes.array.isRequired,
    exclusionOptions: PropTypes.array.isRequired,
    onPersonDelete: PropTypes.func.isRequired,
    onExclusionChange: PropTypes.func.isRequired
  }

  handleExclusionChange = name => event => {
    this.props.onExclusionChange(name, event.target.value);
  }

  handlePersonDelete = name => event => {
    this.props.onPersonDelete(name);
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
              <TableCell className={ classes.removeCell }>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map(person => {
              const value = person.exclusion || '';

              return (
                <TableRow key={ person.name }>
                  <TableCell>{ person.name }</TableCell>
                  <TableCell>
                    <NativeSelect
                      value={ value }
                      onChange={ this.handleExclusionChange(person.name) }
                      name="exclusion"
                      className={ value ? classes.exclusionSelect : classes.noExclusionSelect }
                    >
                      <option className={ classes.nullOption} value="">Select...</option>
                      { exclusionOptions
                          .filter(name => name !== person.name)
                          .map(name => (
                            <option
                              key={ name }
                              value={ name }
                              children={ name }
                            />
                          )) }
                    </NativeSelect>
                  </TableCell>
                  <TableCell>{ person.giftee }</TableCell>
                  <TableCell className={ classes.removeCell }>
                    <IconButton onClick={ this.handlePersonDelete(person.name) }>
                      <ClearRoundedIcon className={ classes.removeIcon }/>
                    </IconButton>
                  </TableCell>
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
