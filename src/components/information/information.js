import React, { useState } from 'react';
import Navbar from '../general/navbar';
import Aguinaldo from '../general/information/aguinaldo'
import PrimaVacacional from '../general/information/primaVacacional'
import Bonos from '../general/information/bonos'
import Vacaciones from '../general/information/vacaciones'
import VacacionesMatrimonio from '../general/information/vacacionesMatrimonio'
import Imss from '../general/information/imss'
import Home from '../home/home';
import Afore from '../general/information/afore'
import LicenciaMaternidad from '../general/information/licenciaMaternidad'
import CreateSchedule from '../createSchedule/createSchedule';

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
          {activeTab === 'tab1' && <CreateSchedule />}
          {activeTab === 'tab2' && <PrimaVacacional />}
          {activeTab === 'tab4' && <Bonos />}
          {activeTab === 'tab5' && <Vacaciones />}
          {activeTab === 'tab6' && <VacacionesMatrimonio />}
          {activeTab === 'tab7' && <Home />}
          {activeTab === 'tab8' && <Afore />}
          {activeTab === 'tab9' && <LicenciaMaternidad />}
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
    color:"#fff",
    paddingTop:"20px"
  },
  tab: {
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#000',
  },
  activeTab: {
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#8bc34a',
    
    color: 'white',
  },
  content: {
    flex: 1,
    padding: '20px',
  },
};

