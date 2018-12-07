import React, { PureComponent } from 'react';

class NameRow extends PureComponent {
  render() {
    const { person } = this.props;

    return (
      <div className="NameRow">
        <p>{ person.name }</p>
      </div>
    );
  }
}

export default NameRow;
