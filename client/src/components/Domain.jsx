import React from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteDomainFailure,
  deleteDomainStart,
  deleteDomainSuccess,
} from "../redux/slices/domain.slice.js";
import { useDispatch, useSelector } from "react-redux";

const Domain = ({ domain }) => {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.domains);
  const dispatch = useDispatch();
  const { domainName, records } = domain;
  const domianId = domain._id;
  const handleDeleteDomain = async () => {
    try {
      dispatch(deleteDomainStart());
      const res = await fetch(`/api/domain/${domianId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteDomainFailure(data.message));
      }
      dispatch(deleteDomainSuccess(data));
    } catch (error) {
      dispatch(deleteDomainFailure(error.message));
      console.log(error);
    }
  };
  return (
    <div
      className={`domain-card bg-blue-50 rounded-lg shadow-md p-4 mb-4 h-fit `}
    >
      <h2 className={`domain-name text-xl font-bold mb-2 break-words`}>
        {domainName}
      </h2>
      {records && 
      <div className="records">
      <h3 className={`text-lg font-medium mb-2`}>Records:</h3>
      <ul className={`record-list list-disc pl-4`}>
        {records.map((record) => (
          <li
            key={record._id}
            className={`record-item py-2 border-b border-gray-200`}
          >
            <span className={`record-type font-bold inline-block mr-2`}>
              {record.recordType}:
            </span>
            <span className="record-value">{record.value}</span> (TTL:{" "}
            {record.TTL})
          </li>
        ))}
      </ul>
    </div>}
      
      <div className={`flex flex-row justify-evenly items-center`}>
        <button
          onClick={() => {
            navigate("/updatedomain");
          }}
        >
          Update
        </button>
        <button onClick={handleDeleteDomain}>Delete</button>
      </div>
    </div>
  );
};

export default Domain;
