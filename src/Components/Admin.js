import React from 'react';
import Nav from "./Nav";
import Footer from './Footer';

const Admin = () => {
    return (
        <div>
            <Nav />
            <div className='container custom-container'>
            <br/>
                <div className='custom-flex-container'>
                    <h6>Users and Roles</h6>
                    <button className='flex-end'>Add Users</button>
                </div>
                <br/><br/>
                <div class="row">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Role</th>
                              <th scope="col">Reset Password</th>
                              <th scope="col">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Sofia Ruz</td>
                              <td>sruz@gmail.com</td>
                              <td>Admin</td>
                              <td>Reset</td>
                              <td>Delete</td>
                            </tr>
                            <tr>
                              <td>Kelly Allen</td>
                              <td>kallen@lna.org</td>
                              <td>User</td>
                              <td>Reset</td>
                              <td>Delete</td>
                            </tr>
                          </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Admin;