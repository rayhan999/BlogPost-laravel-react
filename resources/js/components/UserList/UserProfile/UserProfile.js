import React, { useEffect, useState, useMemo } from "react";
import PaginationComponent from "react-bootstrap/Pagination";
import { useHistory, useParams, Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState();
    // console.log("usersssss", user);
    const [posts, setPosts] = useState([]);
    const [mount, setMount] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [ItemsPerPage, setItemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {

        axios.get(`/api/users/${id}`)
            .then(res => {
                setUser(res.data[0]);
                if (!user) {
                    setMount(!mount);
                } else {
                    return user;
                }
                // console.log("user", res.data[0]);


            })
            .catch(error => console.log(error.message));


        if (user) {
            // console.log("u", user);
            axios.get(`/api/users/posts/${user.uname}`)
                .then(res => {
                    setPosts(res.data);
                    // console.log("posts", res.data);

                })
                .catch(error => console.log(error.message));
        }
        if (totalItems > 0 && ItemsPerPage > 0) {
            setTotalPages(Math.ceil(totalItems / ItemsPerPage));
        }
    }, [mount, totalItems, ItemsPerPage]);

    const commentsData = useMemo(() => {
        let computedComments = posts;


        setTotalItems(computedComments.length);



        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ItemsPerPage,
            (currentPage - 1) * ItemsPerPage + ItemsPerPage
        );
    }, [posts, currentPage, ItemsPerPage]);

    const paginationItems = useMemo(() => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <PaginationComponent.Item
                    key={i}
                    active={i == currentPage}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </PaginationComponent.Item>
            );
        }

        return pages;
    }, [totalPages, currentPage]);

    return (
        <div>
            <Navbar></Navbar>
            <div className="container mt-5">
                {
                    user &&
                    <>
                        <h1>User Profile</h1>
                        <div >
                            <div>
                                <img src="" alt="" height="50" />
                            </div>
                            <div>
                                <div className="d-flex">
                                    <label>User Name: &nbsp;</label>
                                    <h4 > {user.uname}</h4>
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
                        <div>
                            <div>
                                <h1>posts</h1>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            {/* <th scope="col">Handle</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {commentsData.map(post => (
                                            <tr key={post.id}>
                                                <th scope="row">{post.id}</th>
                                                <td><Link to={`/posts/${post.id}`} style={{ textDecoration: "none", color: "black" }}>{post.title}</Link></td>
                                                <td>{post.description.slice(0,50)}...</td>
                                                {/* <td>@mdo</td> */}
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-end">
                                    <PaginationComponent>
                                        <PaginationComponent.Prev
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        />
                                        {paginationItems}
                                        <PaginationComponent.Next
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        />
                                    </PaginationComponent>
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