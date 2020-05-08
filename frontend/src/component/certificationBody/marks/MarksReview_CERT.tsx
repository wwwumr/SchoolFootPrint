import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button,message } from 'antd';
import { MarksReviewProps } from './Mock';
import OrgApis,{OrgPassProps,ActivityProps} from '../../../apis/OrgApis';
import { store } from '../../../redux/store/store';
type Item = MarksReviewProps;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: any;
	inputType: 'number' | 'text';
	record: Item;
	index: number;
	children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{ margin: 0 }}
					rules={[
						{
							required: true,
							message: `请输入 ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};
interface ActivityDetailProps {
	reviews: MarksReviewProps[]
}
const MarksReview = (props:any) => {
	const [form] = Form.useForm();
	const initial: MarksReviewProps[] = props.location.state.query.data as MarksReviewProps[]
	const id: string = props.location.state.query.index as string
	const [data, setData] = useState<MarksReviewProps[]>(initial);
	const [editingKey, setEditingKey] = useState("-1");
	const [activityId,setActivityId] =  React.useState(id)
	const isEditing = (record: Item) => record.studentId === editingKey;

	const edit = (record: Item) => {
		form.setFieldsValue({ name: '', age: '', address: '', ...record });
		setEditingKey(record.studentId);
	};

	const cancel = () => {
		setEditingKey("-1");
	};
	const submit = (data:any) =>{
		const a3 = OrgApis.postReview(data);
		a3(store.dispatch).then(()=>{
			const result:Boolean = store.getState().apis as Boolean
			if(result){
				message.success({content:"审批提交成功",duration:1})
				window.location.href="http://localhost:3000/activity/history";
			}
			else{
				message.error({content:"网络故障",duration:1})
			}
		})
	}
	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as Item;

			const newData = [...data];
			const index = newData.findIndex((item) => key === item.studentId);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				setData(newData);
				setEditingKey("-1");
			} else {
				newData.push(row);
				setData(newData);
				setEditingKey("-1");
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const columns = [
		{
			title: '学生学号',
			dataIndex: 'studentId',
			width: '15%',
		},
		{
			title: '学生得分',
			dataIndex: 'score',
			width: '10%',
			editable: true,
		},
		{
			title: '评语',
			dataIndex: 'description',
			width: '60%',
			editable: true,
		},
		{
			title: '更改',
			dataIndex: 'operation',
			render: (_: any, record: Item) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Button onClick={() => save(record.studentId)} style={{ marginRight: 8 }}>
							保存
						</Button>
						<Popconfirm title='要取消修改吗?' onConfirm={cancel}>
							<Button>取消</Button>
						</Popconfirm>
					</span>
				) : (
					<Button onClick={() => edit(record)}>修改</Button>
				);
			},
		},
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record: Item) => ({
				record,
				inputType: col.dataIndex === 'marks' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});
	const width= window.screen.width
	return (
		<React.Fragment>
			<div style={{marginLeft:width*0.7,marginBottom:20}}>
			<Button type='primary' onClick={()=>{
				const Data: any[] =[]
				for(var i=0;i<data.length;i++){
					const temp={
						activityID: activityId,
    				description: data[i].description,
    				score: data[i].score,
    				studentId: data[i].studentId
					}
					Data.push(temp)
				}
				submit(Data)
			}}>
				提交
			</Button>
			</div>
			<Form form={form} component={false}>
				<Table
					components={{
						body: {
							cell: EditableCell,
						},
					}}
          bordered
          rowKey='id'
					dataSource={data}
					columns={mergedColumns}
					rowClassName='editable-row'
					pagination={{
						onChange: cancel,
					}}
				/>
			</Form>
		</React.Fragment>
	);
};

export default MarksReview;
