import { useSelector } from "react-redux";
import { Progress, Space } from "antd";

const ProgressComponent = () => {
  const { boards } = useSelector((store) => store.boards);
  const board = boards.find((board) => board.isActive);

  const getAllTask = () => {
    let countTask = 0;
    board.columns.forEach((column) => {
      return (countTask += column.tasks.length);
    });
    return countTask;
  };

  const getTaskCount = (colName) => {
    const column = board?.columns.find((column) => column.name === colName);
    const percent = Math.floor((column.tasks.length / getAllTask()) * 100);
    return percent;
  };

  return (
    <div style={{ width: 100 }}>
      <Progress
        // type="circle"
        percent={getTaskCount("done")}
        strokeColor={{ "0%": "#7fadf6", "100%": "#87d068" }}
      />
    </div>
  );
};

export default ProgressComponent;
