import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        axios.get(`/api/users/${id}`)
            .then(res => {
                setUser(res.data[0]);
                // console.log("user", res.data);

            })
            .catch(error => console.log(error.message))
    }, []);
    return (
        <div>
            <Navbar></Navbar>
            <div className="container mt-5">
                {
                    user &&
                    <>
                        <h1>User Profile</h1>
                        <div>
                            <div>
                                <img src="" alt="" height="50" />
                            </div>
                            <div>
                                <div className="d-flex">
                                    <label>User Name: &nbsp;</label>
                                    <h4> {user.uname}</h4>
                                </div>
                                <div className="d-flex">
                                    <label>Email: &nbsp;</label>
                                    <h4> {user.email}</h4>
                                </div>
                                <div className="d-flex">
                                    <label>Website: &nbsp;</label>
                                    <h4><a href={`https://` + user.website} target="_blank"> {user.website}</a></h4>
                                </div>

                            </div>
                        </div>
                    </>
                }


            </div>
        </div>
    );
};

export default UserProfile;