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
import { setBoardActive } from "../../slices/BoardSlice/BoardsSlice";
import { toggleModal } from "../../slices/ModalSlice";
import ProgressComponent from "./ProgressComponent";
import styles from "./SideBar.module.css";
import { useState } from "react";

const SideBar = () => {
  const { boards } = useSelector((store) => store.boards);
  const board = boards.find((board) => board.isActive);
  const overdueCol = board?.columns.find((column) => column.name === "overdue");
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
    <>
      {board ? (
        <div className={styles.wrapBg}>
          <div className="container">
            <div className={styles.sidebar}>
              <div className={styles.btnsSet}>
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
                    className={`${styles.addBoard} ${styles.side}`}
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
                    className={`${styles.addBoard} ${styles.side}`}
                    size="large"
                    icon={<AppstoreAddOutlined />}
                    onClick={() =>
                      dispatch(toggleModal({ modal: "isOpenAddBoard" }))
                    }
                  >
                    <span className="hide">ADD NEW</span>
                  </Button>
                </Tooltip>
                {board && overdueCol.tasks.length > 0 ? (
                  <div className={styles.hideOverdue}>
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
                            className={`${styles.addBoard} ${styles.side}`}
                            size="large"
                            icon={<ClockCircleOutlined />}
                          >
                            <span className="hide">OVERDUE</span>
                          </Button>
                        </Link>
                      </Badge>
                    </Tooltip>
                  </div>
                ) : null}
              </div>

              <ProgressComponent />
              <Drawer
                title={`ALL BOARDS: ${boards.length}`}
                placement="left"
                onClose={onClose}
                open={open}
                contentWrapperStyle={{ width: "320px" }}
                className={styles.wrapperDrawer}
              >
                <div className={styles.sidebarWrap}>
                  {boards.map((board, index) => (
                    <div
                      key={index}
                      className={`${styles.boardBtn} ${
                        board.isActive ? styles.active : ""
                      }`}
                      onClick={() => {
                        dispatch(setBoardActive({ index }));
                        console.log("click");
                        setOpen(false);
                      }}
                    >
                      <span>
                        <ProjectOutlined className={styles.icon} />
                        {board.name}
                      </span>
                      <DropdDownBoard
                        id={board.id}
                        index={index}
                        handleEdit={handleEdit}
                      />
                    </div>
                  ))}
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      ) : null}
      <BoardModal />
      <BoardModalEdit board={name} />
    </>
  );
};

export default SideBar;
