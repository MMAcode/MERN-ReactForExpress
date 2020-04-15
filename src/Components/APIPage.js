import React from 'react';
// import CatsFrame from './APIs/CatsFrame';
import DogsFrame from './APIs/DogsFrame';
import APITemplate from './APIs/APITemplate';
import styled from 'styled-components'



// const Block = styled(CatsAPI)`
// background-color: green !important;
// min-height:100px;
// min-width:300px;
// `;
const Frame = styled.div`
>*{
background-color: lightgreen;
min-height:100px;
min-width:300px;
margin:10px;
}
`;


function APIPage() {

  return (
    <>
      <h2>This is API page.</h2>
      <Frame>
        {/* <CatsFrame /> */}
        <DogsFrame />
        <APITemplate url='https://mern-express-heroku.herokuapp.com/api/json' title='test of simple local API from Express'/>
        <APITemplate url='https://mern-express-heroku.herokuapp.com/api/json/cats' title='cats from Remote API using CORS'/>
        {/* <APITemplate url='/api/send' /> */}
        {/* <APITemplate url='/api/write' /> */}


      </Frame>
    </>
  );
}

export default APIPage;