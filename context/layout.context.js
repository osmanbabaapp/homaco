import { useState, useEffect, useCallback, createContext } from "react";

// create context
export const LayoutContext = createContext();

// context provider
export default function LayoutContextProvider(props) {
  // states
  const [device, setDevice] = useState(null);
  const [sideOpen, setSideOpen] = useState(true);
  const [theme, setTheme] = useState("light");
  // functions
  const ToggleSideOpen = useCallback(() => {
    setSideOpen((prev) => !prev);
  }, []);

  // change theme
  const toggleChangeTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  // Component lifecycles
  return (
    <LayoutContext.Provider
      value={{
        device,
        sideOpen,
        ToggleSideOpen,
        toggleChangeTheme,
        theme,
      }}
    >
      {props.children}
    </LayoutContext.Provider>
  );
}
