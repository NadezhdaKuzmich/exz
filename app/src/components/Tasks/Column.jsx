import { useSelector, useDispatch } from "react-redux";
import {
  PushpinOutlined,
  LoadingOutlined,
  CarryOutOutlined,
  PlusOutlined,
  SearchOutlined,
  CalendarOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { Button, Tooltip, Badge, Input, DatePicker } from "antd";
import TaskItem from "./TaskItem";
import styles from "./Column.module.css";
import { searchTask, rangeDateTask, dragTask } from "../../slices/BoardSlice/BoardsSlice";
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
          <Badge count={column.tasks.length} offset={[12, 0]} color="#7785e4">
            <PushpinOutlined className={styles.icon} />
            {column.name}
          </Badge>
        );
      }
      case "in progress": {
        return (
          <span>
            <Badge count={column.tasks.length} offset={[12, 0]} color="#7fadf6">
              <LoadingOutlined className={styles.icon} />
              {column.name}
            </Badge>
          </span>
        );
      }
      case "done": {
        return (
          <span>
            <Badge count={column.tasks.length} offset={[12, 0]} color="#77c1ab">
              <CarryOutOutlined className={styles.icon} />
              {column.name}
            </Badge>
          </span>
        );
      }
      case "overdue": {
        return (
          <span>
            <Badge count={column.tasks.length} offset={[12, 0]} color="#ff4d4fa1">
            <ClockCircleOutlined className={styles.icon} />
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
      dispatch(searchTask({ searchCol: searchCol, titleSearch: "" }));
    } else {
      setSearch(e.currentTarget.name);
      setSearchCol(e.currentTarget.id);
    }
  };

  const handleSearch = (e) => {
    dispatch(searchTask({ searchCol: searchCol, titleSearch: e.target.value }));
  };

  const handleDateRange = (dates, dataString) => {
    if (dates) {
      dispatch(
        rangeDateTask({
          searchCol: searchCol,
          startDate: dataString[0],
          endDate: dataString[1],
        })
      );
    } else {
      dispatch(searchTask({ searchCol: searchCol, titleSearch: "" }));
    }
  };

  const handleAdd = (e) => {
    handleAddTask(e.currentTarget.id);
    dispatch(toggleModal({ modal: "isOpenAddTask" }));
  };

  const getStatusName = (e) => {
    handleAddTask(e.currentTarget.id);
  }

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
    <li
      className={`${styles.column} ${column.name === "overdue" ? styles.overdueCol : ""} ${column.name === "overdue" && column.tasks.length === 0 ? styles.hide : "" }`}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      onClick={getStatusName}
      id={column.name}
    >
      <div className={`${styles.header} ${styles[column.name.split(" ").join("")]}`}>
        <div className={styles.title}>
          {headerColumn(column.name)}
          {column.name !== "overdue" ? (
            <div>
              <Button
                id={column.id}
                type="link"
                shape="circle"
                size="small"
                name="word"
                icon={
                  <SearchOutlined
                    className={search === "word" ? styles.activeSearch : ""}
                  />
                }
                onClick={chooseSearch}
              />
              <Button
                id={column.id}
                type="link"
                shape="circle"
                size="small"
                name="date"
                icon={
                  <CalendarOutlined
                    className={search === "date" ? styles.activeSearch : ""}
                  />
                }
                onClick={chooseSearch}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.taskWrap}>
        <div className={styles.taskBox}>
          <ul className={styles.tasksList}>
            {column.name !== "overdue" ? (
              searchCol === column.id ? (
                search === "word" ? (
                  <Search
                    placeholder="input search text"
                    style={{ width: "100%" }}
                    onChange={handleSearch}
                  />
                ) : search === "date" ? (
                  <RangePicker onChange={handleDateRange} />
                ) : null
              ) : null
            ) : null}
            {column.tasks.map((task, index) => {
              if (task.visible) {
                return (
                  <TaskItem
                    key={index}
                    taskIndex={index}
                    colId={colId}
                    task={task}
                    handleDetails={handleDetails}
                  />
                );
              } else {
                return null;
              }
            })}
          </ul>
          {column.name !== "overdue" ? (
            <Tooltip
              placement="right"
              title="Add new task"
              color="#fefefee6"
              overlayClassName="tooltip"
              overlayInnerStyle={{ color: "#8fa5eb" }}
            >
              <Button
                type="text"
                className={styles.taskBtn}
                icon={<PlusOutlined />}
                id={column.name}
                onClick={handleAdd}
              >
                Add new task...
              </Button>
            </Tooltip>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default Column;