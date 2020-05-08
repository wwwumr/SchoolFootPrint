import React from 'react';
import { Table, Button,Modal,message } from 'antd';
import ActivityDetail from './ActivityDetail_CERT';
import { store } from '../../../redux/store/store';
import OrgApis,{OrgPassProps,ActivityProps} from '../../../apis/OrgApis';
const ActivityReview = () => {
	const [visible,setVisible] = React.useState(false)
	const [id,setId] = React.useState(-1)
	const [activities,setActivities] = React.useState<ActivityProps[]>([])
	const approve = (id:string)=>{
		const a2 = OrgApis.approve(id)
		a2(store.dispatch).then(()=>{
			const data:Boolean = store.getState().apis as Boolean
			console.log(data)
			if(data){
				message.success({content:"活动编号"+id+"审批通过",duration:1})
				Reflex()
			}
			else{
				message.error({content:"网络故障",duration:1})
				Reflex()
			}
		})
	}
	const rollback = (id:string)=>{
		const a2 = OrgApis.rollback(id)
		a2(store.dispatch).then(()=>{
			const data:Boolean = store.getState().apis as Boolean
			console.log(data)
			if(data){
				message.success({content:"活动编号"+id+"审批不通过",duration:1})
				Reflex()
			}
			else{
				message.error({content:"网络故障",duration:1})
				Reflex()
			}
		})
	}
	const pass = (id:string)=>{
		
		approve(id)
		
	}
	const unpass = (id:string)=>{
		rollback(id)
	}
	const getPass = ()=>{
		const a1 = OrgApis.getPass()
		a1(store.dispatch).then(()=>{
			const data:OrgPassProps = store.getState().orgpass as OrgPassProps
			setActivities(data.groupTableDetails) 
		})
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
			title: '活动描述',
			dataIndex: 'description',
			key: '4',
		},
		{
			title: '活动详情',
			dataIndex: 'id',
			key: '5',
			render: (id: string) => (
				<React.Fragment>
					<Button onClick={()=>{handleOk1(id)}}>查看详情
					</Button>
					
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
					<Button type={'primary'}onClick={()=>{pass(index)}}>通过
					</Button>
					<Button onClick={()=>{unpass(index)}}>不通过
					</Button>
				</React.Fragment>)
			},
		},
	];
	const handleOk1 = (id:string)=>{
		setVisible(true)
		for(var i=0;i<activities.length;i++){
			if(activities[i].id === id){
				setId(i);
				break;
			}
		}
	}
	const handleOk = ()=>{
		setVisible(true)
	}
	const handleCancel = ()=>{
		setVisible(false)
	}
	const Reflex = ()=>{
		getPass()
	}
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
				<ActivityDetail details={activities[id]}/>
			</Modal>
		</React.Fragment>
	);
};

export default ActivityReview;
