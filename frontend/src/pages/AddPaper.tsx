import { useCallback, useMemo, useState } from "react";
import { universityData, examTypes, years } from "../data/universityData";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";
import { Loader2, UploadCloud, FileText, CheckCircle2 } from "lucide-react";
import { BACKEND_URL } from "../lib/config";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

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
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle file change and compression
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      return;
    }

    if (selectedFile.type.startsWith("image/")) {
      try {
        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedImg = await imageCompression(selectedFile, options);
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
  const departments = useMemo(
    () => universityData.map((d) => d.department),
    []
  );
  const programs = useMemo(
    () =>
      universityData.find((d) => d.department === selectedDept)?.programs || [],
    [selectedDept]
  );
  const semesters = useMemo(
    () => programs.find((p) => p.name === selectedProgram)?.semesters || [],
    [selectedProgram, programs]
  );
  const subjects = useMemo(
    () => semesters.find((s) => s.number === selectedSemester)?.subjects || [],
    [selectedSemester, semesters]
  );

  // Handle form submit
  const handleSubmit = useCallback(async () => {
    if (!token || token.length < 20) return navigate("/signin");

    if (
      !selectedDept ||
      !selectedProgram ||
      !selectedSemester ||
      !selectedSubject ||
      !selectedExamType ||
      !selectedYear ||
      !file
    ) {
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
        `${BACKEND_URL}/api/user/add-paper`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setIsSuccess(true);
        toast.success("Paper submitted successfully!");
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
  }, [
    token,
    selectedDept,
    selectedProgram,
    selectedSemester,
    selectedSubject,
    selectedExamType,
    selectedYear,
    file,
    navigate,
  ]);

  if (isSuccess) {
    return (
      <div className="w-full max-w-3xl mx-auto py-20 px-4 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Thank You!</h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Your contribution has been submitted successfully. It will be
              reviewed and added to the library shortly.
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            <Button variant="outline" onClick={() => navigate("/")}>
              Go to Dashboard
            </Button>
            <Button onClick={() => window.location.reload()}>
              Upload Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Upload Question Paper
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Help us grow the library by contributing previous year question
            papers. Ensure the details are accurate for quick verification.
          </p>
        </div>

        <Separator />

        {/* Form Section */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-base font-medium">Department</Label>
            <Select
              onValueChange={(val) => {
                setSelectedDept(val);
                setSelectedProgram("");
                setSelectedSemester(null);
                setSelectedSubject("");
              }}
            >
              <SelectTrigger className="h-12 text-base w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Program</Label>
            <Select
              disabled={!selectedDept}
              onValueChange={(val) => {
                setSelectedProgram(val);
                setSelectedSemester(null);
                setSelectedSubject("");
              }}
            >
              <SelectTrigger className="h-12 text-base w-full">
                <SelectValue placeholder="Select Program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((prog) => (
                  <SelectItem key={prog.name} value={prog.name}>
                    {prog.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Semester</Label>
            <Select
              disabled={!selectedProgram}
              onValueChange={(val) => setSelectedSemester(Number(val))}
            >
              <SelectTrigger className="h-12 text-base w-full">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((s) => (
                  <SelectItem key={s.number} value={String(s.number)}>
                    Semester {s.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Subject</Label>
            <Select
              disabled={!selectedSemester}
              onValueChange={(val) => setSelectedSubject(val)}
            >
              <SelectTrigger className="h-12 text-base w-full">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subj) => (
                  <SelectItem key={subj} value={subj}>
                    {subj}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Exam Type</Label>
            <Select onValueChange={(val) => setSelectedExamType(val)}>
              <SelectTrigger className="h-12 text-base w-full">
                <SelectValue placeholder="Select Exam Type" />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Year</Label>
            <Select onValueChange={(val) => setSelectedYear(Number(val))}>
              <SelectTrigger className="h-12 text-base w-full">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium">Upload File</Label>
          <div className="border-2 border-dashed rounded-xl p-10 text-center hover:bg-muted/50 transition-colors cursor-pointer relative group">
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-background rounded-full shadow-sm group-hover:scale-110 transition-transform">
                <UploadCloud className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium">
                  {file ? file.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-sm text-muted-foreground">
                  PDF, JPG or PNG (max. 5MB)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            size="lg"
            disabled={loading}
            className="w-full md:w-auto min-w-[200px] h-12 text-base"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading...
              </>
            ) : (
              "Submit Paper"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
