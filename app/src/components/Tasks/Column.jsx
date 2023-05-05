import { useSelector, useDispatch } from "react-redux";
import {
  PushpinOutlined,
  LoadingOutlined,
  CarryOutOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Tooltip, Badge } from "antd";
import TaskAddModal from "../../pages/Forms/FormsModal/FormsForTask/TaskAddModal";
import TaskItem from "./TaskItem";
import "./Column.modules.css";
import { dragTask } from "../../slices/BoardsSlice";
import { toggleModal } from "../../slices/ModalSlice";

const Column = ({ colId, handleDetails }) => {
  const { boards } = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const column = board.columns.find((column, i) => i === colId);
  const dispatch = useDispatch();

  const headerColumn = (name) => {
    switch (name) {
      case "todo": {
        return (
          <div className="done-title">
            <span>
              <Badge
                count={column.tasks.length}
                offset={[12, 0]}
                color="#7785e4"
              >
                <PushpinOutlined className="icon-column" />
                {column.name}
              </Badge>
            </span>
            <Tooltip placement="right" title="Add new task" color="#8fa5eb">
              <Button
                type="primary"
                size="small"
                className="form-button"
                icon={<PlusOutlined />}
                onClick={() =>
                  dispatch(toggleModal({ modal: "isOpenAddTask" }))
                }
              />
            </Tooltip>
          </div>
        );
      }
      case "in progress": {
        return (
          <span>
            <Badge count={column.tasks.length} offset={[12, 0]} color="#7fadf6">
              <LoadingOutlined className="icon-column" />
              {column.name}
            </Badge>
          </span>
        );
      }
      case "done": {
        return (
          <span>
            <Badge count={column.tasks.length} offset={[12, 0]} color="#77c1ab">
              <CarryOutOutlined className="icon-column" />
              {column.name}
            </Badge>
          </span>
        );
      }
      default:
        return false;
    }
  };

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colId !== prevColIndex) {
      dispatch(dragTask({ colId, prevColIndex, taskIndex }));
    }
    console.log("kkk");
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="column" onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
      <div className={`header-column ${column.name.split(" ").join("")}`}>
        {headerColumn(column.name)}
      </div>
      <div className="tasks-list">
        {column.tasks.map((task, index) => (
          <TaskItem
            key={index}
            taskIndex={index}
            colId={colId}
            task={task}
            handleDetails={handleDetails}
          />
        ))}
      </div>
      <TaskAddModal />
    </div>
  );
};

export default Column;