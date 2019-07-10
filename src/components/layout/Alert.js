import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alert !== null && (
      <div className={`alert alert-${alertContext.alert.style}`}>
        <i className='fas fa-info-circle' /> {alertContext.alert.msg}
      </div>
    )
  );
};

export default Alert;
