import { Modal, Button, Form } from "react-bootstrap";

export default function TimerModal({ show, handleClose, timeInput, setTimeInput, setTimerFromInput }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Timer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="setTimer">
                    <Form.Label>Set Timer (hh:mm:ss):</Form.Label>
                    <Form.Control
                        type="text"
                        value={timeInput}
                        onChange={(e) => setTimeInput(e.target.value)}
                        placeholder="hh:mm:ss"
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={setTimerFromInput}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
