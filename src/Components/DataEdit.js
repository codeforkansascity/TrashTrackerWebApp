import React, { useState, useEffect } from "react";

function DataEdit() {

  const trashName = useFormInput("");
  const location = useFormInput("");

  // const [trash, setTrash] = useState("");
  // const [location, setLocation] = useState("");

  // const handleTrashChange = (e) => {
  //   setTrash(e.target.value); // update "value" with event target value
  // };

  // const handleLocationChange = (e) => {
  //   setLocation(e.target.value); // update "value" with event target value
  // };

  const [formData, setFormData] = useState([]);

  const handleTrashChange = (e) => { 
    for (let i=0; i<formData.length; i++) {
      if (e.target.name === formData[i].body) {
        if (e.target.defaultValue === formData[i].trash_name) { // this place still needs to be fixed a little bit because default value can change based on state
          console.log("changing trash name");
          formData[i].trash_name = e.target.value
          console.log(formData);
          return
        } else {
          console.log("changing trash location");
          return formData[i].location = e.target.value
        }
      }
    }
  }

  useEffect(() => {
    fetch("https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body")
    .then((res) => res.json())
    .then((reports) => setFormData(reports))
    .catch(err => console.error(err));
  },[]) // [] indicates that useEffect doesn't depend on state or props so it won't rerender if state changes and will only fire once when component is rendered

useEffect(()=>{
  console.log(trashName);
},[trashName])
 
  return (
    <div><p>hello</p>
    {formData.map((element) => (
      <div className="card">
        <div className="card-body">
          <textarea name={element.body} type="text" className="form-control" defaultValue={element.trash_name} onChange={handleTrashChange}></textarea>
          <textarea name={element.body} type="text" className="form-control" defaultValue={element.location} onChange={handleTrashChange}></textarea>
          {/* <div className="form-group">
            <textarea name={element.body} type="text" className="form-control" defaultValue={element.trash_name} {...trashName}></textarea>
          </div>
          <div className="form-group">
            <textarea name={element.body} type="text" className="form-control" defaultValue={element.location} {...location}></textarea>
          </div> */}
          <div className="form-check mb-2">
            <button className="btn btn-sm btn-primary" onClick={setFormData}>Update Data</button>
          </div>
        </div>
      </div>
    ))}
    </div>
  )
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };

  let inputName;
  const handleChange = (e) => {
    inputName = e.target.name;
    setValue({
      [e.target.name]: {
        value: e.target.value
      }
    })
  }

  console.log(value);

  return {
    setValue,
    value,
    onChange: handleChange,
  };
};

export default DataEdit;
