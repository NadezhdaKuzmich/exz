import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../../../slices/ModalSlice";
import { addTask } from "../../../../slices/BoardsSlice";
import { InitialValue } from "./InitialValue";
import { Modal, Form, Input, DatePicker } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
const { TextArea } = Input;

const TaskAddModal = () => {
  const { isOpenAddTask } = useSelector((store) => store.modal);
  const [state, setState] = useState(InitialValue);
  const { title, description, status, timeLimit } = state;
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
        status: status,
        timeLimit: timeLimit,
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
        </Form>
      </Modal>
    </>
  );
};

export default TaskAddModal;