import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { useHistory } from 'react-router-dom';
import { RegisterApi } from '../../apis/LoginApi';

const RegistrationForm = () => {
	const history = useHistory();
	const [form] = Form.useForm();

	const onFinish = (values: Store) => {
		console.log('Received values of form: ', values);
		RegisterApi(values.id, values.password).then((res) => {
			console.log(res);
			if (res.data === true) {
				history.push('/login');
			} else {
				alert('注册失败,用户名已被占用');
			}
		});
	};

	return (
		<Form
			form={form}
			name='register'
			onFinish={onFinish}
			initialValues={{}}
			scrollToFirstError
		>
			<Form.Item
				name='id'
				label='用户名'
				rules={[
					{
						required: true,
						message: '请输入邮箱!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name='password'
				label='密码'
				rules={[
					{
						required: true,
						message: '请输入密码!',
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name='confirm'
				label='确认密码'
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: '请确认密码!',
					},
					({ getFieldValue }) => ({
						validator(rule, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject('两次输入密码不一致!');
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit' style={{ width: '100%' }}>
					注册
				</Button>
			</Form.Item>
		</Form>
	);
};

const Register: React.FunctionComponent = () => {
	return (
		<React.Fragment>
			<Card
				style={{
					width: '30%',
					textAlign: 'right',
					marginLeft: '35%',
					marginTop: '50px',
					padding: '20px',
				}}
				title={'注册'}
				headStyle={{
					fontSize: '30px',
					textAlign: 'center',
					fontWeight: 'bold',
				}}
			>
				<RegistrationForm />
			</Card>
		</React.Fragment>
	);
};

export default Register;
