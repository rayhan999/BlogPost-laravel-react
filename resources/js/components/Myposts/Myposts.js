import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Example';
import Navbar from '../Navbar/Navbar';

const Myposts = () => {
    const [myPosts, setMyposts] = useState();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/myposts`)
            .then(res => {
                setMyposts(res.data);
                console.log("cookie", res.data);

            })
            .catch(error => console.log(error.message))
    }, []);
    return (
        <div>
            <Navbar></Navbar>
            <div className="container mt-5">
                <div className="d-flex justify-content-between">
                    <h3 className="">My Posts</h3>
                    <Link to="/myposts/add" className="btn btn-success ">Add New Post</Link>
                </div>
                <div className="table-responsive mt-5">

                    <table className="table table-striped align-middle text-center">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { myPosts &&
                                myPosts.map(post => {
                                    return (
                                        <tr key={ post.id}>
                                            <th scope="row">{post.id }</th>
                                            <td>{post.title}</td>
                                            <td>{post.description.slice(0,50)}...</td>
                                            <td>
                                                <button className="btn btn-outline-success m-2">Edit</button>
                                                <button className="btn btn-outline-danger m-2">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Myposts;