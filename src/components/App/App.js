import React from 'react';
import axios from 'axios';
import TeamMember from '../TeamMember';
import './App.css';
import { throwStatement } from '@babel/types';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: [],
      loading: true
    };
    this.fetchInitialData = this.fetchInitialData.bind(this);
    this.insertData = this.insertData.bind(this);
  }

  async componentDidMount() {
    try {
      await this.fetchInitialData();
    } catch (error) {
      // try again after half a second if fails due to race condition
      console.log('retrying initial data request...');
      setTimeout(async () => {
        await this.fetchInitialData();
      }, 500);
    }
  }

  async fetchInitialData() {
    const response = await axios.get('/team');
    this.setState({
      team: response.data,
      loading: false
    });
  }

  async insertData(data) {
    await axios.post('/team', {
      firstName: data.firstName,
      lastName: data.lastName,
      title: data.title,
      story: data.story,
      favoriteColor: data.favColor,
      photoUrl: data.photoURL
    })
    await this.fetchInitialData();
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="app">
        <div className="team-grid" />
        {this.state.team.map(member => (
          <TeamMember
            key={member.id}
            id={member.id}
            name={`${member.firstName} ${member.lastName}`}
            title={member.title}
            photoUrl={member.photoUrl}
            story={member.story}
            favoriteColor={member.favoriteColor}
            editData = {this.editData}
            deleteData = {this.deleteData}
          />
        ))}
        {/* Make this new team member link to your form! */}
        <TeamMember id="new" name="Join us!" title="New Teammate" insertData = {this.insertData}/>
      </div>
    );
  }
}

export default App;
