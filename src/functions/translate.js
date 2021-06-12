import { urlRoot } from '../globalState/globalVariables';

let translate = async (from, to, textToTranslate) => {

  async function postJsonData(url, data) {//object  
    const options = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
    const response = await fetch(url, options);
    console.log("1.Fetch res in translate:", response);
    return await response.json(); // parses JSON response into native JavaScript objects
  }

  return await
    // postJsonData('http://localhost:3001/api/translate',
    // postJsonData('https://mern-express-heroku.herokuapp.com/api/translate',
    postJsonData(`${urlRoot}/translate`,
    {
      from,
      to,
      translate: textToTranslate,
    })
    .then((data) => {
      console.log("Data from server: ",data); // JSON data parsed by `response.json()` call
      // console.log(data.translated); // JSON data parsed by `response.json()` call
      return data;
    });
}

export default translate;