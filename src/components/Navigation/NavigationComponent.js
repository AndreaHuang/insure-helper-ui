import React from 'react';

const Navigation = ({ onRouteChange}) => {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('irr-calculation')} className='f3 link dim black underline pa3 pointer'>IRR</p>
          <p onClick={() => onRouteChange('ci-rate')} className='f3 link dim black underline pa3 pointer'>CI Rate</p>
          <p onClick={() => onRouteChange('med-uw')} className='f3 link dim black underline pa3 pointer'>Medical Underwriting</p>
        </nav>
      );
};

export default Navigation;