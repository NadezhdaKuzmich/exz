import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../../../slices/ModalSlice";
import { editBoard } from "../../../../slices/BoardsSlice";
import { Form, Modal, Input } from "antd";
import { useState, useEffect } from "react";

const BoardModalEdit = ({ board }) => {
  const { isOpenBoardEdit } = useSelector((store) => store.modal);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [name, setName] = useState();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: board,
    });
  }, [form, board]);

  const handleSubmit = () => {
    if (name.trim().length) {
      setConfirmLoading(true);
      setTimeout(() => {
        dispatch(editBoard({ name: name }));
        setConfirmLoading(false);
        dispatch(toggleModal({ modal: "isOpenBoardEdit" }));
      }, 1000);
    }
  };

  const handleCancel = () => {
    dispatch(toggleModal({ modal: "isOpenBoardEdit" }));
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <Modal
        title="Edit Board"
        centered
        forceRender={true}
        open={isOpenBoardEdit}
        onOk={form.submit}
        onCancel={handleCancel}
        getContainer={false}
        okButtonProps={{ style: { backgroundColor: "#6875d8" } }}
        confirmLoading={confirmLoading}
        bodyStyle={{ padding: "10px 0 0" }}
        width={500}
        okText="Edit"
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name Board!",
              },
            ]}
          >
            <Input
              placeholder="Board Name"
              size="large"
              value={name}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BoardModalEdit;
