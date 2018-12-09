import React, { PureComponent } from 'react';

class PersonTable extends PureComponent {
  render() {
    const { people } = this.props;

    return (
      <ul>
        { people.map(person => (
          <li>
            <p>{ person.name }</p>
            <ul><li>{ person.giftee }</li></ul>
          </li>
        )) }
      </ul>
    )
  }
}

export default PersonTable;
