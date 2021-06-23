
// import React,{createContext, useState} from 'react';
// import ReactDOM from 'react-dom';
// import {
//     BrowserRouter as Router,
//     Route,
//     Switch
//   } from "react-router-dom";
// import Navbar from './components/Navbar/Navbar';

// export const UserContext = createContext();
// function Example() {
//     const [loggedInUser, setLoggedInUser] = useState({});
//     return (
//         <div className="container">
//             <UserContext.Provider value={[loggedInUser, setLoggedInUser]} className="container">
//             <Navbar></Navbar>
//             <h3>email: {loggedInUser.email}</h3>
//             </UserContext.Provider>
//         </div>
//     );
// }

// export default Example;

// if (document.getElementById('app')) {
//     ReactDOM.render(<Example />, document.getElementById('app'));
// }

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/Example');