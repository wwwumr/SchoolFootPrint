import React from 'react';
import { Table } from 'antd';
import { MarksReviewProps, ActivityProps } from '../../../apis/ActivityApi';
import { AppState } from '../../../redux/reducer/reducer';
import { connect } from 'react-redux';

type Item = MarksReviewProps;

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

	return (
		<React.Fragment>
			<Table
				bordered
				rowKey='id'
				dataSource={activity.reviews}
				columns={columns}
			/>
		</React.Fragment>
	);
};

export default connect(mapStateToProps)(ClubMarksHistory);
