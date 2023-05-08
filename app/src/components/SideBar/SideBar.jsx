import { useSelector, useDispatch } from "react-redux";
import { Button, Tooltip, Badge, Drawer } from "antd";
import { HashLink as Link } from "react-router-hash-link";
import {
  ProjectOutlined,
  MenuUnfoldOutlined,
  AppstoreAddOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import BoardModal from "../../pages/Forms/FormsModal/FormsForBoard/BoardModal";
import BoardModalEdit from "../../pages/Forms/FormsModal/FormsForBoard/BoardModalEdit";
import DropdDownBoard from "./DropDownBoard";
import { setBoardActive } from "../../slices/BoardsSlice";
import { toggleModal } from "../../slices/ModalSlice";
import "./SideBar.modules.css";
import { useState } from "react";

const SideBar = () => {
  const { boards } = useSelector((store) => store.boards);
  const board = boards.find((board) => board.isActive);
  const overdueCol = board.columns.find((column) => column.name === "overdue");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const dispatch = useDispatch();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleEdit = (board) => {
    setName(board);
  };

  return (
    <div className="sidebar">
      <Tooltip
        size="large"
        title="List of boards"
        placement="right"
        color="#fefefee6"
        overlayInnerStyle={{ color: "#8fa5eb" }}
        overlayClassName="tooltip"
      >
        <Button
          type="text"
          className="add-board side"
          size="large"
          icon={<MenuUnfoldOutlined />}
          onClick={showDrawer}
        >
          <span className="hide">BOARDS</span>
        </Button>
      </Tooltip>
      <Tooltip
        size="large"
        title="Add new board"
        placement="right"
        color="#fefefee6"
        overlayInnerStyle={{ color: "#8fa5eb" }}
        overlayClassName="tooltip"
      >
        <Button
          type="text"
          className="add-board side"
          size="large"
          icon={<AppstoreAddOutlined />}
          onClick={() => dispatch(toggleModal({ modal: "isOpenAddBoard" }))}
        >
          <span className="hide">ADD NEW</span>
        </Button>
      </Tooltip>
      {overdueCol.tasks.length > 0 ? (
        <div className="hide-overdue">
          <Tooltip
            size="large"
            title="Show overdue"
            placement="right"
            color="#fefefee6"
            overlayInnerStyle={{ color: "#8fa5eb" }}
            overlayClassName="tooltip"
          >
            <Badge count={overdueCol.tasks.length} offset={[-3, 5]}>
              <Link to="#overdue">
                <Button
                  type="text"
                  className="add-board side"
                  size="large"
                  icon={<ClockCircleOutlined />}
                ></Button>
              </Link>
            </Badge>
          </Tooltip>
        </div>
      ) : null}
      <Drawer
        title={`ALL BOARDS: ${boards.length}`}
        placement="left"
        onClose={onClose}
        open={open}
        className="wrapper-drawer"
      >
        <div className="sidebar-wrap">
          {boards.map((board, index) => (
            <div
              key={index}
              className={`board-btn ${board.isActive ? "active" : ""}`}
              onClick={() => {
                dispatch(setBoardActive({ index }));
                setOpen(false);
              }}
            >
              <span>
                <ProjectOutlined className="icon-board" />
                {board.name}
              </span>
              <DropdDownBoard id={board.id} handleEdit={handleEdit} />
            </div>
          ))}
        </div>
      </Drawer>
      <BoardModal />
      <BoardModalEdit board={name} />
    </div>
  );
};

export default SideBar;
