export const BASE_URL = 'http://localhost:5000/'
export const USER ='user'
export const TOKEN ='token'
export const getToken = () =>{
  return localStorage.getItem(TOKEN)
}