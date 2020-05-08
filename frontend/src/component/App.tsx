import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Header from '../layout/Header';
import Sider from '../layout/Sider';
import HomePage from './HomePage';
import { UserProps, AppState } from '../redux/reducer/reducer';
import { Role } from '../redux/action/action';
import { connect } from 'react-redux';
import Login from './common/Login';
import Register from './common/Register';
import NotFound from './NotFound';
import ActivityReview_CERT from './certificationBody/activity/ActivityReview_CERT';
import HistoryActivity_CERT from './certificationBody/activity/HistoryActivity_CERT';
import ActivityDeatil_CERT from './certificationBody/activity/ActivityDetail_CERT';
import MarksReview_CERT from './certificationBody/marks/MarksReview_CERT';
import MarksReview_CLUB from './club/marks/ClubMarksReview';
import ClubActivityDetail from './club/activity/ClubActivityDetail';
import MarksHistory from './club/marks/MarksHistory';
import CreateActivity from './club/activity/CreateActivity';
import ClubActivities from './club/activity';

interface StateProps {
	user: UserProps;
}

const mapStateToProps = (state: AppState) => ({
	user: state.PersistedReducer.user,
});

type Props = StateProps

const App: React.FunctionComponent<Props> = (props: Props) => {
	const { user } = props;

	return (
		<React.Fragment>
			<Router>
				<Layout>
					<Layout.Header className='header'>
						<Header />
					</Layout.Header>
					{user.userId !== '' && user.role === Role.CERTIFICATION_BODY && (
						<Layout>
							<Layout.Sider width={200} className='site-layout-background'>
								<Sider />
							</Layout.Sider>
							<Layout>
								<Layout.Content
									className='site-layout-background'
									style={{
										padding: 24,
										margin: 0,
										minHeight: 480,
									}}
								>
									<Switch>
										<Route exact path='/' component={HomePage} />
										<Route
											exact
											path='/activity/review'
											component={ActivityReview_CERT}
										/>
										<Route
											exact
											path='/activity/history'
											component={HistoryActivity_CERT}
										/>
										<Route
											exact
											path='/activity/history/marks'
											component={MarksReview_CERT}
										/>
										<Route
											exact
											path='/activity/detail/:id'
											component={ActivityDeatil_CERT}
										/>
										<Route path='*' component={NotFound} />
									</Switch>
								</Layout.Content>
							</Layout>
						</Layout>
					)}
					{user.userId !== '' && user.role === Role.CLUB && (
						<Layout>
							<Layout.Sider width={200} className='site-layout-background'>
								<Sider />
							</Layout.Sider>
							<Layout>
								<Layout.Content
									className='site-layout-background'
									style={{
										padding: 24,
										margin: 0,
										minHeight: 480,
									}}
								>
									<Switch>
										<Route exact path='/' component={HomePage} />
										<Route
											exact
											path='/activity/create'
											component={CreateActivity}
										/>
										<Route exact path='/activity' component={ClubActivities} />
										<Route
											exact
											path='/activity/marks'
											component={MarksReview_CLUB}
										/>
										<Route
											exact
											path='/activity/marks/history'
											component={MarksHistory}
										/>
										<Route
											exact
											path='/activity/detail'
											component={ClubActivityDetail}
										/>
										<Route path='*' component={NotFound} />
									</Switch>
								</Layout.Content>
							</Layout>
						</Layout>
					)}
					{user.role === Role.UNDEFINED && (
						<Layout>
							<Layout.Content
								className='site-layout-background'
								style={{
									margin: 0,
									minHeight: 561,
								}}
							>
								<Switch>
									<Route exact path='/' component={HomePage} />
									<Route exact path='/login' component={Login} />
									<Route exact path='/register' component={Register} />
									<Route path='*' component={NotFound} />
								</Switch>
							</Layout.Content>
						</Layout>
					)}
				</Layout>
			</Router>
		</React.Fragment>
	);
};

export default connect(mapStateToProps)(App);
