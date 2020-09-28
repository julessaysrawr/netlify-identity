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

const todosReducer = (state, action) => {
  switch(action.type) {
    case "addTodo":
      return [{ done: false, value: action.payload }, ...state];
    case "toggleTodoDone":
      const newState = [...state];
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value
      }
      return newState;
  }
}

export default () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  // two problems with useState
  // 1 - input should clear on Submit
  // 2 - had to get at checkboxes inside useState
  // const [todos, setTodos] = useState([]);
  const [todos, dispatch] = useReducer(todosReducer, []);
  const inputRef = useRef();

  // return <div>Dash hasUser: {user && user.user_metadata.full_name}</div>;
  return (
    <Container>
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
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "addTodo", payload: inputRef.current.value });
          // setTodos([{ done: false, value: inputRef.current.value }, ...todos]);
          // alert(inputRef.current.value);
          inputRef.current.value = "";
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
        <ul sx={{ listStyleType: "none" }}>
          {todos.map((todo, i) => (
            // putting change handler here so it will work when anything in the li is clicked, tabbed or spaced
            <Flex as="li" key={todo.value} onClick={e => {
              dispatch({
                type: "toggleTodoDone",
                payload: i
              })
            }}>
              <Checkbox checked={todo.done} />
              <span>{todo.value}</span>
            </Flex>
          ))}
        </ul>
      </Flex>
    </Container>
  );
};
