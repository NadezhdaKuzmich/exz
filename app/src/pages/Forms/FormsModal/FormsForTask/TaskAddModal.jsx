import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../../../slices/ModalSlice";
import { addTask } from "../../../../slices/BoardSlice/BoardsSlice";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import { tagRender } from "./tagRender";
import dayjs from "dayjs";
const { TextArea } = Input;

const InitialValue = {
  title: "",
  description: "",
  timeLimit: "",
};

const TaskAddModal = ({ column }) => {
  const { userList } = useSelector((store) => store.user);
  const { isOpenAddTask } = useSelector((store) => store.modal);
  const [state, setState] = useState(InitialValue);
  const [selectedItems, setSelectedItems] = useState([]);
  const { title, description, timeLimit } = state;
  const usersName = userList.map(user => user.username);
  const users = usersName.filter((user) => !selectedItems.includes(user));

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(toggleModal({ modal: "isOpenAddTask" }));
    setState(InitialValue);
    form.resetFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleDataSet = (date, dateString) => {
    setState({ ...state, timeLimit: dateString });
  };

  const handleSubmit = () => {
    dispatch(toggleModal({ modal: "isOpenAddTask" }));
    dispatch(
      addTask({
        title: title,
        description: description,
        statusName: column,
        timeLimit: timeLimit,
        responsible: selectedItems,
      })
    );
    setState(InitialValue);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title="Add New Task"
        centered
        open={isOpenAddTask}
        onOk={form.submit}
        onCancel={handleCancel}
        okButtonProps={{
          htmlType: "submit",
          style: { backgroundColor: "#6875d8" },
        }}
        bodyStyle={{ padding: "10px 0 0" }}
        width={500}
        okText="Create"
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Input title of task!",
              },
            ]}
          >
            <Input
              name="title"
              placeholder="Title"
              size="large"
              value={title}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Input description of task!",
              },
            ]}
          >
            <TextArea
              name="description"
              placeholder="Description"
              size="large"
              value={description}
              onChange={handleChange}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>

          <Form.Item
            name="timeLimit"
            rules={[
              {
                required: true,
                message: "Input time limit for task!",
              },
            ]}
          >
            <DatePicker
              value={timeLimit}
              size="large"
              placeholder="Select time limit"
              style={{ width: "100%" }}
              showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
              onChange={handleDataSet}
            />
          </Form.Item>
          <Form.Item
            name="responsible"
            rules={[
              {
                required: true,
                message: "Select responsible for realization",
              },
            ]}
          >
            <Select
              mode="multiple"
              size="large"
              virtual={false}
              placeholder="Select responsible for realization"
              value={selectedItems}
              onChange={setSelectedItems}
              tagRender={tagRender}
              style={{ width: "100%" }}
              options={users.map((item) => ({
                value: item,
                label: item,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskAddModal;
