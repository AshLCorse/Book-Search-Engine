import { useQuery } from "@apollo/client";

import BookSearch from "../components/BookSearch";

import { QUERY_BOOKS } from "../utils/queries";

const SearchBooks = () => {
  const { loading, data } = useQuery(QUERY_BOOKS);
  const books = data?.books || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BookSearch books={books} title="Some Food for Thought..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchBooks;
