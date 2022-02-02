import { gql  } from '@apollo/client'

export const ME = gql`
query {
  me {
    favoriteGenre
  }
}
`
export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`
export const ALL_BOOKS = gql`
query {
    allBooks {
        title
        author {
            name
            born
            bookCount
        }
        published
        genres
    }
}
`
export const RECOMMENDED_BOOKS = gql`
query recommendedBooks($genre: String!) {
    allBooks(genre: $genre) {
        title
        author {
            name
        }
        published
    }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres,
    ) {
        title
        author {
            name
            born
            bookCount
        }
        published
        genres
    }
}
`
export const UPDATE_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $setBornTo,
    ) {
        name
        born
    }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`