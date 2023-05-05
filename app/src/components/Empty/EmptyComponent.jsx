import { useDispatch } from "react-redux";
import { Button, Tooltip, Empty } from "antd";
import { toggleModal } from "../../slices/ModalSlice";

const EmptyComponent = () => {
  const dispatch = useDispatch();

  return (
    <div className="empty-container">
      <Empty
        imageStyle={{
          height: 200,
        }}
        description={
          <span>
            This Board is empty.
            <br />
            <strong>Create new one to get started.</strong>
          </span>
        }
      >
        <Tooltip placement="bottom" title="Add new board" color="#979dcc">
          <Button
            type="primary"
            className="btn-st"
            onClick={() => dispatch(toggleModal({ modal: "isOpenAddBoard" }))}
            >
            Create Now
          </Button>
        </Tooltip>
      </Empty>
    </div>
  );
};

export default EmptyComponent;