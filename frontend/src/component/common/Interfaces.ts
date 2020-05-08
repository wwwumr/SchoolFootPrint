export type ActivityStatusType =
	| '未审核'
	| '未通过'
	| '已通过'
	| '未计分'
	| '已计分'
	| '已认证';

export enum ActivityType {
	Sports = '0',
	Arts = '1',
	Science = '2',
	Computer = '3',
	Voluntary = '4',
	Practice = '5',
}

export const getActivityChineseName = (type: ActivityType) => {
	switch (type) {
		case ActivityType.Sports: {
			return '运动';
		}
		case ActivityType.Arts: {
			return '艺术';
		}
		case ActivityType.Science: {
			return '科学';
		}
		case ActivityType.Computer: {
			return '计算机';
		}
		case ActivityType.Voluntary: {
			return '志愿活动';
		}
		case ActivityType.Practice: {
			return '实践';
		}
		default: {
			return '';
		}
	}
};
