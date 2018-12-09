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
        giftee: null,
        exclusion: null
      },
      {
        name: "Dos",
        giftee: null,
        exclusion: null
      },
      {
        name: "Tres",
        giftee: null,
        exclusion: null
      },
      {
        name: "Cuatro",
        giftee: null,
        exclusion: null
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

  handleExclusionChange = (name, exclusion) => {
    const { people } = this.state;

    const newPeople = people.map(person => {
      // Symmetric exclusions:
      if (person.name === name) {
        return {
          ...person,
          exclusion
        };
      } else if (person.name === exclusion) {
        return {
          ...person,
          exclusion: name
        };
      } else {
        return person;
      }
    });

    this.setState({
      ...this.state,
      people: newPeople
    });
  }

  getExclusionOptions = () => {
    const { people } = this.state;

    return people.map(person => person.name);
  }

  exclusionPairsAllowed = () => {
    const { people } = this.state;

    // TODO:
    return Math.round(people.length / 2);
  }

  render() {
    const { name, people } = this.state;

    return (
      <div className="NameForm">
        <PersonTable
          people={ people }
          exclusionOptions={ this.getExclusionOptions() }
          onExclusionChange={ this.handleExclusionChange }
        />
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
        <p>You're allowed max { this.exclusionPairsAllowed() } exclusion pairs</p>
      </div>
    );
  }
}

export default NameForm;
