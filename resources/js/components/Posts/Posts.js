import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

const Posts = () => {
    const [posts, setPosts] = useState();
    const [visible, setVisible] = useState(2);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/posts`)
            .then(res => {
                setPosts(res.data);
                console.log("cookie", res.data);

            })
            .catch(error => console.log(error.message))
    }, []);
    const handleLoadMore = () => {
        setVisible(oldValue=> oldValue + 2);
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="container mt-5">
                <div className="d-flex justify-content-between">
                    <h3 className="">Posts</h3>

                </div>
                <div className="">
                    {posts &&
                        posts.slice(0,visible).map(post => {
                            return (

                                <div class="card mb-4" >
                                    <div class="card-body">
                                        <h5 class="card-title">{post.title}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">{post.creator}</h6>
                                        <p class="card-text">{post.description.slice(0, 100)}...</p>
                                        <a href="#" class="btn btn-info card-link">Details</a>
                                        {/* <a href="#" class="card-link">Another link</a> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                    <button className="btn btn-primary btn-block" onClick={handleLoadMore}>Load More</button>
                </div>
            </div>
        </div>
    );
};

export default Posts;