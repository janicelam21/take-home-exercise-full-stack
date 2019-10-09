import React from 'react';
import './EditForm.css';

class EditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDropDown: false,
      selectedComponent: '',
      labelSelComp: '',
      placeholder: '',
      modMessage: ''
    }
    this.showDropDown = this.showDropDown.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  showDropDown() {
    this.setState({showDropDown: !this.state.showDropDown});
  }

  onSelect(e, selectedComp, labelSelComp) {
    e.preventDefault();
    this.setState({selectedComponent: selectedComp});
    this.setState({labelSelComp: labelSelComp});
    this.setState({placeholder: `Enter Modified ${labelSelComp}`});
    this.setState({showDropDown: !this.state.showDropDown});
  } 

  onChange(e) {
    e.preventDefault();
    this.setState({modMessage: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.editEntry(this.state.selectedComponent, this.state.modMessage);
  }

  render() {
    return (
      <div className = "wrapper">
        <div>Select Element to Edit from Dropdown Below</div> 
        {this.state.selectedComponent.length === 0
        ? <button className = "dropdwnbtn" onClick = {this.showDropDown}>Select</button>
        : <button className = "dropdwnbtn" onClick = {this.showDropDown}>{this.state.labelSelComp}</button>}
        {this.state.showDropDown 
        ?<div className="dropdwncontent">
          <div className = "dropdwnelem" onClick= {(e) => {this.onSelect(e, 'firstName','First Name')}}>First Name</div>
          <div className = "dropdwnelem" onClick= {(e) => {this.onSelect(e, 'lastName', 'Last Name')}}>Last Name</div>
          <div className = "dropdwnelem" onClick= {(e) => {this.onSelect(e, 'title', 'Title')}}>Title</div>
          <div className = "dropdwnelem" onClick= {(e) => {this.onSelect(e, 'story', 'Story')}}>Story</div>
          <div className = "dropdwnelem" onClick= {(e) => {this.onSelect(e, 'favoriteColor', 'Favorite Color')}}>Favorite Color</div>
          <div className = "dropdwnelem" onClick= {(e) => {this.onSelect(e, 'photoUrl', 'Photo URL')}}>Photo URL</div>
        </div>
        : !this.state.selectedComponent ? 
        null
        : this.state.selectedComponent === 'story' 
        ? <div>
          <textarea placeholder = {this.state.placeholder} onChange={this.onChange}></textarea>
          <button className = "submitbtn" onClick = {this.onSubmit}>Submit</button>
        </div>
        : <div>
          <input type="text" name="LastName" placeholder = {this.state.placeholder} onChange = {this.onChange}/>
          <button className = "submitbtn" onClick = {this.onSubmit}>Submit</button>
        </div>
        }
      </div>
    )
  }
}

export default EditForm;