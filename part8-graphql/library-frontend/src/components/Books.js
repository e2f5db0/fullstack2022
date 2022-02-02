import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const [filter, setFilter] = useState('none')

  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  
  const allBooks = result.data.allBooks
  let filteredBooks = []
  if (filter !== 'none') {
    filteredBooks = allBooks.filter(b => b.genres.includes(filter))
  }
  let genres = []
  allBooks.forEach(b => {
    b.genres.forEach(g => {
      if (!genres.includes(g)) {
        genres.push(g)
      } 
    })
  })

  let books = filteredBooks.length > 0 ? filteredBooks : allBooks

  return (
    <div>
      <h2>books</h2>
      <p>In genre: <b>{filter}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(b => <button onClick={() => setFilter(b)}>{b}</button>)}
      <button onClick={() => setFilter('none')}>all genres</button>
    </div>
  )
}

export default Books