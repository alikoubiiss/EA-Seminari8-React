import { useStore } from '@nanostores/react';
import { Link } from 'react-router-dom';

import { favouriteBooks } from '../stores/favourites';
import { formatPrice, languageName } from '../utils/format';
import { FavouriteButton } from './FavouriteButton';

export function FavouritesList() {
  const books = useStore(favouriteBooks);

  return (
    <>
      <div className="page-header">
        <h1>Favoritos</h1>
      </div>

      {books.length === 0 ? (
        <p className="muted">
          Todavía no tienes libros favoritos. Márcalos con ☆ desde el <Link to="/books">listado de libros</Link>.
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Título</th>
              <th>Autores</th>
              <th>Idioma</th>
              <th>Año</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>
                  <img
                    className="cover"
                    src={`https://picsum.photos/seed/${book._id}/60/80`}
                    alt={`Portada de ${book.title}`}
                  />
                </td>
                <td>{book.title}</td>
                <td>
                  {book.authors.length > 0 ? (
                    book.authors.map((author) => author.name).join(', ')
                  ) : (
                    <span className="muted">Sin autores</span>
                  )}
                </td>
                <td>{languageName(book.language)}</td>
                <td>{book.publishedYear}</td>
                <td>{formatPrice(book.price)}</td>
                <td className="actions">
                  <FavouriteButton book={book} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
