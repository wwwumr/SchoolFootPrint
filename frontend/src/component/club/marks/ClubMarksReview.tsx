import React, { useState } from 'react';
import {
	Table,
	Input,
	InputNumber,
	Popconfirm,
	Form,
	Button,
	message,
} from 'antd';
import { connect } from 'react-redux';
import {
	ActivityProps,
	MarksReviewProps,
	SubmitMarks,
	SubmitReview,
} from '../../../apis/ActivityApi';
import { AppState } from '../../../redux/reducer/reducer';
import { Store } from 'antd/lib/form/interface';

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

interface StateProps {
	activity: ActivityProps;
}

const mapStateToProps = (state: AppState) => ({
	activity: state.PersistedReducer.activity,
});

const ClubMarksReview = (props: StateProps) => {
	const { activity } = props;
	const [data, setData] = React.useState<MarksReviewProps[]>([]);
	const [form] = Form.useForm();
	const [editingKey, setEditingKey] = useState('');

	React.useEffect(() => {
		const reviews: MarksReviewProps[] = [];
		activity.studentIDs.forEach((elem) => {
			reviews.push({ studentId: elem, score: 90, description: '' });
			return;
		});
		setData(reviews);
	}, [activity]);

	const isEditing = (record: Item) => record.studentId === editingKey;

	const edit = (record: Item) => {
		form.setFieldsValue({ name: '', age: '', address: '', ...record });
		setEditingKey(record.studentId);
	};

	const cancel = () => {
		setEditingKey('');
	};

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
				setEditingKey('');
			} else {
				newData.push(row);
				setData(newData);
				setEditingKey('');
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const columns = [
		{
			title: '学生学号',
			dataIndex: 'studentId',
			width: '10%',
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
						<Button
							onClick={() => save(record.studentId)}
							style={{ marginRight: 8 }}
						>
							保存
						</Button>
						<Popconfirm title='要取消修改吗?' onConfirm={cancel}>
							<Button>取消</Button>
						</Popconfirm>
					</span>
				) : (
					<React.Fragment>
						<Button onClick={() => edit(record)}>修改</Button>
					</React.Fragment>
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
				inputType: col.dataIndex === 'score' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	const onFinish = (values: Store) => {
		console.log(values);
	};

	return (
		<React.Fragment>
			<Form form={form} onFinish={onFinish}>
				<Table
					components={{
						body: {
							cell: EditableCell,
						},
					}}
					bordered
					rowKey='studentId'
					dataSource={data}
					columns={mergedColumns}
					rowClassName='editable-row'
					pagination={{
						onChange: cancel,
					}}
				/>
				<Button
					type={'primary'}
					onClick={() => {
						SubmitReview(activity.id, data)
							.then(() => {
								message.success('提交成功');
							})
							.catch(() => {
								message.error('提交失败');
							});
					}}
				>
					{'批量提交'}
				</Button>
				<Button
					type={'primary'}
					onClick={() => {
						SubmitMarks(activity.id)
							.then(() => {
								message.success('提交成功');
							})
							.catch(() => {
								message.error('提交失败');
							});
					}}
				>
					{'提交认证机构计分'}
				</Button>
			</Form>
		</React.Fragment>
	);
};

export default connect(mapStateToProps)(ClubMarksReview);
