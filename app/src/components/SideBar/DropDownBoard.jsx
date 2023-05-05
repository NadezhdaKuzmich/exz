import { useSelector, useDispatch } from "react-redux";
import { deleteBoard } from "../../slices/BoardsSlice";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toggleModal } from "../../slices/ModalSlice";
import { Dropdown, Button } from "antd";

const DropdDownBoard = ({ id, handleEdit }) => {
  const { boards } = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  const handleOpen = () => {
    const board = boards.find((board) => board.id === id);
    handleEdit(board.name);
    dispatch(toggleModal({ modal: "isOpenBoardEdit" }));
  };

  const items = [
    {
      label: (
        <Button type="link" onClick={handleOpen}>
          <EditOutlined />
          <span className="drop-btn">Edit board</span>
        </Button>
      ),
      key: "0",
    },
    {
      label: (
        <Button type="link" onClick={() => dispatch(deleteBoard())} danger>
          <DeleteOutlined />
          <span className="drop-btn">Delete Board</span>
        </Button>
      ),
      key: "1",
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
      type="button"
    >
      <Button
        size="small"
        shape="circle"
        type="text"
        id={id}
        icon={<MoreOutlined className="btn-name-board" />}
      />
    </Dropdown>
  );
};

export default DropdDownBoard;