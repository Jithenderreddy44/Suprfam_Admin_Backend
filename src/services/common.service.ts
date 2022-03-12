import axios from 'axios';

// creates short link from long link
export const createShortLink =  (link:string):Promise<any> =>
{
    return new Promise((resolve,reject) =>
    {
        axios({
            method: 'POST',
            url: 'https://url-shortener-service.p.rapidapi.com/shorten',
            headers: {
              'content-type': 'application/json',
              'x-rapidapi-host': 'url-shortener-service.p.rapidapi.com',
              'x-rapidapi-key': '58c87e6501msh1f7270322156a5fp1b72e9jsne9ac9bbb8660',
            },
            data:{ "url": link}
          })
          .then((data:any) =>
           {
              resolve(data.data)
           })
        .catch((e) =>
        {
           reject(e);
        })
    })
    
};

