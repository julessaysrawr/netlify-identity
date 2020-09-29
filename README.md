# netlify-identity

[Tutorial](https://egghead.io/playlists/building-a-serverless-jamstack-todo-app-with-netlify-gatsby-graphql-and-faunadb-53bb)


Example queries
```
{
  todos {
    id
    text
    done
  }
}

mutation {
  addTodo(text: "Be Awesome"){
    id
  }
}

mutation {
  updateTodoDone(id: "key-1") {
    text
    done
  }
}
```