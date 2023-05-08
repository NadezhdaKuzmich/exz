import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import SideBar from "../components/SideBar/SideBar";
import Column from "../components/Tasks/Column";
import { findOverdueTask } from "../slices/BoardsSlice";
import TaskAddModal from "./Forms/FormsModal/FormsForTask/TaskAddModal";
import DetailsTask from "./Forms/FormsModal/FormsForTask/DetailsTask";
import TaskAEditModal from "./Forms/FormsModal/FormsForTask/TaskEditModal";
import EmptyComponent from "../components/Empty/EmptyComponent";

const MainTasksSpace = () => {
  const { boards } = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board ? board.columns : [];
  let filtered = [];
  columns.forEach((column) => {
    if (column.name !== "done") {
      column.tasks.forEach((task, index) => {
        if (Date.parse(task.limit) < new Date()) {
          filtered.push({ column: column.id, taskIndex: index });
        }
      });
    }
  });

  const useFetching = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(findOverdueTask({ filtered: filtered }));
    }, [dispatch])
  }
  useFetching();

  const [state, setState] = useState();
  const [status, setStatus] = useState();

  const handleAddTask = (name) => {
    setStatus(name);
  };

  const handleDetails = (task) => {
    setState(task);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleDataSet = (date, dateString) => {
    setState({ ...state, limit: dateString });
  };

  return (
    <div className="container-board">
      <div className="wrap-boards">
        <SideBar />
        {boards.length > 0 ? (
          <div className="wrap-board-space">
            <ul className={`board-space ${filtered.length === 0 ? "full-width" : ""}`}>
              {columns.map((column, index) => (
                <Column
                  key={index}
                  colId={index}
                  handleDetails={handleDetails}
                  handleAddTask={handleAddTask}
                  col={status}
                />
              ))}
            </ul>
          </div>
        ) : (
          <EmptyComponent />
        )}
      </div>

      <TaskAddModal column={status} />
      <DetailsTask {...state} />
      <TaskAEditModal
        {...state}
        handleChange={handleChange}
        handleDataSet={handleDataSet}
      />
    </div>
  );
};

export default MainTasksSpace;
