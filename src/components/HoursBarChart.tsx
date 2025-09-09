import ReactECharts from 'echarts-for-react'

type Point = { project: string, hours: number }

export default function HoursBarChart({ data }: { data: Point[] }) {
  const option = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: data.map(d => d.project),
      axisLabel: { interval: 0 }
    },
    yAxis: { type: 'value', name: 'Hours' },
    series: [
      {
        type: 'bar',
        data: data.map(d => Number(d.hours.toFixed(2))),
        label: { show: true, position: 'top' }
      }
    ],
    grid: { left: 40, right: 10, top: 30, bottom: 60 }
  }
  return <ReactECharts option={option} style={{ height: 320 }} />
}
