import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";




export default function AddTodo() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const setTodos = useContext(TodoContext).setTodos;
    const todos = useContext(TodoContext).todos;
    const navigate = useNavigate();

    function addTodo(event) {
        event.preventDefault();
        setTodos([...todos, { id: Date.now(), title, description, completed }]);
        navigate("/home");
    }

    return (
        <Container className="my-3">
            <h1 className="ms-4" style={{ color: "#f9f9f9" }}>Add Todo</h1>
            <Container className="my-5" style={{
                maxWidth: "90%",
                maxHeight: "100%",
                border: "4px solid #f9f9f9",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
            }}>
                <Form style={{ color: "#f9f9f9" }} onSubmit={addTodo}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Recipe name</Form.Label>
                        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Soup noodles" required />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as='textarea' rows={3} placeholder={`1. Boil water\n2. Prep ingredients\n3. Cook`} required />
                    </Form.Group>
                    <Form.Check type="checkbox" id="completed" label="Mark as completed" checked={completed} onChange={(e) => setCompleted(e.target.checked)} className="mb-3" />


                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </Container>
        </Container>
    )
}