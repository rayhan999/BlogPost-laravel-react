import React, { useEffect, useState, useMemo } from "react";
import PaginationComponent from "react-bootstrap/Pagination";
import { Link } from 'react-router-dom';

const UserPosts = ({ uname }) => {
    // console.log(uname);
    const [posts, setPosts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [ItemsPerPage, setItemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        axios.get(`/api/users/posts/${uname}`)
            .then(res => {
                setPosts(res.data);
                // console.log("posts", res.data);

            })
            .catch(error =>  console.log(error.message));
        if (totalItems > 0 && ItemsPerPage > 0) {
            setTotalPages(Math.ceil(totalItems / ItemsPerPage));
        }
    }, [totalItems, ItemsPerPage])

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
            <h1>posts</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        {/* <th scope="col">Handle</th> */}
                    </tr>
                </thead>
                <tbody>
                   
                    {commentsData.map(post => (
                        <tr key={post.id}>
                            <th scope="row">{post.id}</th>
                            <td><Link to={`/posts/${post.id}`} style={{ textDecoration: "none", color: "black" }}>{post.title}</Link></td>
                            <td>{post.description}</td>
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
    );
};

export default UserPosts;