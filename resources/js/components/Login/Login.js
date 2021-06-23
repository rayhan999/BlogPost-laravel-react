import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { UserContext } from '../Example';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook, faUserCircle } from "@fortawesome/free-brands-svg-icons";
import { faUser, faEye, faKey, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './Login.css'

const Login = () => {
    let history = useHistory();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [signup, setSignup] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [signUpFailed, setSignUpFailed] = useState(false);
    const [seePassword, setSeePassword] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const handleToggle = () => {
        setSignup(!signup);
        setNewUser(!newUser);

    }
    const { register: registerSignIn, handleSubmit: handleSignIn } = useForm();
    const { register: registerSignUp, handleSubmit: handleSignUp } = useForm();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/posts" } };
    const onSubmit = eventDdata => {
        console.log(eventDdata);
        if(!newUser){
        axios.post('http://localhost:8000/api/logincheck', eventDdata)
           
            .then(res =>{
                if(res.data){
                    Cookies.set('uname', eventDdata.uname);

                    history.replace(from);
                    // console.log("data",res.data);
                }else{
                    setLoginFailed(true);
                    // console.log("fals");
                }
            })
                .catch(error => {
                setLoginFailed(true);
                // console.log(error.message);
            })
        }else{
            axios.post('http://localhost:8000/api/register', eventDdata)
           
            .then(res =>{
                if(res.data){
                    setSignup(!signup);
                    // console.log("data",res.data);
                }else{
                    setSignUpFailed(true);
                    // console.log("fals");
                }
            })
                .catch(error => {
                    setSignUpFailed(true);
                // console.log(error.message);
            })
        }
    }
    const handlePassShow = () => {
        // console.log("asd");
        setSeePassword(!seePassword);
    }
    return (
        <section className="loginSection">

        <div className={signup ? 'container active' : 'container'}>
            <div className="user signinBx">
                <div className="imgBx">
                    <img className="img-fluid" src="https://image.freepik.com/free-vector/male-couriers-delivering-parcels_74855-14101.jpg" alt="" />
                </div>
                
                <div className="formBx">
                    <form onSubmit={handleSignIn(onSubmit)}>

                        <h2>Sign In</h2>
                        <div className="input-group with-icon icon-left">
                                <input className="form-control rounded" name="uname" placeholder="UserName" {...registerSignIn("uname", { required: true })} type="text" />

                                <p><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></p>
                            </div>
                            <div className="input-group with-icon icon-left">
                                <input className="form-control rounded" name="password" placeholder="Password" {...registerSignIn("password", { required: true })} type={seePassword ? "text" : "password"} />
                                <p><FontAwesomeIcon icon={faKey}></FontAwesomeIcon></p>

                            </div>
                            <p className="see-pass"><FontAwesomeIcon icon={seePassword ? faEyeSlash : faEye} className="see-pass-icon" onClick={handlePassShow}></FontAwesomeIcon></p>

                        {
                            loginFailed &&
                            <div className="alert text-danger  fade show" role="alert">
                                <strong>Opps!</strong> Invalid Username or Password!
                                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button> */}
                            </div>
                        }
                         <input type="submit" className="btn btn-primary btn-block mt-2" />
                        <p className="signup">
                            Don't have an account ?<span onClick={handleToggle} >Sign Up.</span>
                        </p>
                    </form>
                </div>
            </div>
            <div className="user signupBx">
                <div className="formBx">
                <form onSubmit={handleSignUp(onSubmit)}>
                            <div className="input-group with-icon icon-left">
                                <input className="form-control rounded" placeholder="UserName" {...registerSignUp("uname", { required: true })} type="text" />
                                <p><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></p>
                            </div>
                            <div className="input-group with-icon icon-left">
                                <input className="form-control rounded" placeholder="Email" {...registerSignUp("email", { required: true })} type="email" />
                                <p><FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon></p>
                            </div>
                            <div className="input-group with-icon icon-left">
                                <input className="form-control rounded" placeholder="Password" {...registerSignUp("password", { required: true })} type="password" />

                                <p><FontAwesomeIcon icon={faKey}></FontAwesomeIcon></p>
                            </div>
                            {
                            signUpFailed &&
                            <div className="alert text-danger  fade show" role="alert">
                                <strong>Opps!</strong> Invalid Username or Email!
                                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button> */}
                            </div>
                        }
                            <input type="submit" className="btn btn-primary btn-block" name="" value="Sign Up" />
                            <p className="signup">
                                Already have an account ?<span onClick={handleToggle}>Sign in.</span>
                            </p>
                        </form>
                </div>
                <div className="imgBx"><img src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg" alt="" /></div>
            </div>
        </div>

    </section>
    );
};

export default Login;