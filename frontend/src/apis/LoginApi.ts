import { BaseRoot } from './BaseRoot';
import axios from 'axios'
export const LoginApi = (id: string, password: string) => {
	return axios.get(`${BaseRoot}/group/login/id/${id}/password/${password}`);
};

export const RegisterApi = (id: string, password: string) => {
	return axios.post(`${BaseRoot}/group/register/id/${id}/password/${password}`);
};
