import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    requests: [],
};

export const requestsSlice = createSlice({
    name: "requests",
    initialState,
    reducers: {
        setRequests: (state, action) =>{
            state.requests = action.payload.requests;
        },

        createRequest: (state, action) => {
            state.requests.push(action.payload.request);
        },

        deleteRequest: (state, action) => {
            state.requests = state.requests.filter(request => request.id !== action.payload.requestId);
        },

        setRequestStatus: (state, action) => {
            const {requestId, newStatus} = action.payload;
            const requestToUpdate = state.request.find(request => request.id === requestId);
            if(requestToUpdate) {
                requestToUpdate.status = newStatus;
            } else {
                console.error(`Request with id ${requestId} not found.`)
            }
        }
    }
});

export const {setRequests, createRequest, deleteRequest, setRequestStatus} = requestsSlice.actions;
export default requestsSlice.reducer;