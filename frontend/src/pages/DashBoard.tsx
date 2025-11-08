import { lazy, Suspense, useCallback, useMemo, useRef, useState } from "react";
import { universityData, examTypes,  years } from "../data/universityData";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
const CustomButton = lazy(() => import("../components/CustomButton"));
const SelectButton = lazy(() => import("../components/SelectButton"));
const PaperCard = lazy(() => import("../components/PaperCard"));
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "../components/ui/spinner";
import { Button } from "../components/ui/button";
import type { Paper } from "../types/paper";
import { BACKEND_URL } from "../lib/config";

// type Paper = {
//   id: number;
//   type: string;
//   year: number;
//   fileUrl: string;
//   isVerified: boolean;
//   subject: {
//     name: string;
//     code: string;
//     semester: {
//       number: number;
//       program: {
//         department: { name: string };
//       };
//     };
//   };
// };

export default function DashBoard() {
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [papers, setPapers] = useState<Paper[]>([]);

  const cache = useRef<Record<string, Paper[]>>({});

  // Memo Filters
  const departments = useMemo(() => universityData.map(d => d.department), []);

  const programs = useMemo(() => {
    return universityData.find(d => d.department === selectedDept)?.programs || [];
  }, [selectedDept]);

  const semesters = useMemo(() => {
    return programs.find(p => p.name === selectedProgram)?.semesters || [];
  }, [selectedProgram, programs]);

  const subjects = useMemo(() => {
    return semesters.find(s => s.number === selectedSemester)?.subjects || [];
  }, [selectedSemester, semesters]);

  /** Fetch Papers */
    const fetchPapers = useCallback(async () => {



      try {
        setLoading(true);
        const key = `${selectedDept}-${selectedProgram}-${selectedSubject}-${selectedSemester}-${selectedExamType}-${selectedYear}`;

        if (cache.current[key]) {
          setPapers(cache.current[key]);
          return;
        }

        const { data } = await axios.post(`${BACKEND_URL}/api/user/papers`, {
          dept: selectedDept,
          program: selectedProgram,
          sem: selectedSemester,
          subject: selectedSubject,
          examType: selectedExamType,
          year: selectedYear,
        });
        console.log(data);
        
        cache.current[key] = data;
        setPapers(data);
      } catch {
        toast.error("Failed to fetch papers");
      } finally {
        setLoading(false);
      }
    }, [selectedDept, selectedProgram, selectedSubject, selectedSemester, selectedExamType, selectedYear]);

    /** Reset All Filters */
    const resetFilters = () => {
      setSelectedDept("");
      setSelectedProgram("");
      setSelectedSubject("");
      setSelectedSemester(null);
      setSelectedExamType("");
      setSelectedYear(null);
      setPapers([]);
    };

  return (
    <div className="bg-[#0b0c0d] min-h-screen w-full p-5 text-white">

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center mb-8">

        {/* Department */}
        <Select
          placeholder="Select Department"
          value={selectedDept || null}
          onChange={(_, val) => {
            setSelectedDept(val || "");
            setSelectedProgram("");
            setSelectedSemester(null);
            setSelectedSubject("");
          }}
          indicator={<KeyboardArrowDown />}
          sx={{ width: 250 }}
        >
          {departments.map((dept) => (
            <Option key={dept} value={dept}>{dept}</Option>
          ))}
        </Select>

        {/* Program */}
        <Select
          placeholder="Select Program"
          value={selectedProgram || null}
          onChange={(_, val) => {
            setSelectedProgram(val || "");
            setSelectedSemester(null);
            setSelectedSubject("");
          }}
          disabled={!selectedDept}
          indicator={<KeyboardArrowDown />}
          sx={{ width: 250 }}
        >
          {programs.map((prog) => (
            <Option key={prog.name} value={prog.name}>{prog.name}</Option>
          ))}
        </Select>

        {/* Subject */}
        <SelectButton
          placeholder="Select Semester"
          options={semesters.map(s => s.number)}
          onChange={(val) => setSelectedSemester(val ? Number(val) : null)}
          value={selectedSemester !== null ? String(selectedSemester) : null}
          disabled={!selectedProgram}
        />
        <Select
          placeholder="Select Subject"
          value={selectedSubject || null}
          onChange={(_, val) => setSelectedSubject(val || "")}
          disabled={!selectedSemester}
          indicator={<KeyboardArrowDown />}
          sx={{ width: 250 }}
        >
          {subjects.map((subj) => (
            <Option key={subj} value={subj}>{subj}</Option>
          ))}
        </Select>

        <Suspense fallback={<div>Loading...</div>}>

          <SelectButton
            placeholder="Select Exam Type"
            options={examTypes}
            onChange={(val) => setSelectedExamType(val)}
            value={selectedExamType || null}
          />

          <SelectButton
            placeholder="Select Year"
            options={years}
            onChange={(val) => setSelectedYear(val ? Number(val) : null)}
            value={selectedYear !== null ? String(selectedYear) : null}
          />
        </Suspense>
      </div>

      {/* Summary Box */}
      <div className="flex flex-col mt-8 max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">

        <h2 className="text-2xl font-semibold mb-4 text-center">📄 Selection Summary</h2>

        {[
          ["Department", selectedDept],
          ["Program", selectedProgram],
          ["Subject", selectedSubject],
          ["Semester", selectedSemester],
          ["Exam Type", selectedExamType],
          ["Year", selectedYear],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between border-b border-white/20 pb-1 text-lg">
            <span>{label}:</span>
            <span className="font-medium">{value || "—"}</span>
          </div>
        ))}

        <div className="gap-3 mt-4 flex justify-center">
          {loading ? (
            <Button disabled className="gap-2">
              <Spinner className="animate-spin" /> Searching...
            </Button>
          ) : (
            <Suspense>
              <CustomButton text="Search Papers" onClick={fetchPapers} />
            </Suspense>
          )}

          <Suspense>
            <CustomButton text="Reset" onClick={resetFilters} />
          </Suspense>
        </div>
      </div>

      {/* Papers Display */}
      <div className="px-4 mt-10 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
        {papers.map((paper) =>
          paper.isVerified ? (
            <Suspense key={paper.id}>
              <PaperCard paper={paper} />
            </Suspense>
          ) : null
        )}
      </div>

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}
