import React, { useEffect, useState } from "react";
import Domain from "./Domain";
import {
  fetchDomainsStart,
  fetchDomainsFailure,
  fetchDomainsSuccess,
} from "../redux/slices/domain.slice.js";
import { useDispatch, useSelector } from "react-redux";

const Domains = () => {
//   const [domains, setDomains] = useState([]); 
  const { currentUser } = useSelector((state) => state.user);

  const { loading, error, domains } = useSelector((state) => state.domains);
  const dispach = useDispatch();
  useEffect(() => {
    const getDomains = async () => {
      dispach(fetchDomainsStart());
      try {
        const res = await fetch("/api/domain");
        const data = await res.json();
        if (data.success === false) {
          dispach(fetchDomainsFailure(data.message));
          return;
        }
        // console.log('Fetched domains:', data);
        dispach(fetchDomainsSuccess(data));
      } catch (err) {
        dispach(fetchDomainsFailure(err));
      } 
    };
    getDomains();
  }, []);
  return (
    <>
      <div>Domains</div>
      {domains && (
      <div className="flex justify-evenly items-center flex-wrap">
        {domains.map((domainItem) => (
          <Domain key={domainItem._id} domain={domainItem} />
        ))}
      </div>
    )}
    </>
  );
};

export default Domains;
