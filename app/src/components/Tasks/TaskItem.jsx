import { useSelector, useDispatch } from "react-redux";
import { AlignRightOutlined } from "@ant-design/icons";
import { Button, Avatar, Tooltip } from "antd";
import { toggleModal } from "../../slices/ModalSlice";
import styles from "./TaskItem.module.css";

const TaskItem = ({ colId, taskIndex, handleDetails }) => {
  const { boards } = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const column = columns.find((col, i) => i === colId);
  const task = column.tasks.find((task, i) => i === taskIndex);
  const dispatch = useDispatch();

  const handleOpen = () => {
    handleDetails(task);
    dispatch(toggleModal({ modal: "isOpenDetailsTask" }));
  };

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colId })
    );
  };

  return (
    <li
      className={`${styles.card} ${styles[column.name.split(" ").join("")]}`}
      draggable
      onDragStart={handleOnDrag}
    >
      <div className={styles.titleCard}>
        <div className={styles.titleSet}>
          <h4>{task.title}</h4>
          {task.responsible ? (
            <Avatar.Group
              maxCount={2}
              maxStyle={{
                verticalAlign: "middle",
                background: "linear-gradient(100deg,  #8b8c94, #c3c5d9)",
                fontSize: 10,
              }}
              size={20}
            >
              {task.responsible.map((user, index) => (
                <Tooltip
                  key={index}
                  title={user}
                  placement="top"
                  color="#fefefee6"
                  overlayInnerStyle={{ color: "#8fa5eb" }}
                  overlayClassName="tooltip"
                >
                  <Avatar
                    style={{
                      verticalAlign: "middle",
                    }}
                    className={`${styles.avatar} ${
                      styles[column.name.split(" ").join("")]
                    }`}
                    size={20}
                    gap="7"
                    key={index}
                  >
                    {user
                      .split(" ")
                      .map((el) => el.slice(0, 1))
                      .join("")}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          ) : null}
        </div>

        <span className={styles.time}>
          {new Date(task.date).toLocaleString()}
        </span>
      </div>
      <div className={styles.description}>
        <p>{task.description}</p>
      </div>
      <div className={styles.footerCard}>
        <Button
          size="small"
          type="link"
          className="btn-details"
          onClick={handleOpen}
        >
          <span>
            Show more
            <AlignRightOutlined style={{ padding: "0 0 0 6px" }} />
          </span>
        </Button>
      </div>
    </li>
  );
};

export default TaskItem;
