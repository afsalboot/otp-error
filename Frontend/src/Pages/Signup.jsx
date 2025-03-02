import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon
} from "mdb-react-ui-kit";
import { signupDetails } from "../Api";

function Signup() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        image: null
    });

    const [message, setMessage] = useState(""); // To display messages

    console.log("Current data:", data);

    function handleChange(event) {
        const { name, value, files, type } = event.target;

        setData(prevState => ({
            ...prevState,
            [name]: type === "file" ? files[0] : value
        }));
    }

    async function display(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        if (data.image) {
            formData.append("image", data.image);
        }

        try {
            const finalOutput = await signupDetails(formData);
            console.log("API Response:", finalOutput);

            if (finalOutput && finalOutput.status === "success") {
                setMessage("Signup successful!");
                navigate("/");
            } else {
                setMessage(finalOutput?.message || "Signup failed. Try again.");
            }
        } catch (err) {
            console.error("Signup error:", err.message);
            setMessage("An error occurred. Please try again.");
        }
    }

    return (
        <MDBContainer fluid>
            <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
                <MDBCardBody>
                    <form onSubmit={display} encType="multipart/form-data">
                        <MDBRow>
                            <MDBCol md="10" lg="6" className="order-2 order-lg-1 d-flex flex-column align-items-center">
                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{message}</p>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="user me-3" size="lg" />
                                    <MDBInput
                                        name="name"
                                        label="Your Name"
                                        type="text"
                                        className="w-100"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size="lg" />
                                    <MDBInput
                                        name="email"
                                        label="Your Email"
                                        type="email"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="image me-3" size="lg" />
                                    <MDBInput
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock me-3" size="lg" />
                                    <MDBInput
                                        name="password"
                                        label="Password"
                                        type="password"
                                        onChange={handleChange}
                                    />
                                </div>

                                <Link to={"/"}>I already have an account!</Link>
                                <MDBBtn className="mb-4" size="lg" type="submit">
                                    Signup
                                </MDBBtn>
                            </MDBCol>

                            <MDBCol md="10" lg="6" className="order-1 order-lg-2 d-flex align-items-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                    fluid
                                />
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Signup;
