type ActivityStatusType = '未审核' | '未通过' | '已通过' | '未计分' | '已计分' | '已认证';

export interface ActivityProps {
	id: number;
	location: string;
	time: string;
	type: string;
	desc: string;
	status: ActivityStatusType;
	img: string;
}

export const Remaining: ActivityProps[] = [
	{
		id: 0,
		time: '2012至今',
		location: '河北省沧州市',
		type: '集会',
		desc: '小小聚会',
		status: '未审核',
		img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
	},
	{
		id: 1,
		time: '2012至今',
		location: '河北省沧州市',
		type: '集会',
		desc: '小小聚会',
		status: '未审核',
		img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
	},
	{
		id: 2,
		time: '2012至今',
		location: '河北省沧州市',
		type: '集会',
		desc: '小小聚会',
		status: '未审核',
		img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
	},
	{
		id: 3,
		time: '2012至今',
		location: '河北省沧州市',
		type: '集会',
		desc: '小小聚会',
		status: '未审核',
		img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
	},
	{
		id: 4,
		time: '2012至今',
		location: '河北省沧州市',
		type: '集会',
		desc: '小小聚会',
		status: '未审核',
		img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
	},
	{
		id: 5,
		time: '2012至今',
		location: '河北省沧州市',
		type: '集会',
		desc: '小小聚会',
		status: '未审核',
		img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
	},
];
