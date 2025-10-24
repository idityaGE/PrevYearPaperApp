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

export default function AddPaper() {
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

/*
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
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

      // ✅ Step 1: Upload file to backend (which uploads to Cloudinary)
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fileUrl = uploadRes.data.url;
      if (!fileUrl) {
        toast.error("File upload failed!");
        return;
      }
      console.log(fileUrl);
      
      // ✅ Step 2: Submit paper data to backend with the fileUrl
      const response = await axios.post(
        "http://localhost:3000/api/user/add-paper",
        {
          department: selectedDept,
          program: selectedProgram,
          subject: selectedSubject,
          type: selectedExamType,
          year: selectedYear ? Number(selectedYear) : null,
          semester: selectedSemester ? Number(selectedSemester) : null,

          
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("✅ Paper submitted for verification!");
        navigate("/dashboard");
      } else {
        toast.error("Something went wrong while adding the paper!");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to add paper!");
    }
  };*/
  const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");
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
      navigate("/dashboard");
    } else {
      toast.error("Something went wrong while adding the paper!");
    }
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.error || "Failed to add paper!");
  }
};


  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-600 to-black via-gray-800 flex justify-center items-center py-16 px-4">
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
          📄 Upload Previous Year Paper
        </h1>
        <p className="text-white/90 text-lg mb-10">
          Fill in the details below to add a paper to the database.  
          Make sure all fields are correctly selected ✅
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
            sx={{ width: "100%" }}
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
            onChange={(_, val) => {
              setSelectedProgram(val || "");
              setSelectedSubject("");
            }}
            indicator={<KeyboardArrowDown />}
            sx={{ width: "100%" }}
            disabled={!selectedDept}
          >
            {programs.map((prog) => (
              <Option key={prog.name} value={prog.name}>
                {prog.name}
              </Option>
            ))}
          </Select>

          {/* Subject */}
          <Select
            placeholder="Select Subject"
            value={selectedSubject || null}
            onChange={(_, val) => setSelectedSubject(val || "")}
            indicator={<KeyboardArrowDown />}
            sx={{ width: "100%" }}
            disabled={!selectedProgram}
          >
            {subjects.map((subj) => (
              <Option key={subj} value={subj}>
                {subj}
              </Option>
            ))}
          </Select>

          {/* Semester */}
          <Suspense fallback={<div>Loading...</div>}>
            <SelectButton
              placeholder="Select Exam Type"
              options={examTypes}
              onChange={(val) => setSelectedExamType(val)}
              value={selectedExamType || null}
            />
            <SelectButton
              placeholder="Select Year"
              options={years.map(String)}   // make sure options are strings
              onChange={(val) => setSelectedYear(val)}
              value={selectedYear}
            />

            <SelectButton
              placeholder="Select Year"
              options={years.map(String)}   // make sure options are strings
              onChange={(val) => setSelectedYear(val)}
              value={selectedYear}
            />

            <SelectButton
              placeholder="Select Semester"
              options={semesters.map(String)}
              onChange={(val) => setSelectedSemester(val)}
              value={selectedSemester}
            />

          {/* File Upload */}
            <InputBox
              type="file"
              placeholder="Choose the paper"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.png"
            />

            <SelectButton
              placeholder="Select Semester"
              options={semesters.map(String)}
              onChange={(val) => setSelectedSemester(val)}
              value={selectedSemester}
            />
          </Suspense>





          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full py-3 bg-white text-orange-600 font-semibold rounded-full shadow-lg hover:scale-105 hover:bg-indigo-50 transition-all duration-300"
          >
            Upload Paper
          </button>
        </div>
      </div>
    </div>
  );
}
