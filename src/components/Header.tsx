import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import NavButton from "./NavButton";
import { RiSearchFill, RiSearchLine } from "react-icons/ri";

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
];

export default function Header() {
  return (
    <header className="w-full bg-white border-b mx-auto sticky p-4 flex items-center justify-between">
      <h1 className="font-extrabol text-2xl">Outstagram</h1>
      <div className="flex items-center justify-around gap-2">
        {NAV_LIST.map(({ path, fillIcon, outlineIcon }, index) => (
          <NavButton key={index} path={path} fillIcon={fillIcon} outlineIcon={outlineIcon} />
        ))}
      </div>
    </header>
  );
}
