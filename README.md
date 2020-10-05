# netlify-identity

[Tutorial](https://egghead.io/playlists/building-a-serverless-jamstack-todo-app-with-netlify-gatsby-graphql-and-faunadb-53bb)

[Styling by theme-ui](https://theme-ui.com/home)

[source code](https://github.com/ChristopherBiscardi/serverless-todo-netlify-fauna-egghead)

[FaunaDB](https://fauna.com/)

Example graphql queries
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