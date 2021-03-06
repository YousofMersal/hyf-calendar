import React, { Component } from 'react'
import { getMentorsFromDb } from '../apiCalls.jsx'
import MentorsList from '../components/MentorsList'

export default class App extends Component {
  //adding mentors in state for displaying it later
  constructor(props) {
    super(props)
    this.state = {
      mentors: []
    }
    this.updateState = this.updateState.bind(this)
  }

  //function to be passed to and called in child components to update state when relevant.
  //It calls the api and it then fetches all the entries in the db.
  updateState() {
    try {
      getMentorsFromDb().then(res => this.setState({ mentors: res }))
    } catch (err) {
      throw new Error('something went wrong while getting the data. \n' + err)
    }
  }

  //fetch request to express backend
  componentDidMount() {
    try {
      getMentorsFromDb().then(res => this.setState({ mentors: res }))
    } catch (err) {
      throw new Error('something went wrong while getting the data. \n' + err)
    }
  }

  render() {
    return (
      <div>
        <MentorsList
          data={this.state.mentors}
          update={this.updateState}
          mentors={this.state.mentors}
        />
      </div>
    )
  }
}
