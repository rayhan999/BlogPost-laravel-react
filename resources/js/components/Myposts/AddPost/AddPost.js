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
    // console.log("postImg",postImg);
    const [imgPreview, setImgPreview] = useState(null);
    const [editServiceImg, setEditServiceImg] = useState(null);
    const [err, setErr] = useState(false);

    const handleFile = (e) => {
        // console.log(e.target.files[0]);
        // setPostImg(e.target.files[0]);
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
        // console.log("postData",data);

        const eventData = {
            title: data.title,
            description: data.description,
            // image:data.image[0]
        };
        // console.log(eventData);
        const formData = new FormData();
        formData.append('title', eventData.title);
        formData.append('description', eventData.description);
        formData.append('image', postImg);
        // formData.append('file', file);
        // console.log("formData",formData);
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
                // console.log(error.message);
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
                        {/* <input type="password" className="form-control" placeholder="Enter Title" {...register("title", { required: true })}/> */}
                        <textarea name="description" className="form-control" cols="20" rows="5" {...register("description", { required: true })}></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label mb-3">Email address</label>

                        {
                            !imgPreview
                                // && !editServiceImg 
                                ?

                                <>
                                    {/* <Button
                                            as={"label"}
                                            htmlFor="upload"
                                            variant="outline-primary"
                                            className="d-block p-2 upload-btn">
                                            <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />Upload Image
                                        </Button>
                                        <Form.Control
                                            hidden="hidden"
                                            id="upload"
                                            type="file"
                                            {...register("image")}
                                            onChange={handleImageUpload}
                                            placeholder="Upload photo" /> */}
                                    <input type="file" className="form-control" onChange={handleFile} />
                                </>
                                :
                                imgPreview
                                    // && editServiceImg 
                                   &&
                                    <div
                                        style={{
                                            background: imgPreview
                                                ? `url("${imgPreview}") no-repeat center/cover`
                                                : "#131313",
                                            height: "100px", width: "100px", borderRadius: "10%", position: "relative"
                                        }}
                                    > 
                                    <button type="button" className="btn deleteImageBtn" onClick={() => setImgPreview(null)}
                                style={{
                                    position: "relative",
                                    top: "-15px",
                                    left: "85px",
                                    backgroundColor: "#c009f8",
                                    padding: "0 6px !important",
                                    color: "white",
                                    borderRadius: "50%",
                                }}
                            >
                                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                            </button>
                                    </div >

                        }
                        {/* {imgPreview ?
                            <button type="button" className="btn deleteImageBtn" onClick={() => setImgPreview(null)}
                                style={{
                                    position: "relative",
                                    top: "20px",
                                    left: "90px",
                                    backgroundColor: "#c009f8",
                                    padding: "0 6px !important",
                                    color: "white",
                                    borderRadius: "50%",
                                }}
                            >
                                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                            </button>


                            :
                            ""

                        } */}
                    </div>
                    {err && <p>Unsupported File</p>}
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;