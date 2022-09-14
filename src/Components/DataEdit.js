import React, { useRef, useState } from "react";

function App() {
  const baseURL = "https://9gdq2gvn61.execute-api.us-east-2.amazonaws.com/staging/twilio/body";

  fetch(baseURL)
      .then((res) => res.json())
      .then((reports) => {
        this.setState({
          items: reports,
        });
      })

    const put_body = useRef(null);
    const put_trash_name = useRef(null);
    const put_location = useRef(null);

  const [putResult, setPutResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }
  
  async function putData() {
    const put_body = put_body.current.value;

    if (put_body) {
      const putData = {
        trash_name: put_trash_name.current.value,
        location: put_location.current.value,
      };

      try {
        const res = await fetch(`${baseURL}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(putData),
        });

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: data,
        };

        setPutResult(fortmatResponse(result));
      } catch (err) {
        setPutResult(err.message);
      }
    }
  }
  
  return (
    <div className="card">
      <div className="card-body">
        <div className="form-group">
          <input type="text" className="form-control" ref={put_body} placeholder="key" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" ref={put_trash_name} placeholder="trash" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" ref={put_location} placeholder="location" />
        </div>
        <div className="form-check mb-2">
          <button className="btn btn-sm btn-primary" onClick={putData}>Update Data</button>
          { putResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{putResult}</pre></div> }
        </div>
      </div>
    </div>
  );
}

export default App;