import React from 'react';
import styled from 'styled-components';
import SortableGallery from './SortableGallery'
// import SortableGallery2 from './SortableGallery2' //only works with vertical sorting
const SPlaygroundWrapper = styled.div`
text-align: center;
`
function Playground() {
  return (
    <SPlaygroundWrapper>
      <h1>My React Playground</h1>
      {/* <div>{pictures.map(picture => <Simg src={picture} alt=""></Simg>)}</div>  */}
      <SortableGallery />
      {/* <SortableGallery2 /> */}
    </SPlaygroundWrapper>
  );
}

export default Playground;