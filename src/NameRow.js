import React, { PureComponent } from 'react';

class NameRow extends PureComponent {
  render() {
    const { person } = this.props;

    return (
      <div className="NameRow">
        { person.name }
      </div>
    );
  }
}

export default NameRow;
