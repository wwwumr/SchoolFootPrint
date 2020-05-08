import React from 'react';
import { Table, Button,Modal,message } from 'antd';
import { Link } from 'react-router-dom';
import ActivityDetail from '../activity/ActivityDetail_CERT';
import { store } from '../../../redux/store/store';
import { RouteComponentProps } from 'react-router-dom'
import OrgApis,{OrgPassProps,ActivityProps} from '../../../apis/OrgApis';
interface MatchProps {
  path: string
}
type Props = RouteComponentProps<MatchProps>
const HistoryActivity = (props:Props) => {
	const [visible,setVisible] = React.useState(false)
	const [activities,setActivities] = React.useState<ActivityProps[]>([])
	const [id,setId] = React.useState(-1)
	const {history,match} = props
	const handleOk1 = (id:string)=>{
		setVisible(true)
		for(var i=0;i<activities.length;i++){
			if(activities[i].id === id){
				setId(i);
				break;
			}
		}
	}
	const getReview = ()=>{
		const a1 = OrgApis.getReview()
		a1(store.dispatch).then(()=>{
			const data:OrgPassProps = store.getState().orgpass as OrgPassProps
			console.log(data.groupTableDetails)
			setActivities(data.groupTableDetails) 
		})
	}
	const Reflex = ()=>{
		getReview()
	}
	const handleOk = ()=>{
		setVisible(true)
	}
	const handleCancel = ()=>{
		setVisible(false)
	}
	const columns = [
		{
			title: '活动编号',
			dataIndex: 'id',
			key: '0',
		},
		{
			title: '活动时间',
			dataIndex: 'time',
			key: '1',
		},
		{
			title: '活动地点',
			dataIndex: 'location',
			key: '2',
		},
		{
			title: '活动类型',
			dataIndex: 'type',
			key: '3',
		},
		{
			title: '活动详情',
			dataIndex: 'id',
			key: '4',
			render: (id: string) => (
				<React.Fragment>
					<React.Fragment>
						<Button onClick={()=>{handleOk1(id)}}>查看详情
						</Button>
					</React.Fragment>
				</React.Fragment>
			),
		},
		{
			title: '审批',
			dataIndex: 'id',
			key: '6',
			render: (index: string) => {
				return(
				<React.Fragment>
					<Button onClick={()=>{
						for(var i=0;i<activities.length;i++){
							if(activities[i].id===index){
								const data = activities[i].reviews; 
								history.push(`${match.path}/marks`,{ query: { data,index }})
							}
						}
					
					}}>
						登记分数
					</Button>
				</React.Fragment>)
			},
		},
	];
	React.useEffect(()=>{
		Reflex()
	},[])
	return (
		<React.Fragment>
			<Table dataSource={activities} columns={columns} />
			<Modal
			  title="活动详情"
			  visible={visible}
			  onOk={handleOk}
				onCancel={handleCancel}
				footer={null}	
				width={700}
				destroyOnClose={true}
			>
				{<ActivityDetail details={activities[id]}/>}
			</Modal>
		</React.Fragment>
	);
};

export default HistoryActivity;
