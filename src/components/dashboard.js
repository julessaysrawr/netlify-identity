import React, { useContext, useReducer, useRef, useState } from "react";
import { Router, Link } from "@reach/router";
// import netlifyIdentity from 'netlify-identity-widget'
import { IdentityContext } from "../../identity-context";
import {
  Container,
  Flex,
  Heading,
  Button,
  NavLink,
  Input,
  Label,
  Checkbox,
} from "theme-ui";
import { gql, useMutation, useQuery } from "@apollo/client";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      text
      done
    }
  }
`;

const todosReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return [{ done: false, value: action.payload }, ...state];
    case "toggleTodoDone":
      const newState = [...state];
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value,
      };
      return newState;
  }
};

export default () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  // two problems with useState
  // 1 - input should clear on Submit
  // 2 - had to get at checkboxes inside useState
  // const [todos, setTodos] = useState([]);
  const [todos, dispatch] = useReducer(todosReducer, []);
  const inputRef = useRef();
  // const [addTodo, { data }] = useMutation(ADD_TODO);
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  // return <div>Dash hasUser: {user && user.user_metadata.full_name}</div>;
  return (
    <Container>
      {console.log('data: ', data)}
      
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink
            href="#!"
            p={2}
            onClick={() => {
              netlifyIdentity.logout();
            }}
          >
            Log out {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <Flex
        as="form"
        onSubmit={async e => {
          e.preventDefault();
          addTodo({ variables: { text: inputRef.current.value } });
          // dispatch({ type: "addTodo", payload: inputRef.current.value });
          // setTodos([{ done: false, value: inputRef.current.value }, ...todos]);
          // alert(inputRef.current.value);
          inputRef.current.value = "";
          await refetch();
        }}
      >
        <Label sx={{ display: "flex" }}>
          {/* &nbsp; adds a non-breaking space, so it will not wrape */}
          <span>Add&nbsp;Todo</span>
          <Input ref={inputRef} sx={{ marginLeft: 1 }} />
          <Button sx={{ marginLeft: 1 }}>Submit</Button>
        </Label>
      </Flex>
      <Flex sx={{ flexDirection: "column" }}>
        {loading ? <div>loading...</div> : null}
        {error ? <div>{error.message}</div> : null}
        {!loading && !error && (
          <ul sx={{ listStyleType: "none" }}>
            {/* {todos.map((todo, i) => ( */}
            {data.todos.map((todo) => (
              // putting change handler here so it will work when anything in the li is clicked, tabbed or spaced
              <Flex
                as="li"
                key={todo.id}
                onClick={async e => {
                  // dispatch({
                  //   type: "toggleTodoDone",
                  //   payload: i,
                  // });
                  await updateTodoDone({ variables: { id: todo.id } });
                  await refetch();
                }}
              >
                <Checkbox checked={todo.done} />
                <span>{todo.text}</span>
              </Flex>
            ))}
          </ul>
        )}
      </Flex>
    </Container>
  );
};
