import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { universityData, examTypes, years } from "../data/universityData";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
const SelectButton = lazy(() => import("../components/SelectButton"));
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import Button from "@mui/joy/Button";
import { Loader2 } from "lucide-react";
import FileInputBox from "../components/FileInputBox";

export default function AddPaper() {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle file change and compression
  const handleFileChange = async (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      return;
    }

    if (selectedFile.type.startsWith("image/")) {
      try {
        const options = { maxSizeMB: 2, maxWidthOrHeight: 1920, useWebWorker: true };
        const compressedImg = await imageCompression(selectedFile, options);
        console.log("Original:", selectedFile.size / 1024 / 1024, "MB");
        console.log("Compressed:", compressedImg.size / 1024 / 1024, "MB");
        setFile(compressedImg);
      } catch (err) {
        console.error("Image compression failed", err);
        setFile(selectedFile);
      }
    } else {
      setFile(selectedFile);
    }
  };

  // Memoized options
  const departments = useMemo(() => universityData.map(d => d.department), []);
  const programs = useMemo(
    () => universityData.find(d => d.department === selectedDept)?.programs || [],
    [selectedDept]
  );
  const semesters = useMemo(
    () => programs.find(p => p.name === selectedProgram)?.semesters || [],
    [selectedProgram, programs]
  );
  const subjects = useMemo(
    () => semesters.find(s => s.number === selectedSemester)?.subjects || [],
    [selectedSemester, semesters]
  );

  // Handle form submit
  const handleSubmit = useCallback(async () => {
    if (!token || token.length < 20) return navigate("/signin");

    if (!selectedDept || !selectedProgram || !selectedSemester || !selectedSubject || !selectedExamType || !selectedYear || !file) {
      toast.error("Please fill all fields and select a file!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("department", selectedDept);
      formData.append("program", selectedProgram);
      formData.append("semester", String(selectedSemester));
      formData.append("subject", selectedSubject);
      formData.append("type", selectedExamType);
      formData.append("year", String(selectedYear));
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3000/api/user/add-paper",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        toast.success("Paper submitted for verification!");
        navigate("/");
      } else if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.error("Something went wrong while adding the paper!");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to add paper!");
    } finally {
      setLoading(false);
    }
  }, [token, selectedDept, selectedProgram, selectedSemester, selectedSubject, selectedExamType, selectedYear, file, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient from-black via-gray-900 to-gray-800 flex justify-center items-center py-16 px-4">
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.7)] rounded-3xl p-10 md:p-14 max-w-2xl w-full">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 mb-4 text-center">
          Upload Question Paper
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
              setSelectedSemester(null);
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
              setSelectedSemester(null);
              setSelectedSubject("");
            }}
            disabled={!selectedDept}
            indicator={<KeyboardArrowDown />}
          >
            {programs.map((prog) => (
              <Option key={prog.name} value={prog.name}>{prog.name}</Option>
            ))}
          </Select>

          {/* Semester */}
          <SelectButton
            placeholder="Select Semester"
            options={semesters.map(s => s.number.toString())}
            value={selectedSemester !== null ? String(selectedSemester) : null}
            onChange={(val) => setSelectedSemester(val ? Number(val) : null)}
            disabled={!selectedProgram}
          />

          {/* Subject */}
          <Select
            placeholder="Select Subject"
            value={selectedSubject || null}
            onChange={(_, val) => setSelectedSubject(val || "")}
            disabled={!selectedSemester}
            indicator={<KeyboardArrowDown />}
          >
            {subjects.map((subj) => (
              <Option key={subj} value={subj}>{subj}</Option>
            ))}
          </Select>

          {/* Exam Type & Year */}
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <SelectButton
              placeholder="Select Exam Type"
              options={examTypes}
              value={selectedExamType || null}
              onChange={(val) => setSelectedExamType(val)}
            />
            <SelectButton
              placeholder="Select Year"
              options={years.map(String)}
              value={selectedYear !== null ? String(selectedYear) : null}
              onChange={(val) => setSelectedYear(val ? Number(val) : null)}
            />
          </Suspense>

          {/* File Upload */}
          <FileInputBox
            name="Upload Paper"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-6 w-full py-6 font-semibold rounded-xl shadow-lg transition-all duration-300 
            bg-gradient from-indigo-500 to-purple-600 text-white 
            hover:scale-105 hover:shadow-indigo-400/30
            ${loading ? "cursor-not-allowed opacity-90 hover:scale-100" : ""}`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                Uploading...
              </div>
            ) : (
              " Upload Paper"
            )}
          </Button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
