import { FC, useCallback, useState } from "react";

const NavSwitch: FC = () => {
  const [active, setActive] = useState<boolean>(false);

  const navSwitch = useCallback(() => {
    setActive((prev) => !prev);
  }, [active]);

  const firstSpanClassNames = `${
    active
      ? "translate-x-0 translate-y-0 -rotate-45"
      : "-translate-x-full -translate-y-[10px]"
  }`;
  const secondSpanClassNames = `${
    active
      ? "-translate-x-1/2 -translate-y-1/2 rotate-45"
      : "-translate-x-1/2 -translate-y-1/2"
  }`;
  const thirdSpanClassNames = `${
    active
      ? "-translate-x-full translate-y-0 -rotate-45"
      : "translate-x-[0px] translate-y-[10px]"
  }`;
  return (
    <div
      onClick={navSwitch}
      className="relative cursor-pointer w-[40px] h-[40px] shadow-lg shadow-black/30 rounded-sm border-2 border-black"
    >
      <div className="w-[80%] h-[80%] m-[10%] absolute">
        <span
          className={
            "bg-black  h-[2px] rounded-sm block absolute top-1/2 left-1/2 transform  transition-all duration-500 w-1/2  origin-[0_0]" +
            " " +
            firstSpanClassNames
          }
        ></span>
        <span
          className={
            "bg-black w-full h-[2px] rounded-sm block absolute top-1/2 left-1/2 transform transition-all duration-500" +
            " " +
            secondSpanClassNames
          }
        ></span>
        <span
          className={
            "bg-black  h-[2px] rounded-sm block absolute top-1/2  transform  transition-all duration-500 w-1/2 right-0 left-auto origin-[100%_0]" +
            " " +
            thirdSpanClassNames
          }
        ></span>
      </div>
    </div>
  );
};

export default NavSwitch;
