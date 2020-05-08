import axios from 'axios'
import { Dispatch } from 'redux'
import Actions from '../redux/action/action'
const BaseApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
  })
  export interface ActivityReviewProps {
	description: string;
	score: number;
	studentId: string;
	type: string;
}
export interface ActivityProps {
	basicScore: number;
	description: string;
	groupId: string;
	id: string;
	location: string;
	name: string;
	reviews: ActivityReviewProps[];
	status: string;
	studentIDs: string[];
	time: string;
	type: string;
}
export interface OrgPassProps {
	groupTableDetails:ActivityProps[]
}
const InformationApis = {
  getPass: () => async (
    dispatch: Dispatch
  ): Promise<void> => {
	const response = await BaseApi.get('/org/getTable')
    dispatch(Actions.orgGetPass(response.data))
  },
  approve: (id:string) => async (
    dispatch: Dispatch
  ): Promise<void> => {
	const response = await BaseApi.post(`/org/approve/id/${id}`)
    dispatch(Actions.orgApprove(response.data))
  },
  rollback: (id:string) => async (
    dispatch: Dispatch
  ): Promise<void> => {
	const response = await BaseApi.post(`/org/rollback/id/${id}`)
    dispatch(Actions.orgApprove(response.data))
  },
  getReview: () => async (
    dispatch: Dispatch
  ): Promise<void> => {
	const response = await BaseApi.get('/org/getTableForReview')
    dispatch(Actions.orgGetPass(response.data))
  },
  postReview: (data:any) => async (
    dispatch: Dispatch
  ): Promise<void> => {
	const response = await BaseApi.post('/org/writeReview',data)
    dispatch(Actions.orgApprove(response.data))
  },
}

export default InformationApis
