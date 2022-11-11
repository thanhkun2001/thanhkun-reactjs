import { Row, Tag, Checkbox } from 'antd'
import { useState } from 'react'

const priorityColorMapping = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
}
export interface TodoProps{
    name : string
    prioriry:string
    completed:boolean
}
export const Todo = ({ name, prioriry ,completed =true}:TodoProps) => {
  const [checked, setChecked] = useState(completed)

  const toggleCheckbox = () => {
    setChecked(!checked)
  }

  return (
    <Row
      justify="space-between"
      style={{
        marginBottom: 3,
        ...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
      }}
    >
      <Checkbox checked={checked} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[prioriry]} style={{ margin: 0 }}>
        {prioriry}
      </Tag>
    </Row>
  )
}
