import { Form, Input, Button, Card, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context.AuthContext'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()

  const onFinish = (values: any) => {
    login(values.username)
    nav('/', { replace: true })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <Card title="Log in" className="w-full max-w-md shadow-md">
        <Typography.Paragraph className="mb-4">
          用户名为 <strong>admin</strong> → 管理员权限；其他任意用户名 → 普通用户
        </Typography.Paragraph>
        <Form layout="vertical" onFinish={onFinish} initialValues={{ username: '', password: '' }}>
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Enter any username' }]}>
            <Input placeholder="admin or others" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="any value" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>Log in</Button>
        </Form>
      </Card>
    </div>
  )
}
