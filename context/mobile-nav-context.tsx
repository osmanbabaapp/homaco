import {
  Context,
  createContext,
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
} from "react";

export type MNavbType = {
  open: boolean;
  toggleNavbar: MouseEventHandler<HTMLElement>;
};

export const MobileNavContext = createContext<MNavbType>({
  open: false,
  toggleNavbar: () => null,
});

const MobileNavContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleNavbar = useCallback(() => {
    console.log("Clicked !");
    setOpen((prev) => !prev);
  }, [open]);

  return (
    <MobileNavContext.Provider value={{ open, toggleNavbar }}>
      {children}
    </MobileNavContext.Provider>
  );
};

export default MobileNavContextProvider;
