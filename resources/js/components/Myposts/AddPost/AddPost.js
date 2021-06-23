import React from 'react';
import { useForm } from "react-hook-form";
import Navbar from '../../Navbar/Navbar';

const AddPost = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        axios.post('http://localhost:8000/api/addpost', data)
           
            .then(res =>{
                if(res){
                   
                   
                    console.log("data",res);
                }else{
                    
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
            <h1>Add New Post</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="text" className="form-control" placeholder="Enter Title" {...register("title", { required: true })} />
                       
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        {/* <input type="password" className="form-control" placeholder="Enter Title" {...register("title", { required: true })}/> */}
                        <textarea name="description" className="form-control" cols="20" rows="5" {...register("description", { required: true })}></textarea>
                    </div>
                   
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;