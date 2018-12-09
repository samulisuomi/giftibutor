import React, { PureComponent, Fragment } from 'react';
import './NameForm.css'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import PersonTable from './PersonTable'

import shuffle from 'lodash/shuffle';

const MIN_PEOPLE = 2;

class NameForm extends PureComponent {
  state = {
    name: '',
    // people: []
    people: [
      {
        name: "Uno",
        giftee: "asd"
      },
      {
        name: "Dos",
        giftee: null
      },
      {
        name: "Tres",
        giftee: null
      },
      {
        name: "Cuatro",
        giftee: null
      },
    ]
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const { people, name } = this.state;

    const clearedPeople = people.map(person => ({
      ...person,
      giftee: null
    })) 

    this.setState({
      name: '',
      people: [ ...clearedPeople, {
        name: this.formatName(name),
        giftee: null
      }]
    });
  }
  
  formatName = name => {
    return name.trim()
  }

  isAddDisabled = () => {
    const { name, people } = this.state;

    if (!name.length) return true

    const formattedName = this.formatName(name);

    return people.some(person => person.name === formattedName);
  }

  renderGenerateGiftees = () => {
    const { people } = this.state;

    const isGenerateGifteesDisabled = people.length < MIN_PEOPLE;

    return (
      <Fragment>
        { isGenerateGifteesDisabled ? (
          <p>
            Add at least { MIN_PEOPLE } people to be able to generate giftees.
          </p>
        ) : null }
        <p>
          <Button
            children="Generate giftees"
            variant="contained"
            color="primary"
            disabled={ isGenerateGifteesDisabled }
            type="submit"
            onClick={ this.generateGiftees }
          />
        </p>
      </Fragment>
    )
  }

  generateGiftees = () => {
    const { people } = this.state;

    const shuffledPeople = shuffle(people);
    const giftees = [ ...shuffledPeople.slice(1), shuffledPeople[0] ];

    const newPeople = people.map((person, index) => {
      const giftee = giftees[index];

      return {
        ...person,
        giftee: giftee.name
      };
    })

    this.setState({
      ...this.state,
      people: newPeople
    });
  }

  handleExcludeChange = (name, exclusion) => {
    console.log(`Set exclusion for ${name}: ${exclusion}`);
  }

  render() {
    const { name, people } = this.state;

    return (
      <div className="NameForm">
        <PersonTable people={ people } onExcludeChange={ this.handleExcludeChange }/>
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
        { this.renderGenerateGiftees() }
      </div>
    );
  }
}

export default NameForm;
