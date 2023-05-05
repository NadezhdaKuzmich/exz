import NavBarUser from "../components/Headers/NavBarHomeUser/NavBarUser";
import MainTasksSpace from "./MainTasksSpace";

const HomeUser = () => {

  return (
    <>
      <NavBarUser />
      <div className="work-space">
        <MainTasksSpace />
      </div>
    </>
  );
};

export default HomeUser;