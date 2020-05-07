import { BaseRoot } from './BaseRoot';
import axios from 'axios';
import { store } from '../redux/store/store';
import Actions from '../redux/action/action';

export interface NewActivityProps {
	basicScore: number;
	description: string;
	location: string;
	name: string;
	time: Date;
	type: string;
}

export const CreateActivityApi = (id: string, activity: NewActivityProps) => {
	return axios.post(`${BaseRoot}/group/startActivity/id/${id}`, activity);
};

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

export interface ActivityTableProps {
	activitiesApproved: {
		groupTableDetails: ActivityProps[];
	};
	activitiesCounted: {
		groupTableDetails: ActivityProps[];
	};
	activitiesNotApproved: {
		groupTableDetails: ActivityProps[];
	};
	activitiesNotCounted: {
		groupTableDetails: ActivityProps[];
	};
	activitiesRecorded: {
		groupTableDetails: ActivityProps[];
	};
}

export const GetActivities = (clubId: string) => {
  axios.get(`${BaseRoot}/group/getTable/id/${clubId}`)
  .then((res)=> {
    const data = res.data as ActivityTableProps
    store.dispatch(Actions.setActivities(data))
  })
};

export const getRandomCode = (activityId: string) => {
	return axios.get(`${BaseRoot}/group/getCode/id/${activityId}`);
};
