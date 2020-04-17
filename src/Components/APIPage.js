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
const SFrame = styled.div`
>*{
background-color: lightgreen;
min-height:100px;
min-width:300px;
margin:10px;
}
`;


function APIPage() {
  const urlRoot = 'https://mern-express-heroku.herokuapp.com/api';
  // const urlRoot = 'http://localhost:3001/api';
  return (
    <>
      <h2>This is API page.</h2>
      <SFrame>
        {/* <CatsFrame /> */}
        <DogsFrame />
        <APITemplate url={urlRoot+'/json'} title='test of simple local API from Express'/>
        <APITemplate url={urlRoot+'/json/cats'} title='cats from Remote API using CORS'/>
        {/* <APITemplate url='/api/send' /> */}
        {/* <APITemplate url='/api/write' /> */}


      </SFrame>
    </>
  );
}

export default APIPage;