import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.GOOGLE_BOOKS_API_KEY
const baseURL = 'https://www.googleapis.com/books/v1/volumes'

export const getData = async query => {
  const url = `${baseURL}?q=${query}&key=${apiKey}`
  const { data } = await axios({
    method: 'get',
    url,
  })
  // .then(res => {
  //   return { message: 'Success', res }
  // })
  // .catch(err => {
  //   return { message: 'Error', err }
  // })

  return data
}

export const more = () => 'win'
