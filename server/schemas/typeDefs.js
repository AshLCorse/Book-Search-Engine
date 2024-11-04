const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    books: [Book]!
  }

  type Book {
    bookId: String
    title: String
    authors: String
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: String!): Book
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookId: String!): Book
    deleteBook(bookId: ID!): Book
  }
`;

module.exports = typeDefs;
