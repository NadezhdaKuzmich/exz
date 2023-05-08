import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../../../slices/ModalSlice";
import { editTask } from "../../../../slices/BoardsSlice";
import { Modal, Form, Input, DatePicker } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
const { TextArea } = Input;

const TaskAEditModal = ({ id, title, description, status, limit, handleChange, handleDataSet }) => {
  const { isOpenEditTask } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: title,
      description: description,
      limit: dayjs(limit),
    });
  }, [form, title, description, limit]);

  const handleCancel = () => {
    dispatch(toggleModal({ modal: "isOpenEditTask" }));
  };

  const handleSubmit = () => {
    dispatch(toggleModal({ modal: "isOpenEditTask" }));
    dispatch(
      editTask({
        id: id,
        title: title,
        description: description,
        status: status,
        limit: limit,
      })
    );
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
            name="limit"
            rules={[
              {
                required: true,
                message: "Input time limit for task!",
              },
            ]}
          >
            <DatePicker
              value={limit}
              size="large"
              placeholder="Select time limit"
              style={{ width: "100%" }}
              showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
              onChange={handleDataSet}
              allowClear={false}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskAEditModal;
