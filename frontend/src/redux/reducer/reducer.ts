import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { ActivityTableProps, ActivityProps } from './../../apis/ActivityApi';
import { AnyAction, combineReducers } from 'redux';
import { ActionTypes, Role } from './../action/action';
import { OrgPassProps } from './../../apis/OrgApis';
export interface UserProps {
	userId: string;
	role: Role;
}

export interface AppState {
	PersistedReducer: {
		user: UserProps;
		activity: ActivityProps;
		orgpass: OrgPassProps;
		apis: Boolean;
	};
	TmpReducer: {
		activities: ActivityTableProps;
	};
}

export const intialStoreState: AppState = {
	PersistedReducer: {
		user: {
			userId: '',
			role: Role.UNDEFINED,
		},
		activity: {
			basicScore: 0,
			description: '',
			groupId: '',
			id: '',
			location: '',
			name: '',
			reviews: [],
			status: '',
			studentIDs: [],
			time: '',
			type: '',
		},
		orgpass: { groupTableDetails: [] },
		apis: false,
	},
	TmpReducer: {
		activities: {
			activitiesToReview: {
				groupTableDetails: [],
			},
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
	},
};

interface PersistedReducerProps {
	user: UserProps;
	activity: ActivityProps;
	orgpass: OrgPassProps;
	apis: Boolean;
}

const FirstReducer = (
	state = intialStoreState.PersistedReducer,
	action: AnyAction
): PersistedReducerProps => {
	switch (action.type) {
		case ActionTypes.SET_USER: {
			return {
				...state,
				user: action.payload.user,
			};
		}
		case ActionTypes.LOGOUT: {
			return { ...intialStoreState.PersistedReducer };
		}
		case ActionTypes.SET_ACTIVITY: {
			return {
				...state,
				activity: action.payload.activity,
			};
		}
		case ActionTypes.ORG_GET_PASS: {
			return {
				...state,

				orgpass: action.payload.orgpass,
			};
		}
		case ActionTypes.ORG_APPROVE: {
			return {
				...state,
				apis: action.payload.apis,
			};
		}
		default:
			return state;
	}
};

export interface TmpReducerProps {
	activities: ActivityTableProps;
}

const TmpReducer = (
	state = intialStoreState.TmpReducer,
	action: AnyAction
): TmpReducerProps => {
	switch (action.type) {
		case ActionTypes.SET_ACTIVITIES: {
			return {
				...state,
				activities: action.payload.activities,
			};
		}

		default:
			return state;
	}
};

/* Main Reducer */
export const AppReducer = combineReducers({
	PersistedReducer: persistReducer(
		{
			key: 'School Footprint',
			storage,
		},
		FirstReducer
	),
	TmpReducer,
});
