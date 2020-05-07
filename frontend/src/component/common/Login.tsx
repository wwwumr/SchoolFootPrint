import React from 'react';
import { Form, Input, Button, Card, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './login.module.css';
import { useHistory } from 'react-router';
import { store } from '../../redux/store/store';
import Actions from '../../redux/action/action';
import { Role } from '../../redux/action/action';
import { LoginApi } from '../../apis/LoginApi';
import { Store } from 'antd/lib/form/interface';

const NormalLoginForm = () => {
	const history = useHistory();
	const [type, setType] = React.useState(0);

	const onFinish = (values: Store) => {
		console.log('Received values of form: ', values);
		if (type === 0) {
			LoginApi(values.id, values.password).then((res) => {
				if (res.data === true) {
					store.dispatch(
						Actions.setUser({ userId: values.id, role: Role.CLUB })
					);
					history.push('/');
				} else {
					alert('登录失败');
				}
			});
		} else if (type === 1) {
			if (values.id === 'admin' && values.password === 'admin') {
				store.dispatch(
					Actions.setUser({ userId: values.id, role: Role.CERTIFICATION_BODY })
				);
				history.push('/');
			} else {
				alert('登录失败');
			}
		}
	};

	return (
		<Form
			name='normal_login'
			className={styles.login_form}
			initialValues={{ remember: true }}
			onFinish={onFinish}
		>
			<Form.Item>
				<Select
					value={type}
					onChange={(e) => {
						setType(e);
					}}
				>
					<Select.Option value={0}>{'社团登录'}</Select.Option>
					<Select.Option value={1}>{'认证机构登录'}</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item
				name='id'
				rules={[{ required: true, message: '请输入用户名!' }]}
			>
				<Input
					prefix={<UserOutlined className='site-form-item-icon' />}
					placeholder='用户名'
				/>
			</Form.Item>
			<Form.Item
				name='password'
				rules={[{ required: true, message: '请输入密码!' }]}
			>
				<Input
					prefix={<LockOutlined className='site-form-item-icon' />}
					type='password'
					placeholder='密码'
				/>
			</Form.Item>

			<Form.Item>
				<Button
					type='primary'
					htmlType='submit'
					className={styles.login_form_button}
				>
					登录
				</Button>
			</Form.Item>
		</Form>
	);
};

const Login: React.FunctionComponent = () => {
	return (
		<React.Fragment>
			<Card
				style={{
					width: '30%',
					textAlign: 'center',
					marginLeft: '35%',
					marginTop: '50px',
					padding: '20px',
				}}
				title={'登录'}
				headStyle={{
					fontSize: '30px',
					textAlign: 'center',
					fontWeight: 'bold',
				}}
			>
				<NormalLoginForm />
			</Card>
		</React.Fragment>
	);
};

export default Login;
