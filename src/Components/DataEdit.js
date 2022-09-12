import React from "react";

class DataEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false
    };

      this.handleChange = this.handleChange.bind(this);
}

  handleChange(event) {
      const name = event.target.name;
      this.setState({[name]: event.target.value});
  }

componentDidMount() {
  fetch("https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body")
    .then((res) => res.json())
    .then((reports) => {
      this.setState({
        items: reports,
        trash_name: reports.trash_name,
        DataisLoaded: true
      });
    })
}

render() {
  const { DataisLoaded, items } = this.state;
  if (!DataisLoaded) return 
      <div>
    <h1> Pleses wait some time.... </h1> 
      </div>

  return (
    <section>
      <br/><br/><br/>
      <h2>Reports Edit</h2>
      {
        items.map((item) => (
            <form onSubmit={this.handleSubmit}>
                <label><b>Report:&nbsp;</b>
                    <input name="photo_url" type="text" value={item.photo_url} onChange={this.handleChange} />
                </label>
                <lable>
                    <input name="trash_name" type="text" value={this.state.trash_name} onChange={this.handleChange} />
                </lable>
                <label> 
                    <input name="location" type="text" value={item.location.slice(9)} onChange={this.handleChange} />
                </label>
                <label>
                    <input name="report_from" type="text" value={item.report_from.slice(2,5) + "-" + item.report_from.slice(5,8) + "-" + item.report_from.slice(8)} onChange={this.handleChange} />
                </label>
                <label>
                    <input name="report_date" type="text" value={item.report_date.slice(0, 10)} onChange={this.handleChange} />
                </label>
                
                <input type="submit" value="Submit" />
            </form>
        ))
        }
        <br/><br/><br/>
    </section> 
  );
}}

export default DataEdit;
