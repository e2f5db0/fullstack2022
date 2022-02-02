import { useQuery } from '@apollo/client'
import React from 'react'
import { RECOMMENDED_BOOKS, ME } from '../queries'

const Recommended = (props) => {

    const result = useQuery(RECOMMENDED_BOOKS, { 
        variables: { genre: 'Amazing books' } 
    })

    const me = useQuery(ME)

    if (!props.show) {
        return null
    }
    
    if (result.loading || me.loading) {
        return <div>loading...</div>
    }
    
    console.log(me)
    const favouriteGenre = me.data.me.favoriteGenre
    const books = result.data.allBooks

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favourite genre <b>{favouriteGenre}</b></p>
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
        </div>
    )
}

export default Recommended