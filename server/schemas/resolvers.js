const { User, Book } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("books");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("books");
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params);
    },
    book: async (parent, { bookId }) => {
      return Book.findOne({ _id: bookId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("books");
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { description }, context) => {
      if (context.user) {
        const book = await Book.create({
          title,
          description,
          authors,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { books: book.bookId } }
        );

        return book;
      }
      throw AuthenticationError;
      ("You need to be logged in!");
    },
    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const book = await Book.findOneAndDelete({
          _id: bookId,
          authors,
          description,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { books: book.bookId } }
        );

        return book;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
