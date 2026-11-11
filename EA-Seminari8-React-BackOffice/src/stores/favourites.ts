import { atom } from 'nanostores';

import type { Book } from '../models';

const STORAGE_KEY = 'favourite-books';

// guarda el libro entero, no solo el id, para no tener que volver a llamar a la api en FavouritesList
// el problema es que si editas el libro despues en favoritos sigue el titulo antiguo hasta que lo desmarques
function load(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Book[]) : [];
  } catch {
    return [];
  }
}

export const favouriteBooks = atom<Book[]>(load());

favouriteBooks.listen((books) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch {

  }
});

export function isFavourite(books: Book[], id: string) {
  return books.some((book) => book._id === id);
}

export function toggleFavourite(book: Book) {
  const current = favouriteBooks.get();
  favouriteBooks.set(
    isFavourite(current, book._id) ? current.filter((b) => b._id !== book._id) : [...current, book],
  );
}
