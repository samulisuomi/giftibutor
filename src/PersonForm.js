import React, { PureComponent } from 'react';
import './PersonForm.css'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import PersonTable from './PersonTable'

import shuffle from 'lodash/shuffle';

const MIN_PEOPLE = 3;

class PersonForm extends PureComponent {
  state = {
    name: '',
    people: [],
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

  handleGenerateGiftees = () => {
    const { people } = this.state;

    const shuffledPeople = shuffle(people);
    const giftees = [ ...shuffledPeople.slice(1), shuffledPeople[0] ];

    const gifteesByName = shuffledPeople.reduce((peopleByName, person, index) => {
      return {
        ...peopleByName,
        [person.name]: giftees[index].name
      }
    }, {})

    const newPeople = people.map(person => {
      return {
        ...person,
        giftee: gifteesByName[person.name]
      };
    });

    this.setState({
      people: newPeople
    });
  }

  handleExclusionChange = (name, excludedName) => {
    const { exclusions } = this.state;

    const filteredExclusions = exclusions.filter(pair => !pair.has(name) && !pair.has(excludedName))

    const newExclusions = excludedName ? [
      ...filteredExclusions,
      new Set([ name, excludedName ])
    ] : filteredExclusions;

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
    window.pf = this;

    const { name, people, exclusions } = this.state;

    const exclusionsByName = this.getExclusionsByName()
    const peopleWithExclusions = people.map(person => ({
      ...person,
      exclusion: exclusionsByName[person.name] || null
    }));
    const addingMoreExclusionsDisabled = Math.floor(people.length / 2) <= exclusions.length;
    const isGenerateGifteesDisabled = people.length < MIN_PEOPLE;

    return (
      <div className="PersonForm">
        <div className="generate-giftees-container">
          <p>
            { people.length ? (
              <Button
                children="Generate giftees"
                variant="contained"
                color="primary"
                disabled={ isGenerateGifteesDisabled }
                type="submit"
                onClick={ this.handleGenerateGiftees }
              />
            ) : null }
          </p>
        </div>
        <PersonTable
          people={ peopleWithExclusions }
          exclusionOptions={ this.getExclusionOptions() }
          onPersonDelete={ this.handlePersonDelete }
          onExclusionChange={ this.handleExclusionChange }
          addingMoreExclusionsDisabled={ isGenerateGifteesDisabled || addingMoreExclusionsDisabled }
        />
        { isGenerateGifteesDisabled ? (
          <p>
            Add at least { MIN_PEOPLE } people to be able to generate giftees.
          </p>
        ) : null }
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
            className="add-person"
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

export default PersonForm;
