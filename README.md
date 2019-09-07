# GraphQL CRUD example/tutorial 
based on https://developer.okta.com/blog/2019/05/29/build-crud-nodejs-graphql

## Requirements:
- node

## Usage:
`npm install`

```
npm start

🚀  Server ready at http://localhost:4000/
```

Load http://localhost:4000/ in a browser and the resulting playground will allow you to interact with the graph

## Examples:

### Create:
```
mutation Create {
 addQuote(phrase: "To boldly go where no one has gone before.", quotee: "Cpt. Picard") {
  id
 }
}
```

### Read
```
query Read {
  quotes {
    phrase,
    quotee,
    id
  }
}
```

### Update
```
mutation Update($id: ID!){
  editQuote(id: $id, quotee: "that guy") {
    id,
    phrase,
    quotee
  }
}
```
where:
```
{
  "id": "some id"
}
```

### Delete
```
mutation Delete($id: ID!) {
  deleteQuote(id: $id) {
    ok
  }
}
```
where:
```
{
  "id": "some id"
}
```