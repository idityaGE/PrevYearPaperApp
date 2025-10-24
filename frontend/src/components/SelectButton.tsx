import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import React from "react";

interface SelectButtonProps {
  placeholder: string;
  options: string[]| number[];
  value?: string | null;
  onChange?: (val: string) => void;
  disabled?: boolean;
}


export default React.memo(function SelectButton({
  placeholder,
  options,
  value,
  onChange,
  disabled,
}: SelectButtonProps) {
  return (
    <Select
      placeholder={placeholder}
      value={value || null}
      disabled={disabled}
      onChange={(_, val) => onChange && onChange(val as string)}
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 240,
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
    >
      {options.map((opt) => (
        <Option key={opt} value={opt}>
          {opt}
        </Option>
      ))}
    </Select>
  );
});
