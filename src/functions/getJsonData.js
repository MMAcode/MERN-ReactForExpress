async function getJsonData(url,options) {
  let dataToReturn;
  console.log("starting GET json request 1 using this url and options: ",url,options);
  try {
    // options.credentials = 'include';
    const response = await fetch(url, options);
    // const response = await fetch(url, {credentials:'include'});
    // console.log("fetched response:", response);
    console.log("starting GET json request 2a-succes-received data: ", dataToReturn);

    dataToReturn = await response.json(); // parses JSON response into native JavaScript objects
    console.log("starting GET json request 2b-succes-processed data: ", dataToReturn);

  }
  catch (err) {
    console.log("!!!err in receiving json data back from POSTJson request", err);
    // console.log("starting GET json request 2-error-message: ", err);

    dataToReturn = err;
  }
  // return dataToReturn;
}

export default getJsonData;