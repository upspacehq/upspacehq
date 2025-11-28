import authorsData from '../data/authors.json';

export function getAuthors() {
  return authorsData;
}

export function getAuthorById(id) {
  return authorsData.find(author => author.id === id);
}

export function getAuthorByName(name) {
  return authorsData.find(author => 
    author.name.toLowerCase() === name.toLowerCase()
  );
}