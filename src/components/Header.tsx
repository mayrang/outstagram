import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import NavButton from "./NavButton";
import { RiSearchFill, RiSearchLine } from "react-icons/ri";
import { BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";

const NAV_LIST = [
  {
    fillIcon: <AiFillHome />,
    outlineIcon: <AiOutlineHome />,
    path: "/",
  },
  {
    fillIcon: <RiSearchFill />,
    outlineIcon: <RiSearchLine />,
    path: "/search",
  },
  {
    fillIcon: <BsPlusSquareFill />,
    outlineIcon: <BsPlusSquare />,
    path: "/new",
  },
];

export default function Header() {
  return (
    <header className="w-full bg-white border-b mx-auto sticky p-4 flex items-center justify-between">
      <h1 className="font-extrabold text-4xl">Outstagram</h1>
      <div className="flex items-center justify-around gap-4">
        {NAV_LIST.map(({ path, fillIcon, outlineIcon }, index) => (
          <NavButton key={index} path={path} fillIcon={fillIcon} outlineIcon={outlineIcon} />
        ))}
        <div className="bg-gradient-to-r from-red-500 to-yellow-500 p-1 rounded overflow-hidden ">
          <button className="bg-white w-full py-2 px-1">Sign In</button>
        </div>
      </div>
    </header>
  );
}
