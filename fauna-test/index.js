const faunadb = require("faunadb");
const q = faunadb.query;

var client = new faunadb.Client({ secret: process.env.FAUNA });

async function run() {
  try {
    // const results = await client.query(
    //   q.Update(q.Ref(q.Collection("todos"), "278040281637454338"), {
    //     data: {
    //       done: true
    //     }
    //   })
    // );
    // const results = await client.query(
    //   q.Create(q.Collection("todos"), {
    //     data: {
    //       text: "whatever",
    //       done: false,
    //       owner: "user-test-2",
    //     },
    //   })
    // );
    const results = await client.query(
      q.Paginate(q.Match(q.Index("todos_by_user"), "user-test"))
    );
    console.log("results: ", results);
    console.log('results.ref.id: ', results.ref.id);
    
  } catch (error) {
    console.log("error: ", error);
  }
}

run();
