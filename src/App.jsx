import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";
import useLocalStorage from 'use-local-storage';
import { TodoContext } from "./contexts/TodoContext";
import AddTodo from "./pages/AddTodo";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import EditTodo from "./pages/EditTodo";
import Login from "./pages/Login";
import { AuthContext } from "./AuthContext";
import RequireAuth from "./components/RequireAuth";

function Layout() {
  return (
    <>
      <Navbar style={{ backgroundColor: 'rgba(44, 43, 46, 0.8)' }} variant="dark">
        <Container>
          <Navbar.Brand href="/home"><i className="bi bi-egg-fried"></i> Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/add">Add Todo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [todos, setTodos] = useLocalStorage('todos', []);


  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <TodoContext.Provider value={{ todos, setTodos }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="home" element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="add" element={<RequireAuth><AddTodo /></RequireAuth>} />
              <Route path="todo/:id" element={<RequireAuth><EditTodo /></RequireAuth>} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TodoContext.Provider>
    </AuthContext.Provider>
  )
}