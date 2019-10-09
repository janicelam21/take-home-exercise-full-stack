import React from 'react';
import PropTypes from 'prop-types';
import './TeamMember.css';
import MatterEmptyAvatar from '../../assets/matter_empty_avatar.svg';
import Form from '../Form/Form.js';
import EditForm from '../EditForm/EditForm.js';

class TeamMember extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      displayForm: false,
      displayEditForm: false
    }
    this.displayForm = this.displayForm.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.editEntry = this.editEntry.bind(this);
  }
  
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
    story: PropTypes.string,
    favoriteColor: PropTypes.string
  };

  static defaultProps = {
    photoUrl: MatterEmptyAvatar,
    story: null,
    favoriteColor: '#3466F2'
  };

  displayForm() {
    this.setState({displayForm: !this.state.displayForm});
  }

  deleteEntry() {
    this.props.deleteData(this.props.id);
  }

  editEntry(field, modMessage) {
    this.setState({displayEditForm: !this.state.displayEditForm});
    this.props.editData(this.props.id, field, modMessage)
  }

  render() {
    return (
      <div className="container">
        <header>
          {this.props.title !== "New Teammate"
          ? <div>
            <button className = "editbutton" onClick = {this.editEntry}>Edit</button>
            <button className = "deletebutton" onClick = {this.deleteEntry}>Delete</button>
          </div>
          : null}
          <div className="avatar-container">
            <img
              className="avatar"
              src={this.props.photoUrl}
              alt={this.props.name}
            />
          </div>
          {this.state.displayEditForm 
          ? <EditForm editEntry = {this.editEntry}/>
          : null}
          <h2 className="title">{this.props.title}</h2>
          <h1 className="name">{this.props.name}</h1>
          
          {this.props.title === "New Teammate"
          ? <button className = "addteambutton" onClick = {this.displayForm}>Join the Team!</button>
          : null}
          {this.state.displayForm 
          ? <Form insertData = {this.props.insertData} displayForm = {this.displayForm}/>
          : null}
        </header>
        <div className="body">{this.props.story}</div>
        <footer style={{ backgroundColor: this.props.favoriteColor }}>
          <div className="full-width-flex-box">
            <div className="one-third-flex-box stat">9.0</div>
            <div className="one-third-flex-box stat bordered">9.0</div>
            <div className="one-third-flex-box stat">9.0</div>
          </div>
          <div className="full-width-flex-box">
            <div className="one-third-flex-box">CANDID</div>
            <div className="one-third-flex-box">LEARNING</div>
            <div className="one-third-flex-box">GRIT</div>
          </div>
        </footer>
      </div>
    );
  }
}

export default TeamMember;
