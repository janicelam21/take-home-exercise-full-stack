import React from 'react';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      title: '',
      story: '',
      favColor: '',
      photoURL: ''
    }
    this.stateChange = this.stateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  stateChange(e,stateItem) {
    this.setState({[stateItem]: e.target.value});
  }

  onSubmit(e) {
    // firstName, lastName, title, and story are required so alert user if any of those fields are empty
    e.preventDefault();
    if (this.state.firstName && this.state.lastName && this.state.title && this.state.story) {
      var obj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        title: this.state.title,
        story: this.state.story,
        favColor: this.state.favColor,
        photoURL: this.state.photoURL
      };
      this.props.insertData(obj);
      this.props.displayForm();
    } else {
      var message = ''
      if (!this.state.firstName) {
        message = message + `Please enter First Name \n`;
      }
      if (!this.state.lastName) {
        message = message + `Please enter Last Name \n`;
      }
      if (!this.state.title) {
        message = message + `Please enter Title \n`;
      }
      if (!this.state.story) {
        message = message + `Please enter Story`;
      }
      alert(message)
    }
  }

  render() {
    return (
      <form className="form">
        <div className="eachform">
          <label className="label">First Name:</label>
          <input type="text" name="FirstName" onChange = {(e) => this.stateChange(e, 'firstName')}/>
        </div>
        <div className="eachform">
          <label className="label">Last Name:</label>
          <input type="text" name="LastName" onChange = {(e) => this.stateChange(e, 'lastName')}/>
        </div>
        <div className="eachform">
          <label className="label">Title:</label>
          <input type="text" name="Title" onChange = {(e) => this.stateChange(e, 'title')}/>
        </div>
        <div className="eachform">
          <label className="label">Story:</label>
          <textarea type="text" name="Story" onChange = {(e) => this.stateChange(e, 'story')}></textarea>
        </div>
        <div className="eachform">
          <label className="label">Favorite Color:</label>
          <input type="text" name="FavoriteColor" onChange = {(e) => this.stateChange(e, 'favColor')}/>
        </div>
        <div className="eachform">
          <label className="label">Photo URL:</label>
          <input type="text" name="PhotoURL" onChange = {(e) => this.stateChange(e, 'photoURL')}/>
        </div>
        <button className="submitbtn" type="submit" value="Submit" onClick = {this.onSubmit}>Submit</button>
      </form>
    )
  }
}

export default Form;