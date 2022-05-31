import axios from 'axios';
import md5 from 'md5';

//These api keys will be deleted soon
const publickey = 'b97b93d96f81fd5e16b3787a5684990f';
const privateKey = 'f8b7cadcfcfbef2e0cb258925b9c1268dba5a1bd';

const ts = Number(new Date());

const hash = md5(ts + privateKey + publickey);

const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  params: {
    ts,
    apikey: publickey,
    hash,
  },
});

export default api;