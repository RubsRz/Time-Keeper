import React, { useState } from 'react';
import Navbar from '../general/navbar';

function Information() {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.tabs}>
          <div
            style={activeTab === 'tab1' ? styles.activeTab : styles.tab}
            onClick={() => handleTabClick('tab1')}
          >
            Aguinaldo
          </div>
          <div
            style={activeTab === 'tab2' ? styles.activeTab : styles.tab}
            onClick={() => handleTabClick('tab2')}
          >
            Prima vacacional
          </div>
          <div
            style={activeTab === 'tab3' ? styles.activeTab : styles.tab}
            onClick={() => handleTabClick('tab3')}
          >
            Seguro médico
          </div>
          <div
            style={activeTab === 'tab4' ? styles.activeTab : styles.tab}
            onClick={() => handleTabClick('tab4')}
          >
            Bonos
          </div>
          <div
            style={activeTab === 'tab5' ? styles.activeTab : styles.tab}
            onClick={() => handleTabClick('tab5')}
          >
            Vacaciones
          </div>
          <div
            style={activeTab === 'tab6' ? styles.activeTab : styles.tab}
            onClick={() => handleTabClick('tab6')}
          >
            Vacaciones por matrimonio
          </div>
          <div
            style={activeTab === 'tab7' ? styles.activeTab : styles.tab}
            onClick={() => handleTabClick('tab7')}
          >
            IMSS
          </div>
          <div
            style={activeTab === 'tab8' ? styles.activeTab : styles.tab}
            onClick={() => handleTabClick('tab8')}
          >
            AFORE
          </div>
          <div
            style={activeTab === 'tab9' ? styles.activeTab : styles.tab}
            onClick={() => handleTabClick('tab9')}
          >
            Licencias de maternidad/paternidad
          </div>
        </div>
        <div style={styles.content}>
          {activeTab === 'tab1' && <p>Contenido de la pestaña 1</p>}
          {activeTab === 'tab2' && <p>Contenido de la pestaña 2</p>}
          {activeTab === 'tab3' && <p>Contenido de la pestaña 3</p>}
          {activeTab === 'tab4' && <p>Contenido de la pestaña 4</p>}
          {activeTab === 'tab5' && <p>Contenido de la pestaña 5</p>}
          {activeTab === 'tab6' && <p>Contenido de la pestaña 6</p>}
          {activeTab === 'tab7' && <p>Contenido de la pestaña 7</p>}
          {activeTab === 'tab8' && <p>Contenido de la pestaña 8</p>}
          {activeTab === 'tab9' && <p>Contenido de la pestaña 9</p>}
        </div>
      </div>
    </>
  );
}

export default Information;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  tabs: {
    width: '200px',
    backgroundColor: '#000',
    marginTop: '1px',
    padding: '20px 0',
  },
  tab: {
    padding: '10px',
    cursor: 'pointer',
    marginBottom: '5px',
    backgroundColor: 'white',
  },
  activeTab: {
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#8bc34a',
    marginBottom: '5px',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: '20px',
  },
};

