import { Link } from "react-router-dom";

const BookSearch = ({
  books,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!books.length) {
    return <h3>No Books Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {books &&
        books.map((book) => (
          <div key={book.bookId} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link className="text-light" to={`/profiles/${book.authors}`}>
                  {book.authors} <br />
                </Link>
              ) : (
                <></>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{book.description}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/books/${book.bookId}`}
            >
              Join the discussion on this book.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BookSearch;
