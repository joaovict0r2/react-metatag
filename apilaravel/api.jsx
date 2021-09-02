import axios from 'axios'

//DESENVOLVIMENTO
// export const urlfotos = 'https://api.lojinha.lionsoft.com.br/storage/' 
// export const url = 'https://api.lojinha.lionsoft.com.br/api'  

//PRODUÇÃO
export const urlfotos = 'https://api.lojinha.bio/storage/'
export const url = 'https://api.lojinha.bio/api'


//LOCAL
//export const urlfotos = 'http://127.0.0.1:8000/storage/' 
//export const url = 'http://127.0.0.1:8000/api'  




const api = axios.create({
  // baseURL:'https://api.lojinha.bio/api', 
  baseURL: url,

  headers: {
    'Authorization': '',
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  }
});

export default api;

//teste123@teste.com123
//125832