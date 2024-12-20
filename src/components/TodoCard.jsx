import { Button, Card } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import DeleteModal from "./DeleteModal";
import TimerModal from "./TimerModal";

function parseTimeInput(input) {
    const [hrs, mins, secs] = input.split(":").map(Number);
    return hrs * 3600 + mins * 60 + secs;
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}


export default function TodoCard({ todo }) {
    const completed = todo.completed;
    const border = completed ? "success" : "danger";

    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const setTodos = useContext(TodoContext).setTodos;

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showTimerModal, setShowTimerModal] = useState(false);
    const [timeInput, setTimeInput] = useState("00:00:00");

    const handleDeleteClose = () => setShowDeleteModal(false);
    const handleDeleteShow = () => setShowDeleteModal(true);

    const handleTimerClose = () => setShowTimerModal(false);
    const handleTimerShow = () => setShowTimerModal(true);

    const startTimer = () => {
        if (timerInterval === null) {
            const intervalID = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(intervalID);
                        setTimerInterval(null);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
            setTimerInterval(intervalID);
        }
    };

    const pauseTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
    };

    const resetTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setTimer(parseTimeInput(timeInput));
    };

    const deleteTodo = () => {
        setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== todo.id));
        handleDeleteClose();
    };

    const setTimerFromInput = () => {
        setTimer(parseTimeInput(timeInput));
        handleTimerClose();
    };

    useEffect(() => {
        return () => {
            clearInterval(timerInterval);
        };
    }, [timerInterval]);

    return (
        <>
            <Card border={border} className="my-3" style={{ borderWidth: "4px", backgroundColor: 'rgba(0, 0, 0, 0.8)', color: "#f9f9f9" }}>
                <Card.Header>{!completed && "Not"} Completed</Card.Header>
                <Card.Body>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description
                        .split(/\d+\./)
                        .filter(step => step.trim() !== "")
                        .map((step, index) => (
                            <div key={index}>
                                {index + 1}. {step.trim()}
                            </div>
                        ))}</Card.Text>

                    <p>Timer: {formatTime(timer)}</p>
                    <Button onClick={startTimer}>
                        <i className="bi bi-play"></i>
                    </Button>
                    <Button onClick={pauseTimer} className="mx-2">
                        <i className="bi bi-pause-fill"></i>
                    </Button>
                    <Button onClick={handleTimerShow} className="mx-2">
                        <i className="bi bi-stopwatch"></i>
                    </Button>
                    <Button onClick={resetTimer} className="mx-2">
                        <i className="bi bi-arrow-clockwise"></i>
                    </Button>

                    <Button variant="secondary" href={`todo/${todo.id}`} className="mx-2">
                        <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="danger" onClick={handleDeleteShow} className="mx-2">
                        <i className="bi bi-trash3"></i>
                    </Button>
                </Card.Body>
            </Card>

            <DeleteModal
                show={showDeleteModal}
                handleClose={handleDeleteClose}
                deleteTodo={deleteTodo}
            />

            <TimerModal
                show={showTimerModal}
                handleClose={handleTimerClose}
                timeInput={timeInput}
                setTimeInput={setTimeInput}
                setTimerFromInput={setTimerFromInput}
            />
        </>
    );
}
