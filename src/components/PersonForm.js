import React, { PureComponent } from 'react';
import './PersonForm.css';

import { encrypt } from '../utilities/utils';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import PersonTable from './PersonTable';

import shuffle from 'lodash/shuffle';
import sortBy from 'lodash/sortBy';
import without from 'lodash/without';

const MIN_PEOPLE = 3;

class PersonForm extends PureComponent {
  state = {
    name: '',
    people: [],
    // people: [ { name: '1', giftee: null }, { name: '2', giftee: null }, { name: '3', giftee: null }],
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

    const excludedNamesByName = this.getExcludedNamesByName()
    const shuffledPeople = shuffle(people);
    const shuffledPeopleSortedByHasExclusionsFirst = sortBy(shuffledPeople, person => !excludedNamesByName.hasOwnProperty(person.name))

    // Analogy: order people around a circular table so that everybody's giftee sits on their right side
    // and the giftee is not excluded from the person sitting on the left.

    const originalFirstPerson = shuffledPeopleSortedByHasExclusionsFirst[0];

    let gifteeNamesByName = shuffledPeople.reduce(accumulator => {
      const {
        currentPerson,
        queue,
        gifteeNamesByName
      } = accumulator;

      const excludedName = excludedNamesByName[currentPerson.name];

      // Works properly even if excludedName is undefined:
      const nextPersonIndex = queue.findIndex(person => person.name !== excludedName);
      // If -1 we have consumed the whole original queue, let's point to the first person:
      const nextPerson = nextPersonIndex !== -1 ? queue[nextPersonIndex] : originalFirstPerson;
      const nextPersonName = nextPerson.name;

      const newGifteeNamesByName = {
        ...gifteeNamesByName,
        [currentPerson.name]: nextPersonName
      };

      const newQueue = queue.length && nextPersonIndex !== -1 ? [
        // Drop nextPerson from the queue:
        ...queue.slice(0, nextPersonIndex), ...queue.slice(nextPersonIndex + 1, queue.length)
      ] : queue

      return {
        currentPerson: nextPerson,
        queue: newQueue,
        gifteeNamesByName: newGifteeNamesByName
      }
    }, {
      currentPerson: shuffledPeopleSortedByHasExclusionsFirst[0],
      queue: shuffledPeopleSortedByHasExclusionsFirst.slice(1),
      gifteeNamesByName: {}
    }).gifteeNamesByName

    // Horrible hack because our algorithm isn't perfect:
    const namesWithoutGiftee = without(people.map(p => p.name), ...Object.keys(gifteeNamesByName));
    const namesWithoutGifter = without(people.map(p => p.name), ...Object.values(gifteeNamesByName));

    if (namesWithoutGiftee.length === 1 && namesWithoutGifter.length === 1 && namesWithoutGiftee[0] !== namesWithoutGifter[0]) {
      const gifteelessExcludedName = excludedNamesByName[namesWithoutGiftee[0]];

      if (gifteelessExcludedName !== namesWithoutGifter[0]) {
        gifteeNamesByName[namesWithoutGiftee[0]] = namesWithoutGifter[0];
      }
    }

    const newPeople = people.map(person => {
      return {
        ...person,
        giftee: gifteeNamesByName[person.name]
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

  getExcludedNamesByName = () => {
    const { exclusions } = this.state;

    return exclusions.reduce((excludedNamesByName, exclusion) => {
      const names = Array.from(exclusion);

      return {
        ...excludedNamesByName,
        [names[0]]: names[1],
        [names[1]]: names[0]
      }
    }, {})
  }

  render() {
    const { name, people, exclusions } = this.state;

    const excludedNamesByName = this.getExcludedNamesByName()
    const enhrichedPeople = people.map(person => ({
      ...person,
      exclusion: excludedNamesByName[person.name] || null,
      giftee: person.giftee ? encrypt(person.giftee) : null
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
          people={ enhrichedPeople }
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
            autoFocus
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
