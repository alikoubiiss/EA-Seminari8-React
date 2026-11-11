import { useStore } from '@nanostores/react';

import type { Book } from '../models';
import { favouriteBooks, isFavourite, toggleFavourite } from '../stores/favourites';

export function FavouriteButton({ book }: { book: Book }) {
  const favourite = isFavourite(useStore(favouriteBooks), book._id);

  return (
    <button
      type="button"
      className={`favourite${favourite ? ' active' : ''}`}
      aria-pressed={favourite}
      aria-label={favourite ? `Quitar "${book.title}" de favoritos` : `Marcar "${book.title}" como favorito`}
      title={favourite ? 'Quitar de favoritos' : 'Marcar como favorito'}
      onClick={() => toggleFavourite(book)}
    >
      {favourite ? '★' : '☆'}
    </button>
  );
}
