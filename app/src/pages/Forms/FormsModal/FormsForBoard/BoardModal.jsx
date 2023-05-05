import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../../../slices/ModalSlice";
import { addBoard, setBoardActive } from "../../../../slices/BoardsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { Form, Modal, Input } from "antd";
import { useState } from "react";

const BoardModal = () => {
  const { isOpenAddBoard } = useSelector((store) => store.modal);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const id = nanoid();
    if (name.trim().length) {
      dispatch(setBoardActive({ id }));
      dispatch(addBoard({ id: id, name: name }));
      dispatch(toggleModal({ modal: "isOpenAddBoard" }));
      form.resetFields();
    }
    setName("");
  };

  const handleCancel = () => {
    dispatch(toggleModal({ modal: "isOpenAddBoard" }));
    form.resetFields();
    setName("");
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <Modal
        title="Add New Board"
        centered
        open={isOpenAddBoard}
        onOk={form.submit}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "#6875d8" } }}
        bodyStyle={{ padding: "10px 0 0" }}
        width={500}
        okText="Create"
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Input name of board!",
              },
            ]}
          >
            <Input
              placeholder="Board Name"
              size="large"
              value={name || ""}
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: "Please input name Board!",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BoardModal;