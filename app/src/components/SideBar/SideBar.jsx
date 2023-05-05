import { useSelector, useDispatch } from "react-redux";
import { Button, Tooltip } from "antd";
import { ProjectOutlined } from "@ant-design/icons";
import BoardModal from "../../pages/Forms/FormsModal/FormsForBoard/BoardModal";
import BoardModalEdit from "../../pages/Forms/FormsModal/FormsForBoard/BoardModalEdit";
import DropdDownBoard from "./DropDownBoard";
import { setBoardActive } from "../../slices/BoardsSlice";
import { toggleModal } from "../../slices/ModalSlice";
import "./SideBar.modules.css";
import { useState } from "react";

const SideBar = () => {
  const { boards } = useSelector((store) => store.boards);
  const [ name, setName ] = useState();
  const dispatch = useDispatch();

  const handleEdit = ( board ) => {
    setName(board);
  }

  return (
    <div className="sidebar">
      <span className="sidebar-count">ALL BOARDS: {boards.length}</span>
      {boards.map((board, index) => (
        <div
          key={index}
          className={`board-btn ${board.isActive ? "active" : ""}`}
          onClick={() => dispatch(setBoardActive({ index }))}
        >
          <p>
            <ProjectOutlined
              className="icon-board"
            />
            {board.name}
          </p>
          <DropdDownBoard id={board.id} handleEdit={handleEdit} />
        </div>
      ))}
      <Tooltip
        placement="right"
        size="large"
        title="Add new board"
        color="#8fa5eb"
      >
        <Button
          type="primary"
          className="form-button"
          size="large"
          onClick={() => dispatch(toggleModal({ modal: "isOpenAddBoard" }))}
        >
          + Add New Board
        </Button>
      </Tooltip>

      <BoardModal />
      <BoardModalEdit board={name} />
    </div>
  );
};

export default SideBar;
