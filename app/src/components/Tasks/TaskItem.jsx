import { useSelector, useDispatch } from "react-redux";
import { AlignRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { toggleModal } from "../../slices/ModalSlice";
import "./TaskItem.modules.css";

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
      className={`card-task task-${column.name.split(" ").join("")}`}
      draggable
      onDragStart={handleOnDrag}
    >
      <div className="title-card-task">
        <h4>{task.title}</h4>
        <span className="time">{new Date(task.date).toLocaleString()}</span>
      </div>
      <div className="description">
        <p>{task.description}</p>
      </div>
      <div className="footer-card-task">
        <Button
          size="small"
          type="link"
          className="btn-details"
          onClick={handleOpen}
        >
          <span>
            Show more
            <AlignRightOutlined style={{ padding: "0 0 0 6px"}}/>
          </span>
        </Button>
      </div>
    </li>
  );
};

export default TaskItem;
