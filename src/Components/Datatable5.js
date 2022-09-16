import React from "react";
import './Datatable.css';

class Datatable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false
		};
    }
	componentDidMount() {
		fetch("https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body")
			.then((res) => res.json())
			.then((reports) => {
				this.setState({
					items: reports,
					DataisLoaded: true
				});
			})
	}

	render() {
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded) return (
            <div>
                <h3>Loading...</h3> 
            </div>
        )

		return (
            <section id="main-table">
                <div className="container">
                    <div className="row">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Trash</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Reported from</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>        
                                {
                                    items.map((item) => (
                                        <tr>
                                            <td>
                                                <img src={ item.photo_url } alt="Thumbnail Not Provided" class="custom-photo"/>
                                            </td>
                                            <td>
                                                { item.trash_name.charAt(0).toUpperCase() + item.trash_name.slice(1) }
                                            </td>
                                            <td>
                                                { item.location.slice(9) }
                                            </td>
                                            <td>
                                                { item.report_from.slice(2,5) + "-" + item.report_from.slice(5,8) + "-" + item.report_from.slice(8) }
                                            </td>
                                            <td>
                                                { item.report_date.slice(0, 10) }
                                            </td>
                                            <td>New</td>
                                            <td><button>Edit</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section> 
        );
    }
}

export default Datatable;
