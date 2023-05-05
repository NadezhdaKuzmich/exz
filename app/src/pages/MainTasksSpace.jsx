import { useSelector} from "react-redux";
import { useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import Column from "../components/Tasks/Column";
import DetailsTask from "./Forms/FormsModal/FormsForTask/DetailsTask";
import TaskAEditModal from "./Forms/FormsModal/FormsForTask/TaskEditModal";
import EmptyComponent from "../components/Empty/EmptyComponent";

const MainTasksSpace = () => {
  const { boards } = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board ? board.columns : [];
  const [ state, setState ] = useState();

  const handleDetails = (task) => {
    setState(task);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleDataSet = (date, dateString) => {
    setState({ ...state, limit: dateString });
  };

  return (
    <div className="container">
      <div className="wrap-boards">
        <SideBar />
        <div className="board-space">
          {boards.length > 0 ? (
            <>
              {columns.map((column, index) => (
                <Column key={index} colId={index}  handleDetails={handleDetails} />
              ))}
            </>
          ) : (
            <EmptyComponent />
          )}
        </div>
      </div>
      <DetailsTask {...state} />
      <TaskAEditModal {...state } handleChange={handleChange} handleDataSet={handleDataSet} />
    </div>
  );
};

export default MainTasksSpace;
