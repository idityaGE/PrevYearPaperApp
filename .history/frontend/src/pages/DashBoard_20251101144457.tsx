import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { universityData, examTypes, semesters, years } from "../data/universityData";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// import CustomButton from "../components/CustomButton";
const CustomButton =  lazy(() => import("../components/CustomButton"));
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAuthStore } from "../store/authStore";
// import PaperCard from "../components/PaperCard";
// import SelectButton from "../components/SelectButton";
const SelectButton = lazy(() => import("../components/SelectButton"));
const PaperCard = lazy(() => import("../components/PaperCard"));

// import MessageIcon from "../components/MessageIcon";
// import AdminResponse from "./AdminResponse";


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
}

export default function DashBoard() {
  const [selectedDept, setSelectedDept] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedExamType, setSelectedExamType] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  // const userId = 32; // example user ID
  // const [openMessages, setOpenMessages] = useState(false);

  const [papers, setPapers] = useState<any[]>([]); 
  const departments = useMemo(()=>universityData.map((d) => d.department),[])
  const programs = useMemo(()=> universityData.find((d) => d.department === selectedDept)?.programs || [],[selectedDept]);


  useEffect(() => {
    const item = localStorage.getItem("auth-store");
    if (!item) return;

    const parsed = JSON.parse(item);

    // data stored under "state"
    const { email, token } = parsed.state;

    if (email && token) {
      useAuthStore((state)=>state.setAuth( email, token));
    }
  }, []);

    const semesterList = useMemo(() => {
      return programs.find((p) => p.name === selectedProgram)?.semesters || [];
    }, [selectedProgram, programs]);


const subjects = useMemo(() => semesterList.flatMap((s) => s.subjects) || [], [semesterList]);


    const handleDeptChange = useCallback((_:any, val:any) => {
      setSelectedDept(val || "");
      setSelectedProgram("");
      setSelectedSubject("");
    }, []);


      const handleProgramChange = useCallback((_:any, val:any) => {
        setSelectedProgram(val || "");
        setSelectedSubject("");
      }, []);

      

      const handleSubjectChange = useCallback((_:any, val:any)  => {
        setSelectedSubject(val || "");
      }, []);

    const cache = useRef<Record<string, Paper[]>>({});

    const fetchPapers = useCallback(async () => {
      const key = `${selectedDept}-${selectedProgram}-${selectedSubject}-${selectedSemester}-${selectedExamType}`;
      
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
      });

      cache.current[key] = data;
      setPapers(data);
    }, [selectedDept, selectedProgram, selectedSubject, selectedSemester, selectedExamType]);


  return (
    <div className="bg-gradient-to-r from-gray-600 to-black via-gray-800 min-h-screen w-full p-5">
      {/* 📌 Selection Filters */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center mb-8">

        {/* Department */}
        <Select
          placeholder="Select Department"
          value={selectedDept || null}
          onChange={handleDeptChange}
          indicator={<KeyboardArrowDown />}
          sx={{
            width: "100%",
            minWidth: 180,
            maxWidth: 250,
          }}
        >
          {departments.map((dept) => (
            <Option key={dept} value={dept}>
              {dept}
            </Option>
          ))}
        </Select>

        {/* Program */}
        <Select
          placeholder="Select Program"
          value={selectedProgram || null}
          onChange={handleProgramChange}
          indicator={<KeyboardArrowDown />}
          sx={{
          width: "100%",
          minWidth: 180,
          maxWidth: 250,
        }}

          disabled={!selectedDept}
          title={!selectedDept ? "Please select department first" : ""}
        >
          {programs.map((prog) => (
            <Option key={prog.name} value={prog.name} >
              {prog.name}
            </Option>
          ))}
        </Select>

        {/* Subject */}
        <Select
          placeholder="Select Subject"
          value={selectedSubject || null}
          onChange={handleSubjectChange}
          indicator={<KeyboardArrowDown />}
          sx={{
            width: "100%",
            minWidth: 180,
            maxWidth: 250,
          }}
          disabled={!selectedProgram}
        >
          {subjects.map((subj) => (
            <Option key={subj} value={subj}>
              {subj}
            </Option>
          ))}
        </Select>



        {/* Exam Type */}




          {/* <SelectButton placeholder="Select Subject" options={subjects}     onChange={(val) => setSelectedYear(val ? Number(val) : null)} disabled={!selectedProgram} value={selectedSubject || null}/> */}
        <Suspense fallback={<div>Loading...</div>}>
          <SelectButton placeholder="Select Semester" options={semesters} onChange={(val)=>{setSelectedSemester(val ? Number(val) : null)}} value={selectedSemester ? String(selectedSemester):null}/>
          <SelectButton placeholder="Selected Exam Type" options={examTypes} onChange={(val)=>{setSelectedExamType(val)}} value={selectedExamType || null}/>
          <SelectButton placeholder="Selected year" options={years} onChange={(val)=>{setSelectedYear(val ? Number(val) : null)}} value={selectedYear ? String(selectedYear): null} />
        </Suspense>

      </div>

      {/* 📄 Selection Summary */}
      <div className="flex flex-col mt-8 max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 text-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">📄 Selection Summary</h2>
        <div className="space-y-3 text-lg">
          <div className="flex justify-between border-b border-white/20 pb-1">
            <span className="opacity-80">Department:</span>
            <span className="font-medium">{selectedDept || "—"}</span>
          </div>
          <div className="flex justify-between border-b border-white/20 pb-1">
            <span className="opacity-80">Program:</span>
            <span className="font-medium">{selectedProgram || "—"}</span>
          </div>
          <div className="flex justify-between border-b border-white/20 pb-1">
            <span className="opacity-80">Subject:</span>
            <span className="font-medium">{selectedSubject || "—"}</span>
          </div>
          <div className="flex justify-between border-b border-white/20 pb-1">
            <span className="opacity-80">Semester:</span>
            <span className="font-medium">{selectedSemester || "—"}</span>
          </div>
          <div className="flex justify-between border-b border-white/20 pb-1">
            <span className="opacity-80">Exam Type:</span>
            <span className="font-medium">{selectedExamType || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-80">Year:</span>
            <span className="font-medium">{selectedYear || "—"}</span>
          </div>
        </div>

        {/* 🔎 Search Button */}
        <Suspense fallback={<div>Loading...</div>}>
          <CustomButton
            text="Search Papers"
            onClick={fetchPapers}
          />
          </Suspense>
      </div>

     {/* // here virtulization can be use */}
   <div className="px-4 mt-10 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">

        {papers.map((paper, index) => paper.isVerified ? (
          <Suspense fallback={<div>Loading...</div>} key={index}>
            <PaperCard
              title={paper.title || "Untitled Paper"}
              description={paper.subject?.name || "No subject info"}
            />
          </Suspense>
        ) : null)}
      </div>
          {/* <MessageIcon userId={userId} onClick={() => setOpenMessages(!openMessages)} />
          {openMessages && <AdminResponse />} */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
