import { Moon, Sun } from "lucide-react";

import { Button } from "../components/ui/button";

import { useTheme } from "../components/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button onClick={toggleTheme} variant="outline" size="icon">
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
