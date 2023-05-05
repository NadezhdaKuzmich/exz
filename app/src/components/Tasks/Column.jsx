import { useSelector, useDispatch } from "react-redux";
import {
  PushpinOutlined,
  LoadingOutlined,
  CarryOutOutlined,
  PlusOutlined,
  SearchOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Button, Tooltip, Badge, Input, DatePicker } from "antd";
import TaskItem from "./TaskItem";
import "./Column.modules.css";
import { dragTask } from "../../slices/BoardsSlice";
import { toggleModal } from "../../slices/ModalSlice";
import { useState } from "react";
const { RangePicker } = DatePicker;
const { Search } = Input;

const Column = ({ colId, handleDetails, handleAddTask }) => {
  const [search, setSearch] = useState();
  const [searchCol, setSearchCol] = useState();
  const { boards } = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const column = board.columns.find((column, i) => i === colId);
  const dispatch = useDispatch();

  const headerColumn = (name) => {
    switch (name) {
      case "todo": {
        return (
          <div className="done-title">
            <Badge count={column.tasks.length} offset={[12, 0]} color="#7785e4">
              <PushpinOutlined className="icon-column" />
              {column.name}
            </Badge>
            <div>
              <Button
                id={column.id}
                type="link"
                shape="circle"
                size="small"
                name="word"
                icon={<SearchOutlined />}
                onClick={chooseSearch}
              />
              <Button
                id={column.id}
                type="link"
                shape="circle"
                size="small"
                name="date"
                icon={<CalendarOutlined />}
                onClick={chooseSearch}
              />
            </div>
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

  const chooseSearch = (e) => {
    if (search === e.currentTarget.name) {
      setSearch(false);
    } else {
      setSearch(e.currentTarget.name);
      setSearchCol(e.currentTarget.id);
    }
  };

  const handleAdd = (e) => {
    handleAddTask(e.currentTarget.id);
    dispatch(toggleModal({ modal: "isOpenAddTask" }));
  };

  const handleOnDrop = (e) => {
    const { prevColIndex, prevTaskIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colId !== prevColIndex || taskIndex !== prevTaskIndex) {
      dispatch(dragTask({ colId, prevColIndex, taskIndex }));
    }
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
        {searchCol === column.id ? (
          search === "word" ? (
            <Search placeholder="input search text" style={{ width: "100%" }} />
          ) : search === "date" ? (
            <RangePicker />
          ) : null
        ) : null}
        {column.tasks.map((task, index) => (
          <TaskItem
            key={index}
            taskIndex={index}
            colId={colId}
            task={task}
            handleDetails={handleDetails}
          />
        ))}
        <Tooltip
          placement="right"
          title="Add new task"
          color="#fff"
          overlayInnerStyle={{ color: "#8fa5eb" }}
        >
          <Button
            type="text"
            className="add-task-btn"
            icon={<PlusOutlined />}
            id={column.name}
            onClick={handleAdd}
          >
            Add new task...
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Column;
