import React, { useState, useEffect } from 'react';
import './Datatable.css';
import { API } from 'aws-amplify';
import { listNotes } from '../graphql/queries';
import { createNote as createNoteMutation, updateNote as updateNoteMutation, deleteNote as deleteNoteMutation } from '../graphql/mutations';

const initialFormState = { trash: '', location: '', reported_from: '', date: '', image: '', status: '' }

function Datatable() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes }); 
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.trash) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  // async function updateNote() {
  //   console.log('updating');
  //   if (!formData.trash) return;
  //   await API.graphql({ query: updateNoteMutation, variables: { input: { formData } }}); 
  //   setNotes([ ...notes, formData ]);
  // }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  return (
    <section id="main-table">
      <div className="container">
        <div className="row">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Trash</th>
                <th scope="col">Location</th>
                <th scope="col">Reported from</th>
                <th scope="col">Date</th>
                <th scope="col">Photo</th>
                <th scope="col">Status</th>
                <th scope="col">Edit/Del</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>13 gal bag</td>
                <td>Map</td>
                <td>816-888-1479</td>
                <td>6/21/2022</td>
                <td> <a href="#main-table">IMG 1</a></td>
                <td>Pending</td>
                <td> <a href="#main-table">Edit </a>/<a href="#main-table"> Del</a> </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Mattress</td>
                <td>Map</td>
                <td>816-445-0985</td>
                <td>6/21/2022</td>
                <td> <a href="#main-table">IMG 1</a></td>
                <td>Pending</td>
                <td> <a href="#main-table">Edit </a>/<a href="#main-table"> Del</a> </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Large trash bag</td>
                <td>Map</td>
                <td>816-202-4857</td>
                <td>6/21/2022</td>
                <td> <a href="#main-table">IMG 1</a></td>
                <td>Pending</td>
                <td> <a href="#main-table">Edit </a>/<a href="#main-table"> Del</a> </td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Couch</td>
                <td>Map</td>
                <td>816-347-2218</td>
                <td>6/21/2022</td>
                <td> <a href="#main-table">IMG 1</a></td>
                <td>Pending</td>
                <td> <a href="#main-table">Edit </a>/<a href="#main-table"> Del</a> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br/><br/><br/>

      <h3>Manually create records</h3><br/>
      {/* Important codes below; do not delete */}
      <input onChange={e => setFormData({ ...formData, 'trash': e.target.value})} placeholder="trash" value={formData.trash} />
      <input onChange={e => setFormData({ ...formData, 'location': e.target.value})} placeholder="location" value={formData.location} />
      <input onChange={e => setFormData({ ...formData, 'reported_from': e.target.value})} placeholder="reported from" value={formData.reported_from} />
      <input onChange={e => setFormData({ ...formData, 'date': e.target.value})} placeholder="date" value={formData.date} />
      <input onChange={e => setFormData({ ...formData, 'image': e.target.value})} placeholder="image url" value={formData.image} />
      <input onChange={e => setFormData({ ...formData, 'status': e.target.value})} placeholder="status" value={formData.status} />
      <button onClick={createNote}>Create</button><br/><br/>
      <div className="container" style={{marginBottom: 15}}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Trash</th>
              <th scope="col">Location</th>
              <th scope="col">Reported from</th>
              <th scope="col">Date</th>
              <th scope="col">Photo</th>
              <th scope="col">Status</th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody >
            {
              notes.map(note => (
                <tr key={note.id || note.trash}>
                  <th scope="row">#</th>
                  <td>{note.trash}</td>
                  <td>{note.location}</td>
                  <td>{note.reported_from}</td>
                  <td>{note.date}</td>
                  <td>{note.image && <img src={note.image} style={{width: 80}} />}</td>
                  <td>{note.status}</td>
                  <td><button onClick={() => deleteNote(note)}>Delete</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section> 
  );
}

export default Datatable;
