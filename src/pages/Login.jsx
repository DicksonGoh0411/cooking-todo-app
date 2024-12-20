import { useState, useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    function login() {
        const isCorrectUsername = username === 'dickson@gmail.com';
        const isCorrectPassword = password === 'password123';

        if (isCorrectUsername && isCorrectPassword) {
            authContext.setToken('1234')
            navigate('/home')
        }
    }

    return (
        <>
            <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <div style={{ color: "#f9f9f9" }}>
                    <h1>Login to your account</h1>
                    <Form>
                        <Form.Group className="my-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="my-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Button variant="dark" onClick={login} type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Container>

        </>
    );

}

