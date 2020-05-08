import { BaseRoot } from './BaseRoot';
import axios from 'axios';

export interface NewActivityProps {
	basicScore: number;
	description: string;
	location: string;
	name: string;
	time: string;
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

export interface MarksReviewProps {
	description: string;
	score: number;
	studentId: string;
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
	activitiesToReview: {
		groupTableDetails: ActivityProps[];
	};
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
	return axios.get(`${BaseRoot}/group/getTable/id/${clubId}`);
};

export const getRandomCode = (activityId: string) => {
	return axios.get(`${BaseRoot}/group/getCode/id/${activityId}`);
};

interface ReviewProps {
	activityID: string;
	description: string;
	score: number;
	studentId: string;
}

export const SubmitReview = (
	activityId: string,
	reviews: MarksReviewProps[]
) => {
	const reviewsDto: ReviewProps[] = [];
	reviews.forEach((element) => {
		reviewsDto.push({
			...element,
			activityID: activityId,
		});
	});
	return axios.post(`${BaseRoot}/group/writeReview`, reviewsDto);
};

export const SubmitMarks = (activityId: string) => {
	return axios.post(
		`${BaseRoot}/group/submitAllReview/activityId/${activityId}`
	);
};
