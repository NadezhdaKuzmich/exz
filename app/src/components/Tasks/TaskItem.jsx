import { useSelector, useDispatch } from "react-redux";
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
    <div className={`card-task task-${column.name.split(" ").join("")}`} draggable onDragStart={handleOnDrag}>
      <div className="title-card-task">
        <h4>{task.title}</h4>
        <span className="time">{task.date}</span>
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
          Show more
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
