// This file can successfully input data to DynamoDB if we put the real rest api endpoint in. 
import React, { Component } from 'react';
import axios from 'axios';

export default class Datatable3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      report_date: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { body, report_date } = this.state;
    await axios.post(
      'REST_API_ENDPOINT', // to-do: change to the real endpoint here
      { body: `${body}`, report_date: `${report_date}` }
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Body:</label>
          <input
            type="text"
            name="body"
            onChange={this.handleChange}
            value={this.state.body}
          />

          <label>Report Date:</label>
          <input
            type="text"
            name="report_date"
            onChange={this.handleChange}
            value={this.state.report_date}
          />

          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}