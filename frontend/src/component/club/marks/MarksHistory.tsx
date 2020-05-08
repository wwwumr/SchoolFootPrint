import React from 'react';
import { Table } from 'antd';
import { ActivityProps } from '../../../apis/ActivityApi';
import { AppState } from '../../../redux/reducer/reducer';
import { connect } from 'react-redux';

interface StateProps {
	activity: ActivityProps;
}

const mapStateToProps = (state: AppState) => ({
	activity: state.PersistedReducer.activity,
});

const ClubMarksHistory = (props: StateProps) => {
	const { activity } = props;

	const columns = [
		{
			title: '学生学号',
			dataIndex: 'studentId',
			width: '10%',
		},
		{
			title: '学生得分',
			dataIndex: 'score',
			width: '10%',
		},
		{
			title: '评语',
			dataIndex: 'description',
			width: '80%',
		},
	];
	React.useEffect(() => {
		console.log(activity);
	}, [activity]);

	return (
		<React.Fragment>
			<Table
				bordered
				rowKey='studentId'
				dataSource={activity.reviews}
				columns={columns}
			/>
		</React.Fragment>
	);
};

export default connect(mapStateToProps)(ClubMarksHistory);
