import { Container } from "react-bootstrap";

export default function ErrorPage() {
    return (
        <Container className="my-5 d-flex justify-content-center align-items-center" style={{ color: "#f9f9f9" }}>
            <div>
                <h1>Oops!</h1>
                <p>Page not found</p>
            </div>
        </Container>
    )
}