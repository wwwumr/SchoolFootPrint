import React from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { NewActivityProps, CreateActivityApi } from '../../../apis/ActivityApi';
import { store } from '../../../redux/store/store';
import TimeUtils from '../../../utils/TimeUtils';

const initialValues: NewActivityProps = {
	basicScore: 0,
	description: '简介',
	location: '活动地址',
	name: '示例活动',
	time: TimeUtils.getDate(new Date()),
	type: '艺术',
};

const CreateActivity = () => {
	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};

	const onFinish = (values: Store) => {
		if (values.time1) {
			values.time = values.time1._d;
			delete values.time1;
		}

		console.log(values);
		CreateActivityApi(store.getState().PersistedReducer.user.userId, {
			basicScore: values.basicScore,
			description: values.description,
			location: values.location,
			name: values.name,
			time: TimeUtils.getDate(values.time),
			type: values.type,
		});
	};

	return (
		<React.Fragment>
			<Form
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout='horizontal'
				initialValues={initialValues}
				size={'middle'}
				onFinish={onFinish}
			>
				<Form.Item
					label='活动名称'
					name={'name'}
					rules={[{ required: true, message: '请输入活动名称' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='活动类型'
					name={'type'}
					rules={[{ required: true, message: '请选择活动类型' }]}
				>
					<Select>
						<Select.Option value='demo'>Demo</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item
					label='活动简介'
					name={'description'}
					rules={[{ required: true, message: '请填写活动简介' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='活动地址'
					name={'location'}
					rules={[{ required: true, message: '请填写活动地址' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='活动日期'
					name={'time1'}
					rules={[{ required: true, message: '请选择活动日期' }]}
				>
					<DatePicker format={'YYYY-MM-DD'} picker={'date'} mode={'date'} />
				</Form.Item>
				<Form.Item
					label='活动基准分'
					name={'basicScore'}
					rules={[
						{ required: true, message: '请选择活动基准分' },
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (
									!value ||
									(getFieldValue('basicScore') <= 100 &&
										getFieldValue('basicScore') > 0)
								) {
									return Promise.resolve();
								}
								return Promise.reject('基准分应在0~100之间!');
							},
						}),
					]}
				>
					<InputNumber />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type={'primary'} htmlType={'submit'}>
						提交
					</Button>
				</Form.Item>
			</Form>
		</React.Fragment>
	);
};

export default CreateActivity;
