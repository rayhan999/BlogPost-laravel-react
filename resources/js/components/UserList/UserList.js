import React, { useEffect, useState, useMemo } from "react";
import PaginationComponent from "react-bootstrap/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from '../Navbar/Navbar';


const UserList = () => {
    const [comments, setComments] = useState([]);
    // const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage') ||1);
    const [search, setSearch] = useState(localStorage.getItem('search') ||"");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [ItemsPerPage, setItemsPerPage] = useState(localStorage.getItem('ItemsPerPage') || 5);
    const [totalPages, setTotalPages] = useState(0);
    // const [search, setSearch] = useState("");
    // const ItemsPerPage = 2;

    const headers = [
        { name: "No#", field: "id", sortable: false },
        { name: "Name", field: "uname", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Comment", field: "website", sortable: false }
    ];

    useEffect(() => {
        const getData = () => {
            // showLoader();

            fetch("http://localhost:8000/api/users")
                .then(response => response.json())
                .then(json => {
                    // hideLoader();
                    setComments(json);
                    console.log(json);
                });
        };

        getData();
        // axios.get(`http://localhost:8000/api/users`)
        //     .then(res => {
        //         setUsers(res.data);


        //     })
        //     .catch(error => console.log(error.message))
        if (totalItems > 0 && ItemsPerPage > 0){
            setTotalPages(Math.ceil(totalItems / ItemsPerPage));}
            localStorage.setItem('ItemsPerPage', ItemsPerPage);
            localStorage.setItem('currentPage', currentPage);
            localStorage.setItem('search', search);
    }, [totalItems, ItemsPerPage,currentPage,search]);
    const commentsData = useMemo(() => {
        let computedComments = comments;
        // console.log("search", search,computedComments);
        if (search && computedComments) {
            computedComments = computedComments.filter(
                comment =>
                    comment.uname.toLowerCase().includes(search.toLowerCase()) ||
                    comment.email.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedComments.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ItemsPerPage,
            (currentPage - 1) * ItemsPerPage + ItemsPerPage
        );
    }, [comments, currentPage, search, sorting, ItemsPerPage]);
    // const onPageChange= page => {setCurrentPage(page)}
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

    
    const onInputChange = value => {
        setSearch(value);
        // onSearch(value);
        setCurrentPage(1);
    };

    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        // onSorting(field, order);
        setSorting({ field, order })
    };

    console.log("users", comments);
    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <h1>users</h1>
                <div className="row w-100">
                    <div className="col mb-3 col-12 text-center">
                        <div className="row">
                            <div className="col-md-6">

                                <select
                                    className="btn btn-info"
                                    defaultValue={ItemsPerPage}
                                    onChange={e => setItemsPerPage(e.target.value)}
                                >
                                    <option value={ItemsPerPage} selected disabled hidden>{ItemsPerPage}</option>
                                    <option className="bg-white text-muted">2</option>
                                    <option className="bg-white text-muted">3</option>
                                    <option className="bg-white text-muted">5</option>
                                </select>


                                <PaginationComponent>
                                    <PaginationComponent.Prev
                                        onClick={() => onPageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    />
                                    {paginationItems}
                                    <PaginationComponent.Next
                                        onClick={() => onPageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    />
                                </PaginationComponent>
                            </div>
                            <div className="col-md-6 d-flex flex-row-reverse">

                                <input
                                    type="text"
                                    className="form-control"
                                    style={{ width: "240px" }}
                                    placeholder="Search"
                                    value={search}
                                    onChange={e => onInputChange(e.target.value)}
                                />
                            </div>
                        </div>

                        <table className="table table-striped">

                            <thead>
                                <tr>
                                    {headers.map(({ name, field, sortable }) => (
                                        <th
                                            key={name}
                                            onClick={() =>
                                                sortable ? onSortingChange(field) : null
                                            }
                                        >
                                            {name}

                                            {sortingField && sortingField === field && (
                                                <FontAwesomeIcon
                                                    icon={
                                                        sortingOrder === "asc"
                                                            ? "arrow-down"
                                                            : "arrow-up"
                                                    }
                                                />
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {commentsData.map(comment => (
                                    <tr>
                                        <th scope="row" key={comment.id}>
                                            {comment.id}
                                        </th>
                                        <td>{comment.uname}</td>
                                        <td>{comment.email}</td>
                                        <td>{comment.website}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;