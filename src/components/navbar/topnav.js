import React from 'react';

const TopNav = ({ profileName }) => {
  return (
    <div style={styles.topnav}>
      <div style={styles.logo}>Logo</div>
      <div style={styles.profileName}>{profileName}</div>
    </div>
  );
};

const styles = {
  topnav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px',
    width: '100%',
    backgroundColor: '#333',
    color: 'white',
    padding: '0 20px',
  },
  logo: {
    fontWeight: 'bold',
  },
  profileName: {
    fontStyle: 'italic',
  },
};

export default TopNav;
