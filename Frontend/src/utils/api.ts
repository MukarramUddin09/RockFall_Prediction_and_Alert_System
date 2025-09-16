import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update if deployed
});

export const signupUser = (data: { name: string; email: string; password: string }) =>
  API.post("/auth/signup", data);

export const loginUser = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const requestPasswordReset = (data: { email: string }) =>
  API.post("/auth/forgot-password", data);
