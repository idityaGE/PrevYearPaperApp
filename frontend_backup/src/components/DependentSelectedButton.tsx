import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

interface i {
  name: string; 
  semesters: { number: number; subjects: string[] }[];
}

interface SelectButtonProps {
  placeholder: string;
  options: string[] | number[] | i;
  value?: string | null;
  onChange?: (val: string) => void;
  disabled?: boolean;
}

export default function DependentSelectButton({
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
      {Array.isArray(options) ? (
        options.map((opt) => (
          <Option key={opt.toString()} value={opt.toString()}>
            {opt.toString()}
          </Option>
        ))
      ) : (
        // ✅ If it's an object of type `i`, map its semesters/subjects
        options.semesters.flatMap((sem) =>
          sem.subjects.map((subj) => (
            <Option key={subj} value={subj}>
              {subj}
            </Option>
          ))
        )
      )}
    </Select>
  );
}
