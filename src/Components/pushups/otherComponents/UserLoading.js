import React from 'react';

const UserLoading = ({ error }) => {

  if (error) return (
    <div id='userLoadingComponent'>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexFlow: 'column',
        height: '100%',
        color: 'red'
      }}>
        <p>Error encountered.</p>
        <br />
        <p>{JSON.stringify(error)}</p>
        <br />
        <br />
        <p>(Internet is required for app to work.)</p>
      </div>
    </div>
  );

  return (
    <div id='userLoadingComponent' style={{zIndex:'1000'}}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexFlow: 'column',
        height: '100%',
        color: 'red'
      }}>
        <p>Loading</p>
        <p>data...</p>
        <br />
        <br />
        <br />
        <br />
        <p>(Internet is required for app to work.)</p>
      </div>
    </div>
  );
};

export default UserLoading;