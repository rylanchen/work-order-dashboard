export type WorkOrder = {
  id: string
  project: string
  overtime: boolean | 'once'
  hours: number
  created_at: string
}

export type Role = 'admin' | 'user'
