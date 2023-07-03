import React from 'react';

const PrimaVacacional = () => {
  return (
    <div style={styles.container}>
      <img src={process.env.PUBLIC_URL +"/primaVacacional.png"} alt="Imagen" style={styles.image} />
      <h1 style={styles.title}>Prima vacacional</h1>
      <p style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque augue eget leo lobortis, sit amet
        condimentum enim laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
        curae; Integer sagittis leo ut dapibus laoreet. Quisque vel est nec nulla tincidunt ultrices non ut lectus.
        Nulla pharetra consequat libero, et tincidunt dolor iaculis sed. Suspendisse lobortis velit vitae vestibulum
        consequat. Proin ullamcorper interdum nunc ac consequat. Aliquam id tincidunt nunc. Curabitur auctor, justo eu
        volutpat cursus, mi sem condimentum augue, sed lacinia mauris velit at dui. Duis interdum, velit ut dignissim
        pharetra, velit quam pretium mauris, ac dapibus enim ante non nunc. Aliquam cursus est eu feugiat dictum.
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  image: {
    width: '500px',
    height: '350px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  text: {
    fontSize: '16px',
    lineHeight: '1.5',
  },
}

export default PrimaVacacional;