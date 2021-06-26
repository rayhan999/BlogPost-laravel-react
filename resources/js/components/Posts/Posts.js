import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [visible, setVisible] = useState(10);
    useEffect(() => {
        axios.get(`/api/posts`)
            .then(res => {
                setPosts(res.data);
                // // console.log("cookie", res.data);

            })
            .catch(error => console.log(error.message))
    }, []);
    const handleLoadMore = () => {
        setVisible(oldValue=> oldValue + 10);
        // console.log(posts.length);
        // console.log(visible);
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

                                <div className="card mb-4" key={post.id}>
                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{post.creator}</h6>
                                        <p className="card-text">{post.description.slice(0, 100)}...</p>
                                        <Link to={`/posts/${post.id}`} className="btn btn-info card-link">Details</Link>
                                        {/* <a href="#" className="card-link">Another link</a> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        posts.length > visible &&
                    
                    <button className="btn btn-primary btn-block" onClick={handleLoadMore}>Load More</button>
                }
                </div>
            </div>
        </div>
    );
};

export default Posts;