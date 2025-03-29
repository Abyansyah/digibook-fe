import { Suspense } from 'react';
import BookPage from './booksPage';

const Books = () => {
  return (
    <>
      <Suspense>
        <BookPage />
      </Suspense>
    </>
  );
};

export default Books;
