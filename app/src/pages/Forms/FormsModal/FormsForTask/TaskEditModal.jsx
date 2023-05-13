import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../../../slices/ModalSlice";
import { editTask } from "../../../../slices/BoardSlice/BoardsSlice";
import { Modal, Form, Input, DatePicker, Select, Row, Col } from "antd";
import { useState, useEffect } from "react";
import { tagRender } from "./tagRender";
import dayjs from "dayjs";
const { TextArea } = Input;

const TaskAEditModal = (props) => {
  const { userList } = useSelector((store) => store.user);
  const { isOpenEditTask } = useSelector((store) => store.modal);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const users = userList.map((user) => user.username);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: props.title,
      description: props.description,
      limit: dayjs(props.limit),
      status: props.status,
      responsible: props.responsible,
    });
  }, [
    form,
    props.title,
    props.description,
    props.limit,
    props.status,
    props.responsible,
  ]);

  const handleCancel = () => {
    dispatch(toggleModal({ modal: "isOpenEditTask" }));
  };

  const handleSubmit = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(
        editTask({
          id: props.id,
          title: props.title,
          description: props.description,
          status: props.status,
          prevStatus: props.col,
          limit: props.limit,
          responsible: props.responsible,
        })
      );
      setConfirmLoading(false);
      dispatch(toggleModal({ modal: "isOpenEditTask" }));
    }, 1000);
  };

  return (
    <>
      <Modal
        title="Edit Task"
        centered
        open={isOpenEditTask}
        onOk={form.submit}
        onCancel={handleCancel}
        forceRender={true}
        getContainer={false}
        confirmLoading={confirmLoading}
        okButtonProps={{
          style: { backgroundColor: "#6875d8" },
        }}
        bodyStyle={{ padding: "10px 0 0" }}
        width={500}
        okText="Edit"
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
              value={props.title}
              onChange={props.handleChange}
            />
          </Form.Item>

          <Row justify="space-between" align="middle" gutter={[24, 0]} wrap>
            <Col flex="1 0 auto">
              <Form.Item
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Input status for task!",
                  },
                ]}
              >
                <Select
                  size="large"
                  name="status"
                  onChange={props.handleSelect}
                  virtual={false}
                  style={{ minWidth: 120 }}
                  options={[
                    { value: "todo", label: "todo" },
                    { value: "in progress", label: "in progress" },
                    { value: "done", label: "done" },
                    { value: "overdue", label: "overdue", disabled: true },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col flex="1 0 auto">
              <Form.Item
                name="limit"
                rules={[
                  {
                    required: true,
                    message: "Input time limit for task!",
                  },
                ]}
              >
                <DatePicker
                  value={props.limit}
                  size="large"
                  placeholder="Select time limit"
                  style={{ width: "100%", minWidth: 192 }}
                  showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                  onChange={props.handleDataSet}
                  allowClear={false}
                />
              </Form.Item>
            </Col>
          </Row>

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
              value={props.responsible}
              onChange={props.handleSelectedItems}
              tagRender={tagRender}
              style={{ width: "100%" }}
              options={users.map((item) => ({
                value: item,
                label: item,
              }))}
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
              value={props.description}
              onChange={props.handleChange}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskAEditModal;
