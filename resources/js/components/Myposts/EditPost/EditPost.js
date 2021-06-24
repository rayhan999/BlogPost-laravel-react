import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory ,useParams} from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

const EditPost = () => {
    const { id } = useParams();
    let history = useHistory();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [postData, setPostData] = useState();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/myposts/edit/${id}`)
            .then(res => {
                setPostData(res.data[0]);
                // console.log("postdata", res);

            })
            .catch(error => console.log(error.message))
    }, []);
    const onSubmit = data => {
        axios.post(`http://localhost:8000/api/myposts/edit/${id}`, data)

            .then(res => {
                if (res) {
                    console.log("data", res);
                    history.replace("/myposts");
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
            {
                postData &&
            
            <div className="container mt-5">
                <h1>Add New Post</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Post Title</label>
                        <input type="text" className="form-control" placeholder="Enter Title" defaultValue={postData.title} {...register("title", { required: true })} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        {/* <input type="password" className="form-control" placeholder="Enter Title" {...register("title", { required: true })}/> */}
                        <textarea name="description" className="form-control" cols="20" rows="5" defaultValue={postData.description} {...register("description", { required: true })}></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Update</button>
                </form>
            </div>
            }
        </div>
    );
};

export default EditPost;