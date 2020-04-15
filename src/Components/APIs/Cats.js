import React, { useState, useEffect } from 'react';


function CatsAPI() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setdata] = useState([]);

  useEffect(() => {
    // console.log("use effect runing");
    fetch("https://cat-fact.herokuapp.com/facts")

    // fetch("https://dog.ceo/api/breeds/image/random")
      .then(res => res.json())
      .then(
        (result) => {
          // console.log("we got response");
          // console.log(result);
          setIsLoaded(true);
          setdata(result);
        },
        (error) => {  // Note: it's important to handle errors here instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
          // console.log("we got error");
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])   // Note: the empty deps array [] means this useEffect will run once similar to componentDidMount()

  // console.log("000");
  if (error) {
    // console.log(("1"));
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    // console.log(("2"));
    return <div>Loading...</div>;
  } else {
    // console.log(("3"));
    // console.log(data);

    return (
      <>
        <div>{data}</div>
        {/* <ul> */}

        {/* {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li> */}
        {/* ))} */}
        {/* </ul> */}
      </>
    );
  }

}

export default CatsAPI;
