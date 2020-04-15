import React, { useState, useEffect } from 'react';

function DogsAPI() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setdata(result.message);
        },
        (error) => {  // Note: it's important to handle errors here instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])   // Note: the empty deps array [] means this useEffect will run once similar to componentDidMount()

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
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

export default DogsAPI;
