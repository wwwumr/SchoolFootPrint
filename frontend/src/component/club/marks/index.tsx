import React from 'react';
import { ActivityProps } from '../../../apis/ActivityApi';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducer/reducer';
import ClubMarksReview from './ClubMarksReview';
import ClubMarksHistory from './MarksHistory';

interface StateProps {
	activity: ActivityProps;
}

const mapStateToProps = (state: AppState) => ({
	activity: state.PersistedReducer.activity,
});

const ClubActivitiyMarks = (props: StateProps) => {
	const { activity } = props;

	return (
		<React.Fragment>
			{activity.status === '未计分' && (
				<React.Fragment>
					<ClubMarksReview />
				</React.Fragment>
			)}
			{(activity.status === '已认证' || activity.status === '已计分') && (
				<React.Fragment>
					<ClubMarksHistory />
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default connect(mapStateToProps)(ClubActivitiyMarks);
