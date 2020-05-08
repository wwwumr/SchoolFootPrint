import { ActivityTableProps, ActivityProps } from './../../apis/ActivityApi';
import { AnyAction } from 'redux';
import { UserProps, intialStoreState } from '../reducer/reducer';
import {OrgPassProps} from './../../apis/OrgApis'
export enum ActionTypes {
	SET_USER = 'SET_USER',
	LOGOUT = 'LOGOUT',
	SET_ACTIVITY = 'SET_ACTIVITY',
	SET_ACTIVITIES = 'SET_ACTIVITIES',
	ORG_GET_PASS = 'ORG_GET_PASS',
	ORG_APPROVE = 'ORG_APPROVE',
}

export enum Role {
	CERTIFICATION_BODY,
	CLUB,
	UNDEFINED,
}

const Actions = {
	setUser: (user: UserProps): AnyAction => {
		return {
			type: ActionTypes.SET_USER,
			payload: {
				user: user,
			},
		};
	},
	logOut: (): AnyAction => {
		return {
			type: ActionTypes.LOGOUT,
			payload: {
				state: intialStoreState,
			},
		};
	},
	setActivity: (activity: ActivityProps): AnyAction => {
		return {
			type: ActionTypes.SET_ACTIVITY,
			payload: {
				activity: activity,
			},
		};
	},
	setActivities: (activities: ActivityTableProps): AnyAction => {
		return {
			type: ActionTypes.SET_ACTIVITIES,
			payload: {
				activities: activities,
			},
		};
	},
	orgGetPass: (orgpass: OrgPassProps): AnyAction => {
		return {
			type: ActionTypes.ORG_GET_PASS,
			payload: {
			orgpass	: orgpass,
			},
		};
	},
	orgApprove: (apis: boolean): AnyAction => {
		return {
			type: ActionTypes.ORG_APPROVE,
			payload: {
			apis	: apis,
			},
		};
	},
};

export default Actions;
