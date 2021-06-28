import React, { useEffect, useState } from 'react';
import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

const AddPost = () => {
    let history = useHistory();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [postImg, setPostImg] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [editServiceImg, setEditServiceImg] = useState(null);
    const [err, setErr] = useState(false);

    const handleFile = (e) => {
        setErr(false);
        const selected = e.target.files[0];
        setPostImg(selected);
        console.log(selected);
        const mimetype = ['image/png', 'image/jpeg', 'image/jpg'];
        if (selected && mimetype.includes(selected.type)) {
            console.log("selected");
            let reader = new FileReader();
            console.log("reader", reader);
            reader.onloadend = () => {
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(selected);
        } else {
            console.log("Unsupported");
            setErr(true);
        }
    }
    const onSubmit = data => {
        const eventData = {
            title: data.title,
            description: data.description
        };
        const formData = new FormData();
        formData.append('title', eventData.title);
        formData.append('description', eventData.description);
        formData.append('image', postImg);
        axios.post('/api/addpost', formData)

            .then(res => {
                if (res) {
                    // console.log("data", res);
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
            <div className="container mt-5">
                <h1>Update Post</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="text" className="form-control" placeholder="Enter Title" {...register("title", { required: true })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <textarea name="description" className="form-control" cols="20" rows="5" {...register("description", { required: true })}></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label mb-3">Image</label>
                        {
                            !imgPreview ?
                                <>
                                    <input type="file" className="form-control" onChange={handleFile} />
                                </>
                                :
                                imgPreview &&
                                <div
                                    style={{
                                        background: imgPreview
                                            ? `url("${imgPreview}") no-repeat center/cover`
                                            : "white",
                                        height: "100px", 
                                        width: "100px", 
                                        borderRadius: "10%", 
                                        position: "relative"
                                    }}
                                >
                                    <button type="button" className="btn deleteImageBtn bg-primary" onClick={() => setImgPreview(null)}
                                        style={{
                                            position: "relative",
                                            top: "-15px",
                                            left: "85px",
                                            padding: "0 6px !important",
                                            color: "white",
                                            borderRadius: "50%",
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                    </button>
                                </div >
                        }
                    </div>
                    {err && <p className="text-danger">Unsupported File</p>}
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;