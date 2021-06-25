import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import { UserContext } from '../../Example';
import Navbar from '../../Navbar/Navbar';

const PostDetails = () => {
    const { id } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [details, setDetails] = useState();
    const [comments, setComments] = useState();
    const [mount, setMount] = useState(true);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/posts/${id}`)
            .then(res => {
                setDetails(res.data[0]);
                // console.log("details", res.data);

            })
            .catch(error => console.log(error.message));
        axios.get(`http://localhost:8000/api/posts/comments/${id}`)
            .then(res => {
                setComments(res.data);
                console.log("comm", res.data);

            })
            .catch(error => console.log(error.message))
    }, [id,mount]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data , e) => {
        const commentValue = {
            commentator: Cookies.get('uname'),
            comment: data.comment,
            post_id: details.id
        }
        console.log("commnet", commentValue);
        axios.post('http://localhost:8000/api/posts/addcomment', commentValue)

            .then(res => {
                if (res) {
                    console.log("data", res);
                    setMount(!mount);
                    e.target.reset();
                } else {
                    console.log("fals");
                }
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="container mt-5">
                {
                    details &&
                    <>
                        <div className="">
                            <h1>{details.title}</h1>
                            <small>{details.creator}</small>
                            <p>{details.description}</p>
                        </div>
                        <h1>comments</h1>
                    </>
                }
                {
                    details && comments && comments.map((comment) =>
                        <div key={comment.id} className="card mb-2 pl-5">
                            <h4>{comment.commentator}</h4>
                            <p>{comment.comment}</p>
                        </div>
                    )
                }
                {
                    loggedInUser && details ?
                        <>
                            <div className="mt-5">
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="mb-3 d-flex">
                                        {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                                        {/* <input type="password" className="form-control" placeholder="Enter Title" {...register("title", { required: true })}/> */}
                                        <textarea name="comment" className="form-control col-md-11" defaultValue="" cols="20" rows="5" {...register("comment", { required: true })}></textarea>
                                        <button type="submit" className="btn btn-primary col-md-1 ml-3" style={{ height: "40px" }}>Comment</button>
                                    </div>


                                </form>
                            </div>
                        </>
                        : details ? <p>Please Login to add comments<Link to="/login" className="ml-3">Login</Link></p>
                            : <p></p>
                }
            </div>
        </div>
    );
};

export default PostDetails;