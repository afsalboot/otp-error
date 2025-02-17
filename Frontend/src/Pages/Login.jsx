import React, { useState } from "react";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { loginDetails } from "../Api";
import {  Link } from "react-router-dom";
import { useDispatch } from "react-redux";


function Login() {
    

    const dispatch = useDispatch();

    

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    }

    async function display() {
        loginDetails(data , dispatch)
    }

    return (
        <MDBContainer className="my-5">
            <MDBCard>
                <MDBRow className="g-0 d-flex align-items-center">
                    <MDBCol md="4">
                        <MDBCardImage
                            src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                            alt="phone"
                            className="rounded-t-5 rounded-tr-lg-0"
                            fluid
                        />
                    </MDBCol>

                    <MDBCol md="8">
                        <MDBCardBody>
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Email address"
                                id="form1"
                                name="email"
                                type="email"
                                onChange={handleChange}
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Password"
                                id="form2"
                                name="password"
                                type="password"
                                onChange={handleChange}
                            />

                            <div className="d-flex justify-content-between mx-4 mb-4">
                                <Link to={"/signup"}>Create an account?</Link>
                                <a href="!#">Forgot password?</a>
                            </div>

                            <MDBBtn className="mb-4 w-100" onClick={display}>
                                Log in
                            </MDBBtn>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBContainer>
    );
}

export default Login;
