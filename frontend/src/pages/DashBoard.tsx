import { useState } from "react";
import { universityData, examTypes, semesters, years } from "../data/universityData";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import PaperCard from "../components/PaperCard";
import SelectButton from "../components/SelectButton";
import MessageIcon from "../components/MessageIcon";
import AdminResponse from "./AdminResponse";

export default function DashBoard() {
  const [selectedDept, setSelectedDept] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedExamType, setSelectedExamType] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const userId = 32; // example user ID
  const [openMessages, setOpenMessages] = useState(false);
  const [papers, setPapers] = useState<any[]>([]); // ✅ store papers here

  const departments = universityData.map((d) => d.department);
  const programs =
    universityData.find((d) => d.department === selectedDept)?.programs || [];
  const semesterList =
    programs.find((p) => p.name === selectedProgram)?.semesters || [];
  const subjects = semesterList.flatMap((s) => s.subjects) || [];

  return (
    <div className="bg-gradient-to-r from-gray-600 to-black via-gray-800 min-h-screen w-full p-5">
      {/* 📌 Selection Filters */}
      <div className="flex flex-wrap gap-15">
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
          sx={{ width: 240 }}
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
          sx={{ width: 240 }}
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
          onChange={(_, val) => setSelectedSubject(val || "")}
          indicator={<KeyboardArrowDown />}
          sx={{ width: 240 }}
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
          <SelectButton placeholder="Select Semester" options={semesters} onChange={(val)=>{setSelectedSemester(val ? Number(val) : null)}} value={selectedSemester ? String(selectedSemester):null}/>
          <SelectButton placeholder="Selected Exam Type" options={examTypes} onChange={(val)=>{setSelectedExamType(val)}} value={selectedExamType || null}/>
          <SelectButton placeholder="Selected year" options={years} onChange={(val)=>{setSelectedYear(val ? Number(val) : null)}} value={selectedYear ? String(selectedYear): null} />
        
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
        <CustomButton
          text="Search Papers"
          onClick={async () => {
            try {
              const response = await axios.post("http://localhost:3000/api/user/papers", {
                dept: selectedDept,
                program: selectedProgram,
                sem: selectedSemester,
                subject: selectedSubject,
                examType: selectedExamType,
              });

              const data = response.data;

              if (!data || data.length === 0) {
                toast.error("No papers found for the selected filters.");
                return;
              }

              toast.success(`✅ Found ${data.length} papers!`);
              setPapers(data); // ✅ Save papers to state
            } catch (err) {
              console.error(err);
              toast.error("Failed to fetch papers.");
            }
          }}
        />
      </div>

      {/* 📚 Papers List */}
      <div className=" pl-10 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {papers.map((paper, index) => paper.isVerified ? (
          <PaperCard
            key={index}
            title={paper.title || "Untitled Paper"}
            description={paper.subject?.name || "No subject info"}
          />
        ) : null)}
      </div>
          {/* <MessageIcon userId={userId} onClick={() => setOpenMessages(!openMessages)} />
          {openMessages && <AdminResponse />} */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
