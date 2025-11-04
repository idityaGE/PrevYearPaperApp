import { lazy, Suspense, useCallback, useMemo, useRef, useState } from "react";
import { universityData, examTypes, semesters, years } from "../data/universityData";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
const CustomButton = lazy(() => import("../components/CustomButton"));
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { SpinnerButton } from "../components/SpineerButton";
import { Spinner } from "../components/ui/spinner";
import { Button } from "../components/ui/button";
const SelectButton = lazy(() => import("../components/SelectButton"));
const PaperCard = lazy(() => import("../components/PaperCard"));

type Paper = {
  id: number;
  type: string;
  year: number;
  fileUrl: string;
  isVerified: boolean;
  subject: {
    name: string;
    code: string;
    semester: {
      number: number;
      program: {
        department: {
          name: string;
        };
      };
    };
  };
};

export default function DashBoard() {
  const [selectedDept, setSelectedDept] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedExamType, setSelectedExamType] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [papers, setPapers] = useState<any[]>([]);

  const departments = useMemo(() => universityData.map((d) => d.department), []);
  const programs = useMemo(() =>
    universityData.find((d) => d.department === selectedDept)?.programs || [], [selectedDept]);

  const semesterList = useMemo(() =>
    programs.find((p) => p.name === selectedProgram)?.semesters || [], [selectedProgram, programs]);

  const subjects = useMemo(() => semesterList.flatMap((s) => s.subjects) || [], [semesterList]);

  const cache = useRef<Record<string, Paper[]>>({});

    const fetchPapers = useCallback(async () => {
      try {
        setLoading(true);

        const key = `${selectedDept}-${selectedProgram}-${selectedSubject}-${selectedSemester}-${selectedExamType}-${selectedYear}`;
        if (cache.current[key]) {
          setPapers(cache.current[key]);
          return;
        }

        const { data } = await axios.post("http://localhost:3000/api/user/papers", {
          dept: selectedDept,
          program: selectedProgram,
          sem: selectedSemester,
          subject: selectedSubject,
          examType: selectedExamType,
          year: selectedYear,
        });

        cache.current[key] = data;
        setPapers(data);

      } catch (error) {
        toast.error("Failed to fetch papers");
      } finally {
        setLoading(false);
      }
    }, [
      selectedDept,
      selectedProgram,
      selectedSubject,
      selectedSemester,
      selectedExamType,
      selectedYear
    ]);


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
    <div className="bg-gradient-to-r from-gray-600 to-black via-gray-800 min-h-screen w-full p-5">
      
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center mb-8">

        {/* Department */}
        <Select
          placeholder="Select Department"
          value={selectedDept || null}
          onChange={(_, val) => {
            setSelectedDept(val || ""); 
            setSelectedProgram(""); 
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
        <Select
          placeholder="Select Subject"
          value={selectedSubject || null}
          onChange={(_, val) => setSelectedSubject(val || "")}
          disabled={!selectedProgram}
          indicator={<KeyboardArrowDown />}
          sx={{ width: 250 }}
        >
          {subjects.map((subj) => (
            <Option key={subj} value={subj}>{subj}</Option>
          ))}
        </Select>

        <Suspense fallback={<div>Loading...</div>}>
          <SelectButton 
            placeholder="Select Semester"
            options={semesters}
            onChange={(val) => setSelectedSemester(val ? Number(val) : null)}
            value={selectedSemester !== null ? String(selectedSemester) : null}
          />

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

      {/* Summary */}
      <div className="flex flex-col mt-8 max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 text-white">

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
            <span className="opacity-80">{label}:</span>
            <span className="font-medium">{value || "—"}</span>
          </div>
        ))}

        <div className=" gap-3 mt-4 flex justify-center">
            <Suspense fallback={<div>Loading...</div>}>
            {
            loading ? (
              <Button variant="default" size="default" disabled className="gap-2">
                <Spinner className="animate-spin" />
                Searching...
              </Button>
            ) : (
              <CustomButton 
                text="Search Papers"
                onClick={fetchPapers}
                disabled={loading}
              />
            )
          }

            <CustomButton text="Reset" onClick={resetFilters} />
          </Suspense>
        </div>
      </div>

      {/* Papers Display */}
      <div className="px-4 mt-10 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
        {papers.map((paper, index) =>
          paper.isVerified ? (
            <Suspense fallback={<div>Loading...</div>} key={index}>
              <PaperCard title={paper.subject.name} description={paper.year} />
            </Suspense>
          ) : null
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
