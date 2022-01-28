import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { register } from "../actions/userActions";

function RegisterScreen({ location, history }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password == confirmPassword) {
      dispatch(register(name, email, password));
    } else {
      setMessage("Passwords do not match!!");
    }
  };
  return (
    <FormContainer>
      <h1>Sign in</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader></Loader>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Digite o seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/*<Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Digite o seu sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group> */}

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Digite o email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Digite a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="passwordConfirm">
          <Form.Label>Digite a senha novamente</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Digite a senha novamente"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          <Link to={redirect ? "/login?redirect=${redirect}" : "/login"}>
            Already have an account? Sign In piece of shit
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
