import axios from 'axios'
import React from 'react'
import Router from 'react-router'

import * as store from './store'

const { RouteHandler, Link } = Router

export default class Books extends React.Component {
  state = {
    books: store.getBooks()
  }
  componentWillMount() {
    if (this.state.books.length > 0) return

    axios({
      url: 'http://data.jaketrent.com/api/v1/books'
    }).then(res => {
      store.setBooks(res.data.books)
      this.setState({
        books: res.data.books
      })
    })
  }
  renderBook(book) {
    return (
      <li key={book.id}>
        <Link to="book" params={{ id: book.id }}>{book.title}</Link>
      </li>
    )
  }
  renderBooks(books) {
    return books.map(this.renderBook)
  }
  render() {
    return (
      <div>
        <h2>Books</h2>
        <ul>
          {this.renderBooks(this.state.books)}
        </ul>
        <RouteHandler />
      </div>
    )
  }
}
