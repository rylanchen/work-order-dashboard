import { Table, Tag, Button, Popconfirm } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { WorkOrder } from '../types'

export default function TaskTable({ rows, onDelete, canDelete }: { rows: WorkOrder[], onDelete: (id: string)=>void, canDelete: boolean }) {
  const columns: ColumnsType<WorkOrder> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 90 },
    { title: 'Project', dataIndex: 'project', key: 'project', responsive: ['sm'] },
    { title: 'Overtime', dataIndex: 'overtime', key: 'overtime', render: (v) => v===true ? <Tag color="volcano">Yes</Tag> : v==='once' ? <Tag color="blue">Once</Tag> : <Tag>No</Tag>, width: 120 },
    { title: 'Hours', dataIndex: 'hours', key: 'hours', width: 100, render: (h)=> h.toFixed(2) },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at', width: 180 },
    {
      title: 'Action',
      key: 'action',
      width: 110,
      render: (_, r) => canDelete ? (
        <Popconfirm title="Delete this work order?" onConfirm={()=>onDelete(r.id)}>
          <Button danger size="small">Delete</Button>
        </Popconfirm>
      ) : null
    }
  ]
  return <Table rowKey="id" dataSource={rows} columns={columns} pagination={false} />
}
