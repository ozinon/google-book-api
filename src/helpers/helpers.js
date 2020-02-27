import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.GOOGLE_BOOKS_API_KEY
const baseURL = 'https://www.googleapis.com/books/v1/volumes'
const maxResults = 5

export const getBooks = async (query, pageIndex) => {
  const paginationIndex = pageIndex * maxResults
  const cleanedQuery = encodeURIComponent(query.trim())
  const url = `${baseURL}?q=${cleanedQuery}&startIndex=${paginationIndex}&maxResults=${maxResults}&key=${apiKey}`
  const { data } = await axios({
    method: 'get',
    url,
    timeout: 3000,
  })
  return data
}

export const getBook = async id => {
  const url = `${baseURL}/${id}`
  const { data } = await axios({
    method: 'get',
    url,
    timeout: 3000,
  })
  return data
}

export const truncate = (str, length = 100, ending = '...') => {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending
  }
  return str
}
