import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { Todo } from '@/components/Todo'
import { addTodoAction, searchFilters, statusFilter } from '@/redux/actions/todo'
import { todosRemainingSelector } from '@/redux/selectors/todo'
import { Button, Card, Col, Input, Radio, Row, Select, Tag } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const { Search } = Input
const HomePage = () => {
  const [todoName, setTodoName] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchName, setSearchName] = useState('')
  const [priority, setPriority] = useState('Medium')
  const todoData = useSelector(todosRemainingSelector)
  const dispatch = useDispatch()
  const onChangeStatus = (e: any) => {
    console.log(e.target.value)
    setFilterStatus(e.target.value)
    dispatch(statusFilter(e.target.value))
  }

  const handleChange = (e: any) => {
    dispatch(searchFilters(e.target.value))
    setSearchName(e.target.value)
  }
  const handleAdd = () => {
    setTodoName('')
    setPriority('Medium')
    dispatch(
      addTodoAction({
        name: todoName,
        priority: priority,
        completed: false,
      })
    )
  }
  const handleChangeTodo = (e: any) => {
    setTodoName(e.target.value)
  }
  const handleSelect = (value: any) => {
    setPriority(value)
  }
  return (
    <div>
      <Header />
      <div style={{ padding: 50 }}>
        <Card title="Card title" bordered={false} style={{ width: 300 }}>
          <p>Search</p>
          <Search
            placeholder="input search text"
            value={searchName}
            onChange={handleChange}
            style={{ width: 200 }}
          />
          <p>Filter By Status</p>
          <Radio.Group value={filterStatus} onChange={onChangeStatus}>
            <Radio value="All">All</Radio>
            <Radio value="Completed">Completed</Radio>
            <Radio value="Todo">Todo</Radio>
          </Radio.Group>
          <p>Filter By Priority</p>
          <Select mode="multiple" allowClear placeholder="Please select" style={{ width: '100%' }}>
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <hr />
          <Row style={{ height: 'calc(100% - 40px)' }}>
            <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
              {/* <Todo name="Learn React" prioriry="High" />
              <Todo name="Learn Redux" prioriry="Medium" />
              <Todo name="Learn JavaScript" prioriry="Low" /> */}
              {todoData?.map((item, index) => (
                <Todo
                  key={index}
                  name={item.name}
                  prioriry={item.priority}
                  completed={item.completed}
                />
              ))}
            </Col>
            <Col span={24}>
              <Input.Group style={{ display: 'flex' }} compact>
                <Input value={todoName} onChange={handleChangeTodo} />
                <Select defaultValue="Medium" onChange={handleSelect} value={priority}>
                  <Select.Option value="High" label="High">
                    <Tag color="red">High</Tag>
                  </Select.Option>
                  <Select.Option value="Medium" label="Medium">
                    <Tag color="blue">Medium</Tag>
                  </Select.Option>
                  <Select.Option value="Low" label="Low">
                    <Tag color="gray">Low</Tag>
                  </Select.Option>
                </Select>
                <Button type="primary" onClick={handleAdd}>
                  Add
                </Button>
              </Input.Group>
            </Col>
          </Row>
        </Card>
      </div>
      <Sidebar />
    </div>
  )
}

export default HomePage
