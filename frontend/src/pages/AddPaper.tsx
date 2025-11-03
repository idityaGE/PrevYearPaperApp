import { lazy, useState ,Suspense, useMemo } from "react";
import { universityData, examTypes, semesters, years } from "../data/universityData";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// import SelectButton from "../components/SelectButton";
const SelectButton = lazy(() => import("../components/SelectButton"));
// import InputBox from "../components/InputBox";
const InputBox = lazy(() => import("../components/InputBox"));

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";

export default function AddPaper() {
  const {token} = useAuthStore();

  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [selectedDept, setSelectedDept] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  const [selectedExamType, setSelectedExamType] = useState<string>("");


  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

const departments = useMemo(() => universityData.map(d => d.department), []);
const programs = useMemo(() =>
  universityData.find(d => d.department === selectedDept)?.programs || [],
  [selectedDept]
);
const semesterList = useMemo(() =>
  programs.find(p => p.name === selectedProgram)?.semesters || [],
  [selectedProgram, programs]
);
const subjects = useMemo(() => semesterList.flatMap(s => s.subjects) || [], [semesterList]);


  const handleSubmit = async () => {

    console.log(selectedDept,selectedExamType,selectedProgram,selectedSemester,selectedSubject,selectedYear);
    
  try {
    if (!token || token.length < 20) {
      return navigate("/signin");
    }

    if (
      !selectedDept ||
      !selectedProgram ||
      !selectedSubject ||
      !selectedSemester ||
      !selectedExamType ||
      !selectedYear ||
      !file
    ) {
      toast.error("Please fill all fields and select a file!");
      return;
    }

    // ✅ Step 1: Create FormData with all fields + file
    const formData = new FormData();
    formData.append("department", selectedDept);
    formData.append("program", selectedProgram);
    formData.append("subject", selectedSubject);
    formData.append("type", selectedExamType);
    formData.append("year",  String(Number(selectedYear)));
    formData.append("semester", String(Number(selectedSemester)));
    formData.append("file", file);

    //  Step 2: Make a single request to add paper (file + data together)
    const response = await axios.post(
      "http://localhost:3000/api/user/add-paper",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      toast.success("✅ Paper submitted for verification!");
      navigate("/");
    } else {
      toast.error("Something went wrong while adding the paper!");
    }
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.error || "Failed to add paper!");
  }
};


return (
  <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 flex justify-center items-center py-16 px-4">
    
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.7)] rounded-3xl p-10 md:p-14 max-w-2xl w-full">

      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 mb-4 text-center">
        📄 Upload Question Paper  
      </h1>

      <p className="text-gray-300 text-center mb-10 text-lg">
        Fill in the required details & upload the paper for verification ✅
      </p>

      <div className="grid grid-cols-1 gap-6">
      
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
          indicator={<KeyboardArrowDown />}
         
          disabled={!selectedDept}
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
          indicator={<KeyboardArrowDown />}
         
          disabled={!selectedProgram}
        >
          {subjects.map((subj) => (
            <Option key={subj} value={subj}>{subj}</Option>
          ))}
        </Select>

        {/* Suspense block */}
        <Suspense fallback={<div className="text-white">Loading...</div>}>

          <SelectButton placeholder="Select Exam Type" options={examTypes} onChange={(val) => setSelectedExamType(val)} value={selectedExamType || null} />
          <SelectButton placeholder="Select Year" options={years.map(String)} onChange={(val) => setSelectedYear(val)} value={selectedYear} />
          <SelectButton placeholder="Select Semester" options={semesters.map(String)} onChange={(val) => setSelectedSemester(val)} value={selectedSemester} />

          <InputBox
            type="file"
            placeholder="Choose Paper File"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.png"
          />
          
        </Suspense>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-indigo-400/30 transition-all duration-300"
        >
          🚀 Upload Paper
        </button>
      </div>
    </div>
  </div>
);

}
