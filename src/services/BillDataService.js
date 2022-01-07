import http from "../http-common";

class BillDataService {
  getAll() {
    return http.get("/bills");
  }

  get(id) {
    return http.get(`/bills/${id}`);
  }

  create(data) {
    return http.post("/bills", data);
  }

  update(id, data) {
    return http.post(`/bills/update/${id}`, data);
  }
  findByStatus(status) {
    return http.get(`/filter/bills?status=${status}`);
  }
}

export default new BillDataService();
