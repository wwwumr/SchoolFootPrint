import React from 'react';
import { Tabs } from 'antd';
import { ActivityTableProps, GetActivities } from '../../../apis/ActivityApi';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducer/reducer';
import Actions from '../../../redux/action/action';
import { Dispatch } from 'redux';
import ClubActivityReview from './ClubActivityTable';

interface StateProps {
	activities: ActivityTableProps;
	userId: string;
	setActivities: (activities: ActivityTableProps) => void;
}

const mapStateToProps = (state: AppState) => ({
	activities: state.TmpReducer.activities,
	userId: state.PersistedReducer.user.userId,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		setActivities: (activities: ActivityTableProps) => {
			dispatch(Actions.setActivities(activities));
		},
	};
};

const ClubActivities = (props: StateProps) => {
	const { userId, setActivities } = props;

	React.useEffect(() => {
		GetActivities(userId).then((res) => {
			const data = res.data as ActivityTableProps;
			setActivities(data);
		});
	}, [userId, setActivities]);

	const status = ['未审核', '未通过', '已通过', '未计分', '已计分', '已认证'];

	return (
		<React.Fragment>
			<Tabs
				defaultActiveKey='0'
				onChange={(key) => {
					console.log(key);
				}}
			>
				{status.map((elem, index) => (
					<Tabs.TabPane tab={elem} key={index.toString()}>
						<ClubActivityReview type={index.toString()} />
					</Tabs.TabPane>
				))}
			</Tabs>
		</React.Fragment>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ClubActivities);
