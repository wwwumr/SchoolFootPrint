import { ActivityTableProps } from './../../apis/ActivityApi';
import { AnyAction } from 'redux';
import { ActionTypes, Role } from './../action/action';

export interface UserProps {
	userId: string;
	role: Role;
}

export interface AppState {
	user: UserProps;
	activityId: string;
	activities: ActivityTableProps;
}

export const intialStoreState: AppState = {
	user: {
		userId: '',
		role: Role.UNDEFINED,
	},
	activityId: '',
	activities: {
		activitiesApproved: {
			groupTableDetails: [],
		},
		activitiesCounted: {
			groupTableDetails: [],
		},
		activitiesNotApproved: {
			groupTableDetails: [],
		},
		activitiesNotCounted: {
			groupTableDetails: [],
		},
		activitiesRecorded: {
			groupTableDetails: [],
		},
	},
};

export const AppReducer = (
	state = intialStoreState,
	action: AnyAction
): AppState => {
	switch (action.type) {
		case ActionTypes.SET_USER: {
			return {
				...state,
				user: action.payload.user,
			};
		}
		case ActionTypes.LOGOUT: {
			return { ...intialStoreState };
		}
		case ActionTypes.SET_ACTIVITY_ID: {
			return {
				...state,
				activityId: action.paload.activityId,
			};
		}
		case ActionTypes.SET_ACTIVITIES: {
			return {
				...state,
				activities: action.paload.activities,
			};
		}
		default:
			return state;
	}
};
