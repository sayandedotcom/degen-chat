import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" flex text-[14px] sm:text-[16px] text-white gap-4 lg:gap-6 xl:gap-8 lg:text-[18px] xl:text-[20px] mt-[30px]">
      <Link to="/get-trench">
        <p>get $trench</p>
      </Link>
      <Link to={"profile"}>
        <p>profile</p>
      </Link>
      <Link to={"/"}>
        <p>exit</p>
      </Link>
    </div>
  );
};

export default Navbar;
