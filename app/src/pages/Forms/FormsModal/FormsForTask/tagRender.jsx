import { Tag } from "antd";

export const tagRender = (props) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      size="large"
      color="geekblue"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        fontSize: "14px",
        marginRight: 3,
        padding: "4px 8px",
      }}
    >
      {label}
    </Tag>
  );
};
