import React, { useState } from 'react';
import { addDomainStart, addDomainSuccess, addDomainFailure } from '../redux/slices/domain.slice.js';
import {
    fetchDomainsStart,
    fetchDomainsFailure,
    fetchDomainsSuccess,
  } from "../redux/slices/domain.slice.js";
  import { useDispatch, useSelector } from "react-redux";
const AddDomain = () => {
  const [domainName, setDomainName] = useState('');
  const [records, setRecords] = useState([]);
  const dispatch = useDispatch();
  const getDomains = async () => {
    dispatch(fetchDomainsStart());
    try {
      const res = await fetch("/api/domain");
      const data = await res.json();
      if (data.success === false) {
        dispatch(fetchDomainsFailure(data.message));
        return;
      }
      // console.log('Fetched domains:', data);
      dispatch(fetchDomainsSuccess(data));
    } catch (err) {
        dispatch(fetchDomainsFailure(err));
    } 
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation (optional)
    if (!domainName) {
      alert('Please enter a domain name.');
      return;
    }

    try {
      dispatch(addDomainStart());
      const res = await fetch('/api/domain/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domainName, records }),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(addDomainFailure(data.message));
        return;
      }

      dispatch(addDomainSuccess(data));
      setDomainName('');
      setRecords([]);
    } catch (error) {
      dispatch(addDomainFailure(error.message));
      console.error(error);
    }finally{
        getDomains();
    }
  };

  const handleRecordChange = (index, key, value) => {
    setRecords(prevRecords =>
      prevRecords.map((record, i) => (i === index ? { ...record, [key]: value } : record))
    );
  };

  const addRecord = () => {
    setRecords([...records, { recordType: '', value: '' }]);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col border border-blue-200 rounded-md p-4 mb-4`}>
      <label htmlFor="domainName" className={`font-bold mb-2`}>
        Domain Name:
      </label>
      <input
        type="text"
        id="domainName"
        name="domainName"
        value={domainName}
        onChange={(e) => setDomainName(e.target.value)}
        className={`border border-blue-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {records.map((record, index) => (
        <div key={index} className={`flex flex-row m-2 justify-evenly items-center`}>
         <div> <label htmlFor={`recordType-${index}`} className={`font-bold mb-1`}>
            Record Type:
          </label>
          <input
            type="text"
            id={`recordType-${index}`}
            name={`recordType-${index}`}
            value={record.recordType}
            onChange={(e) => handleRecordChange(index, 'recordType', e.target.value)}
            className={`border border-blue-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            
          /></div>
          <div>
          <label htmlFor={`recordValue-${index}`} className="font-bold mb-1">
            Record Value:
          </label>
          <input
            type="text"
            id={`recordValue-${index}`}
            name={`recordValue-${index}`}
            value={record.value}
            onChange={(e) => handleRecordChange(index, 'value', e.target.value)}
            className={`border border-blue-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          /></div>
        </div>
      ))}
<div className={`flex flex-row justify-around items-center m-2`}>
      <button type="button" onClick={addRecord} className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2`}>
        Add Record
      </button>

      <button type="submit" className={`bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}>
        Add Domain
     
      </button>
      </div>
      </form>
  )}
  export default AddDomain
