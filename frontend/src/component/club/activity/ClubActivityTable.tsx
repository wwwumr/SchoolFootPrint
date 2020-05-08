import React from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ActivityTableProps, ActivityProps } from '../../../apis/ActivityApi';
import { AppState } from '../../../redux/reducer/reducer';
import { Dispatch } from 'redux';
import Actions from '../../../redux/action/action';
import { connect } from 'react-redux';

interface StateProps {
	activities: ActivityTableProps;
	setActivity: (activities: ActivityProps) => void;
}

const mapStateToProps = (state: AppState) => ({
	activities: state.TmpReducer.activities,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		setActivity: (activity: ActivityProps) => {
			dispatch(Actions.setActivity(activity));
		},
	};
};

interface ComponentProps {
	type: string;
}

type Props = StateProps & ComponentProps;

const ClubActivityReview = (props: Props) => {
	const { activities, setActivity, type } = props;
	const [data, setData] = React.useState<ActivityProps[]>([]);

	React.useEffect(() => {
		switch (type) {
			case '0': {
				setData(activities.activitiesToReview.groupTableDetails);
				break;
			}
			case '1': {
				setData(activities.activitiesNotApproved.groupTableDetails);
				break;
			}
			case '2': {
				setData(activities.activitiesApproved.groupTableDetails);
				break;
			}
			case '3': {
				setData(activities.activitiesNotCounted.groupTableDetails);
				break;
			}
			case '4': {
				setData(activities.activitiesCounted.groupTableDetails);
				break;
			}
			case '5': {
				setData(activities.activitiesRecorded.groupTableDetails);
				break;
			}
			default: {
				break;
			}
		}
	}, [activities, type]);

	const columns = [
		{
			title: '活动名称',
			dataIndex: 'name',
			key: '0',
		},
		{
			title: '活动类型',
			dataIndex: 'type',
			key: '1',
		},
		{
			title: '活动时间',
			dataIndex: 'time',
			key: '2',
		},
		{
			title: '活动地点',
			dataIndex: 'location',
			key: '3',
		},
		{
			title: '活动描述',
			dataIndex: 'description',
			key: '4',
		},
		{
			title: '活动详情',
			dataIndex: 'id',
			key: '5',
			render: (id: number, row: ActivityProps) => (
				<React.Fragment>
					<Button
						onClick={() => {
							setActivity(row);
						}}
					>
						<Link to={`/activity/detail`}>查看详情</Link>
					</Button>
					<Button
						onClick={() => {
							setActivity(row);
						}}
						disabled={['未计分', '已计分', '已认证'].indexOf(row.status) < 0}
					>
						<Link to={`/activity/marks`}>查看分数</Link>
					</Button>
				</React.Fragment>
			),
		},
	];

	return (
		<React.Fragment>
			<Table rowKey={'id'} dataSource={data} columns={columns} />
		</React.Fragment>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ClubActivityReview);
