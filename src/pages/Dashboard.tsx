import { useMemo, useState } from 'react'
import { Card, Typography, Button } from 'antd'
import { initialData } from '../data'
import type { WorkOrder } from '../types'
import TaskTable from '../components/TaskTable'
import HoursBarChart from '../components/HoursBarChart'
import { useAuth } from '../context.AuthContext'

export default function Dashboard() {
  const [rows, setRows] = useState<WorkOrder[]>(initialData)
  const { role, username, logout } = useAuth()

  const totals = useMemo(() => {
    const m = new Map<string, number>()
    rows.forEach(r => m.set(r.project, (m.get(r.project) || 0) + r.hours))
    return Array.from(m, ([project, hours]) => ({ project, hours }))
  }, [rows])

  const handleDelete = (id: string) => {
    setRows(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div className="p-4 md:p-8 space-y-4">
      <div className="flex items-center justify-between">
        <Typography.Title level={3} className="!mb-0">工单管理与图表展示</Typography.Title>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Hello, <strong>{username}</strong> ({role})</span>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2" title="Tasks">
          <TaskTable rows={rows} onDelete={handleDelete} canDelete={role==='admin'} />
        </Card>
        <Card title="Project Hours Distribution">
          <HoursBarChart data={totals} />
        </Card>
      </div>
    </div>
  )
}
