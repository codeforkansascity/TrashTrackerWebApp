// import React from "react";

// class DataEdit extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       items: [],
//       DataisLoaded: false
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.submit = this.submit.bind(this);
//   }

//   componentDidMount() {
//     fetch("https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body")
//       .then((res) => res.json())
//       .then((reports) => {
//         this.setState({
//           items: reports,
//           report: '',
//           DataisLoaded: true
//         });
//       })
//   }

//   handleChange(event) {
//       const name = event.target.name;
//       this.setState({[name]: event.target.value});
//   }

//   setReports(e) {
//     console.log("testing")
//   }

//   submit(event) {
//   fetch("https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body", {
//     method: 'POST',
//       body: JSON.stringify({ report }),
//       headers: { 'Content-Type': 'application/json' },
//   })
//     .then((res) => res.json())
//     .then(json => setReports(json.report)
//     )
//   };

// render() {
//   const { DataisLoaded, items } = this.state;
//   if (!DataisLoaded) return 
//       <div>
//     <h1> Pleses wait some time.... </h1> 
//       </div>

//   return (
//     <section>
//       <br/><br/><br/>
//       <h2>Reports Edit</h2>
//       {
//         items.map((item) => (
//             <form onSubmit={this.handleSubmit}>
//                 <label><b>Report:&nbsp;</b>
//                     <input name="photo_url" type="text" value={item.photo_url} onChange={e => setReports({...report, photo_url: e.target.value})} />
//                 </label>
//                 <lable>
//                     <input name="trash_name" type="text" value={this.state.trash_name} onChange={e => setReports({...report, trash_name: e.target.value})} />
//                 </lable>
//                 <label> 
//                     <input name="location" type="text" value={item.location.slice(9)} onChange={e => setReports({...report, location: e.target.value})} />
//                 </label>
//                 <label>
//                     <input name="report_from" type="text" value={item.report_from.slice(2,5) + "-" + item.report_from.slice(5,8) + "-" + item.report_from.slice(8)} onChange={e => setReports({...report, report_from: e.target.value})} />
//                 </label>
//                 <label>
//                     <input name="report_date" type="text" value={item.report_date.slice(0, 10)} onChange={e => setReports({...report, report_date: e.target.value})} />
//                 </label>
                
//                 <input type="submit" value="Submit" />
//             </form>
//           ))
//         }
//         <br/><br/><br/>
//     </section> 
//   );
// }}

// export default DataEdit;
