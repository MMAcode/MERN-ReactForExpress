import React, { useState } from 'react';
// import { render } from 'react-dom';
import styled from 'styled-components';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
// const arrayMove = require('array-move');

const SGalleryWrapper = styled.div`
margin:10px 40px;
text-align: center;
background-color: lightgrey;
@media(max-width: 400px) { 
  margin:3px;
}
`
const Simg = styled.img`
width:200px;
max-width:25%;
margin: 10px;
background: linear-gradient(  rgba(0,0,0,0),white);
/* background-color:white; */
`


const Image = props =>
  // <div>
    <Simg src={props.imageUrl} alt=""></Simg>
  // </div>

const SortableSingleImageContainer = SortableElement(props => <Image imageUrl={props.imageUrl}></Image>)


const SortableImagesContainer = SortableContainer(props =>
  <div>
    {props.imagesUrls.map((imageUrl, index) =>
      <SortableSingleImageContainer key={imageUrl} index={index} imageUrl={imageUrl}></SortableSingleImageContainer>)}
  </div>)


const SortableGallery = () => {
  const returnPicturesArray = (numberOfPictures) => {
    const picturesArray = [];
    for (let i = 1; i <= numberOfPictures; i++) {
      picturesArray.push(`https://robohash.org/${i}`);
    };
    return picturesArray;
  }
  const [pictures, setPictures] = useState(returnPicturesArray(10));


  const onSortEndF = ({ oldIndex, newIndex }) => {
    console.log("on sort end fired");
    let newArray = arrayMove(pictures, oldIndex, newIndex);
    setPictures(newArray);
  };


  return (
    <SGalleryWrapper>
      <h2>Sortable gallery</h2>
      {/* <div>{pictures.map(picture => <Simg src={picture} alt=""></Simg>)}</div> */}
      <SortableImagesContainer imagesUrls={pictures} onSortEnd={onSortEndF} axis='xy'></SortableImagesContainer>
    </SGalleryWrapper>
  );
};

export default SortableGallery;