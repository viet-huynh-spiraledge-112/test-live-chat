import axiosClient from "./axiosClient";

const ticketApi = {
  getTickets: () => {
    return axiosClient.get("/data");
  },
  getPreviewList: () => {
    return axiosClient.get("/data/detail");
  },
};

export default ticketApi;