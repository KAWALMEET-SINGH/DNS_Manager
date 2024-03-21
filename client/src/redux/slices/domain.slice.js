import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  domains: [],
  error: null,
  loading: false,
};

const domainSlice = createSlice({
  name: "domains",
  initialState,
  reducers: {
    fetchDomainsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDomainsSuccess: (state, action) => {
      // console.log('Updating state with domains:', action.payload);
      state.domains = action.payload;
      state.loading = false;
    },
    fetchDomainsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addDomainStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addDomainSuccess: (state, action) => {
      state.domains.push(action.payload);
      state.loading = false;
    },
    addDomainFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteDomainStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteDomainSuccess: (state, action) => {
      const deletedDomainId = action.payload;
      const domainIndex = state.domains.findIndex(
        (domain) => domain._id === deletedDomainId
      );
      if (domainIndex !== -1) {
        state.domains.splice(domainIndex, 1);
      }
      state.loading = false;
    },
    deleteDomainFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateDomainStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateDomainSuccess: (state, action) => {
      const updatedDomain = action.payload;
      const domainIndex = state.domains.findIndex(
        (domain) => domain._id === updatedDomain._id
      );
      if (domainIndex !== -1) {
        state.domains[domainIndex] = updatedDomain;
      }
      state.loading = false;
    },
    updateDomainFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchDomainsStart,
  fetchDomainsSuccess,
  fetchDomainsFailure,
  addDomainStart,
  addDomainSuccess,
  addDomainFailure,
  deleteDomainFailure,
  deleteDomainStart,
  deleteDomainSuccess,
  updateDomainFailure,
  updateDomainStart,
  updateDomainSuccess,
} = domainSlice.actions;

export default domainSlice.reducer;
