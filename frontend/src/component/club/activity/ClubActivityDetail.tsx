import React from 'react';
import { Card, Button, Descriptions, Typography, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { getRandomCode, ActivityProps } from '../../../apis/ActivityApi';
import { AppState } from '../../../redux/reducer/reducer';
import { connect } from 'react-redux';

const gridStyle: React.CSSProperties = {
	width: '50%',
	textAlign: 'center',
};

interface StateProps {
	activity: ActivityProps;
}

const mapStateToProps = (state: AppState) => ({
	activity: state.PersistedReducer.activity,
});

type Props = StateProps;

interface StatusActionProps {
	status: string;
	id: string;
}

const StatusAction = (props: StatusActionProps) => {
	const { status, id } = props;
	return (
		<React.Fragment>
			<Typography.Text>{`审核状态: ${status}`}</Typography.Text>
			{status === '已计分' && (
				<Button>
					<Link to={`/activity/marks/history/${id}`}>查看</Link>
				</Button>
			)}
			{status === '未计分' && (
				<Button>
					<Link to={`/activity/marks`}>登记分数</Link>
				</Button>
			)}
		</React.Fragment>
	);
};

const ClubActivityDeatil = (props: Props) => {
	const { activity } = props;

	const [sign, setSign] = React.useState<boolean>(false);
	const [randCode, setRandCode] = React.useState<string>('');

	return (
		<React.Fragment>
			<Card
				style={{ width: '80%', margin: '0 10%' }}
				actions={[
					<StatusAction status={activity.status} id={activity.id} />,
					<Button
						disabled={activity.status !== '未计分'}
						onClick={() => {
							getRandomCode('1').then((res) => {
								setRandCode(res.data);
								setSign(true);
							});
						}}
					>
						{'一键生成签到码'}
					</Button>,
				]}
			>
				<Card.Grid hoverable={false} style={gridStyle}>
					<Card
						hoverable={false}
						cover={
							<img
								alt='example'
								src={
									'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
								}
							/>
						}
					></Card>
				</Card.Grid>
				<Card.Grid hoverable={false} style={gridStyle}>
					<Descriptions
						column={1}
						title={'活动信息'}
						style={{ textAlign: 'left' }}
					>
						<Descriptions.Item label='活动编号'>
							{activity.id}
						</Descriptions.Item>
						<Descriptions.Item label='活动名称'>
							{activity.name}
						</Descriptions.Item>
						<Descriptions.Item label='活动时间'>
							{activity.time}
						</Descriptions.Item>
						<Descriptions.Item label='活动地点'>
							{activity.location}
						</Descriptions.Item>
						<Descriptions.Item label='活动类型'>
							{activity.type}
						</Descriptions.Item>
						<Descriptions.Item label='活动描述'>
							{activity.description}
						</Descriptions.Item>
						<Descriptions.Item label='活动基准分'>
							{activity.basicScore}
						</Descriptions.Item>
					</Descriptions>
					<Modal
						title='签到码'
						visible={sign}
						onOk={() => {
							setSign(false);
						}}
						onCancel={() => {
							setSign(false);
						}}
						okText={'确认'}
						cancelText={'取消'}
					>
						<Typography.Text>{randCode}</Typography.Text>
					</Modal>
				</Card.Grid>
			</Card>
		</React.Fragment>
	);
};

export default connect(mapStateToProps)(ClubActivityDeatil);
