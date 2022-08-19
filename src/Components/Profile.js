import React from 'react';
import Nav from "./Nav";
import Footer from './Footer';
import './Profile.css';

const Profile = () => {
    return (
        <div>
            <Nav />
            <div className='container custom-container'>
                <br/><br/>
                <h6>My Profile Page</h6>
                <br/>
                <label>Full Name</label>&nbsp;<input></input>
                <br/><br/>
                <label>Email</label>&nbsp;<input></input><br/><br/>
                <button>Update</button>
                <br/><br/><br/><br/>
                <h6>Reset Password</h6>
                <p>
                    If you would like to reset your password, please click the Reset Password button, and
                    we will send you an email to reset your password.
                </p>
                <button>Reset Password</button>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;