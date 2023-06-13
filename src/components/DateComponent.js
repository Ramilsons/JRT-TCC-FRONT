import React, { useState, useEffect } from 'react';
import moment from 'moment';

const DateComponent = () => {
  const [dateInsert, setDateInsert] = useState('');

  useEffect(() => {
    
    const databaseDate = "2023-06-12";

    
    const formattedDate = formatDateToAmerican(databaseDate);

    
    setDateInsert(formattedDate);
  }, []);

  const formatDateToAmerican = (dateString) => {
  
    const databaseDateFormat = "YYYY-MM-DD";

   
    const americanDateFormat = "MM/DD/YYYY";

   
    const formattedDate = moment(dateString, databaseDateFormat).format(americanDateFormat);

    return formattedDate;
  };

  return (
    <div>
      <p>{props.dateInsert}</p>
    </div>
  );
};

export default DateComponent;