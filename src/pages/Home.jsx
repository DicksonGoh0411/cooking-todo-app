import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TodoContext } from '../contexts/TodoContext'
import TodoCard from "../components/TodoCard";

function CardGroup({ todos }) {
    return todos.map((todo) => {
        return (
            <Col md={4} key={todo.id}>
                <TodoCard todo={todo} />
            </Col>
        )
    })
}

export default function Home() {
    const todos = useContext(TodoContext).todos;
    return (
        <Container className="my-3">
            <h1 className="ms-4" style={{ color: "#f9f9f9" }}>Todo List</h1>
            <Row className="d-flex ms-4">
                <CardGroup todos={todos} />
            </Row>
        </Container>
    )
}
