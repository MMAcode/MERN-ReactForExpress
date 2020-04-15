import React from 'react';
import CatsAPI from './Cats';
import styled from 'styled-components';

export const Note = styled.p`
color: blue;
font-style:italic;
font-size:0.8rem;

`;
const CatsFrame = () => {
  return (
    <div>
      <h3>Cats API (CORS: no)</h3>
      <Note>note</Note>
      <CatsAPI />
    </div>
  );
};

export default CatsFrame;