import React from 'react';
import { Card, Descriptions } from 'antd';
import { ActivityProps } from '../../../apis/ActivityApi';
const gridStyle: React.CSSProperties = {
	width: '50%',
	textAlign: 'center',
};

interface ActivityDetailProps {
	details: ActivityProps;
}
const ActivityDeatil = (props: ActivityDetailProps) => {
	console.log(props);
	const { details } = props;
	const MockActivity = details;
	//const [MockActivity, setMockActivity] = React.useState(props.details);
	return (
		<React.Fragment>
			<Card style={{ width: '80%', margin: '0 10%' }}>
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
							{MockActivity.id}
						</Descriptions.Item>
						<Descriptions.Item label='活动时间'>
							{MockActivity.time}
						</Descriptions.Item>
						<Descriptions.Item label='活动地点'>
							{MockActivity.location}
						</Descriptions.Item>
						<Descriptions.Item label='活动类型'>
							{MockActivity.type}
						</Descriptions.Item>
						<Descriptions.Item label='活动描述'>
							{MockActivity.description}
						</Descriptions.Item>
					</Descriptions>
				</Card.Grid>
			</Card>
		</React.Fragment>
	);
};

export default ActivityDeatil;
