import React from 'react';
import { Menu } from 'antd';
import { UserProps, AppState } from '../redux/reducer/reducer';
import { Role } from '../redux/action/action';
import { connect } from 'react-redux';
import styles from '../layout/Header.module.css';
import { Link } from 'react-router-dom';
import { store } from '../redux/store/store';
import Actions from '../redux/action/action';

interface StateProps {
	user: UserProps;
}

const mapStateToProps = (state: AppState) => ({
	user: state.PersistedReducer.user,
});

type Props = StateProps;

const Header: React.FunctionComponent<Props> = (props: Props) => {
	const { user } = props;
	const handleLogOut = () => {
		store.dispatch(Actions.logOut());
	};

	return (
		<React.Fragment>
			{user.role === Role.UNDEFINED && (
				<React.Fragment>
					<Link to='/'>
						<div className={styles.logo} />
					</Link>
					<Menu theme='dark' mode='horizontal' defaultSelectedKeys={[]}>
						<Menu.Item className={styles.menuItem} key='2'>
							<Link to='/register'>注册</Link>
						</Menu.Item>
						<Menu.Item className={styles.menuItem} key='1'>
							<Link to='/login'>登录</Link>
						</Menu.Item>
					</Menu>
				</React.Fragment>
			)}
			{(user.role === Role.CLUB || user.role === Role.CERTIFICATION_BODY) && (
				<React.Fragment>
					<Link to='/'>
						<div className={styles.logo} />
					</Link>
					<Menu theme='dark' mode='horizontal' defaultSelectedKeys={[]}>
						<Menu.Item className={styles.menuItem} key='1'>
							<Link to='/' onClick={handleLogOut}>
								注销
							</Link>
						</Menu.Item>
					</Menu>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default connect(mapStateToProps)(Header);
