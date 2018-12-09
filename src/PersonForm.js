import React, { PureComponent, Fragment } from 'react';
import './PersonForm.css'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import PersonTable from './PersonTable'

import shuffle from 'lodash/shuffle';

const MIN_PEOPLE = 2;

class PersonForm extends PureComponent {
  state = {
    name: '',
    // people: []
    people: [
      {
        name: "Uno",
        giftee: null
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
    ],
    exclusions: []
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
      people: newPeople
    });
  }

  handleExclusionChange = (name, excludedName) => {
    const { exclusions } = this.state;

    const newExclusions = excludedName ? [
      ...exclusions.filter(pair => !pair.has(name) && !pair.has(excludedName)),
      new Set([ name, excludedName ])
    ] : exclusions.filter(pair => !pair.has(name) && !pair.has(excludedName));

    this.setState({
      exclusions: newExclusions
    });
  }

  handlePersonDelete = name => {
    const { people, exclusions } = this.state;

    this.setState({
      people: people.filter(person => person.name !== name),
      exclusions: exclusions.filter(pair => !pair.has(name)),
    });
  }

  getExclusionOptions = () => {
    const { people } = this.state;

    return people.map(person => person.name);
  }

  getExclusionsByName = () => {
    const { exclusions } = this.state;

    return exclusions.reduce((exclusionsByName, exclusion) => {
      const names = Array.from(exclusion);

      return {
        ...exclusionsByName,
        [names[0]]: names[1],
        [names[1]]: names[0]
      }
    }, {})
  }

  render() {
    const { name, people } = this.state;

    const exclusionsByName = this.getExclusionsByName()
    const peopleWithExclusions = people.map(person => ({
      ...person,
      exclusion: exclusionsByName[person.name] || null
    }));

    return (
      <div className="PersonForm">
        <PersonTable
          people={ peopleWithExclusions }
          exclusionOptions={ this.getExclusionOptions() }
          onPersonDelete={ this.handlePersonDelete }
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
      </div>
    );
  }
}

export default PersonForm;
