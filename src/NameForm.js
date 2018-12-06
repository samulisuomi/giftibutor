import React, { PureComponent } from 'react';

class NameForm extends PureComponent {
  render() {
    return (
      <div className="NameForm">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" name="user_name" />
        </div>
      </div>
    );
  }
}

export default NameForm;
