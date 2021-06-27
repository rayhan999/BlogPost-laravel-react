import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import { UserContext } from '../../Example';
import Navbar from '../../Navbar/Navbar';
import { post } from 'jquery';

const PostDetails = () => {
    const { id } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [details, setDetails] = useState();
    const [comments, setComments] = useState();
    const [mount, setMount] = useState(true);
    const [hover, setHover] = useState(false);
    const [visible, setVisible] = useState(10);
    useEffect(() => {
        axios.get(`/api/posts/${id}`)
            .then(res => {
                setDetails(res.data[0]);
                console.log("details", res.data);

            })
            .catch(error => console.log(error.message));
        axios.get(`/api/posts/comments/${id}`)
            .then(res => {
                setComments(res.data);
                // console.log("comm", res.data);

            })
            .catch(error => console.log(error.message));
    }, [id, mount, visible]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data, e) => {
        const commentValue = {
            commentator: Cookies.get('uname'),
            comment: data.comment,
            post_id: details.id
        }
        // console.log("commnet", commentValue);
        axios.post('/api/posts/addcomment', commentValue)

            .then(res => {
                if (res) {
                    // console.log("data", res);
                    setMount(!mount);
                    e.target.reset();
                } else {
                    // console.log("fals");
                }
            })
            .catch(error => {
                // console.log(error.message);
            })

    }
    const handleLoadMore = () => {
        setVisible(oldValue => oldValue + 10);
    }
    return (
        <div>
            <Navbar></Navbar>

            <div className="container mt-5">
                {
                    details &&
                    <>
                        
                        <div className="">
                        <img src={`../${details.image}`} alt="a" className="img-fluid" width="100%" style={{height:"60vh"}}/>
                            <h1>{details.title}</h1>
                            <small>{details.creator}</small>
                            <p>{details.description}</p>
                        </div>
                        <h1>comments</h1>
                    </>
                }
                {
                    details && comments && comments.slice(0, visible).map((comment) =>
                        <div className="card  mb-2 " key={comment.id}
                        // onMouseEnter={() => setHover(true)}
                        // onMouseLeave={() => setHover(false)}
                        >
                            <div className="d-flex justify-content-between pl-5 pr-5">
                                <div className="">
                                    <h4>{comment.commentator}</h4>
                                    <p>{comment.comment}</p>
                                </div>

                                <div className="d-flex align-items-center">
                                    {loggedInUser === comment.commentator &&
                                        // hover &&
                                        <>
                                            <button className="btn btn-success">Edit</button>
                                            <button className="btn btn-danger">Delete</button>
                                        </>
                                    }
                                </div>
                            </div>

                        </div>
                    )
                }
                {
                    comments && comments.length > visible &&
                    <button className="btn btn-primary " onClick={handleLoadMore}>view previous comments</button>
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