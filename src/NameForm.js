import React, { PureComponent } from 'react';
import './NameForm.css'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import NameRow from './NameRow'

class NameForm extends PureComponent {
  state = {
    name: '',
    people: []
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const { people, name } = this.state;

    this.setState({
      name: '',
      people: [ ...people, {
        name: name.trim(),
        giftee: null
      }]
    });
  }

  renderPeople = () => {
    const { people } = this.state;

    return people.map(person => (
      <NameRow
        person={ person }
      />
    ));
  }

  isAddDisabled = () => {
    const { name, people } = this.state;

    const trimmedName = name.trim()

    return !name.length || people.some(person => person.name === trimmedName)
  }

  render() {
    const { name } = this.state;

    return (
      <div className="NameForm">
        { this.renderPeople() }
        <form
          noValidate
          onSubmit={ this.handleSubmit }
        >
          <TextField
            label="Name"
            value={ name }
            onChange={ this.handleNameChange }
            margin="normal"
          />
          <Button
            children="Add"
            variant="contained"
            color="primary"
            disabled={ this.isAddDisabled() }
            type="submit"
          />
        </form>
      </div>
    );
  }
}

export default NameForm;
