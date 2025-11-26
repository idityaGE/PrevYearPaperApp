import { useCallback, useMemo, useRef, useState } from "react";
import { universityData, examTypes, years } from "../data/universityData";
import axios from "axios";
import { toast } from "sonner";
import type { Paper } from "../types/paper";
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
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search, RotateCcw, Loader2, ArrowDown } from "lucide-react";
import PaperCard from "../components/PaperCard";

export default function DashBoard() {
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [papers, setPapers] = useState<Paper[]>([]);

  const cache = useRef<Record<string, Paper[]>>({});
  const resultsRef = useRef<HTMLDivElement>(null);

  // Memo Filters
  const departments = useMemo(
    () => universityData.map((d) => d.department),
    []
  );

  const programs = useMemo(() => {
    return (
      universityData.find((d) => d.department === selectedDept)?.programs || []
    );
  }, [selectedDept]);

  const semesters = useMemo(() => {
    return programs.find((p) => p.name === selectedProgram)?.semesters || [];
  }, [selectedProgram, programs]);

  const subjects = useMemo(() => {
    return (
      semesters.find((s) => s.number === Number(selectedSemester))?.subjects ||
      []
    );
  }, [selectedSemester, semesters]);

  /** Fetch Papers */
  const fetchPapers = useCallback(async () => {
    const correctSemester = Number(selectedSemester);
    const correctYear = Number(selectedYear);

    try {
      setLoading(true);
      const key = `${selectedDept}-${selectedProgram}-${selectedSubject}-${correctSemester}-${selectedExamType}-${correctYear}`;

      if (cache.current[key]) {
        setPapers(cache.current[key]);
        toast.success("Loaded from cache");

        // Auto-scroll to results
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
        return;
      }

      const { data } = await axios.post(`${BACKEND_URL}/api/user/papers`, {
        dept: selectedDept,
        program: selectedProgram,
        sem: correctSemester,
        subject: selectedSubject,
        examType: selectedExamType,
        year: correctYear,
      });

      if (data.length === 0) {
        toast.info("No papers found for the selected criteria");
        setPapers([]);
        return;
      }

      cache.current[key] = data;
      setPapers(data);
      toast.success(`Found ${data.length} paper${data.length > 1 ? "s" : ""}`);

      // Auto-scroll to results after papers are loaded
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      console.error(error);
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
    selectedYear,
  ]);

  /** Reset All Filters */
  const resetFilters = () => {
    setSelectedDept("");
    setSelectedProgram("");
    setSelectedSubject("");
    setSelectedSemester("");
    setSelectedExamType("");
    setSelectedYear("");
    setPapers([]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <Card>
        <CardContent className="pt-2 space-y-6">
          {/* Row 1: Department & Program */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={selectedDept}
                onValueChange={(val) => {
                  setSelectedDept(val);
                  setSelectedProgram("");
                  setSelectedSemester("");
                  setSelectedSubject("");
                }}
              >
                <SelectTrigger id="department" className="w-full">
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
              <Label htmlFor="program">Program</Label>
              <Select
                value={selectedProgram}
                onValueChange={(val) => {
                  setSelectedProgram(val);
                  setSelectedSemester("");
                  setSelectedSubject("");
                }}
                disabled={!selectedDept}
              >
                <SelectTrigger id="program" className="w-full">
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
          </div>

          {/* Row 2: Semester & Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select
                value={selectedSemester}
                onValueChange={(val) => {
                  setSelectedSemester(val);
                  setSelectedSubject("");
                }}
                disabled={!selectedProgram}
              >
                <SelectTrigger id="semester" className="w-full">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((sem) => (
                    <SelectItem key={sem.number} value={String(sem.number)}>
                      Semester {sem.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
                disabled={!selectedSemester}
              >
                <SelectTrigger id="subject" className="w-full">
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
          </div>

          {/* Row 3: Exam Type & Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="examType">Exam Type</Label>
              <Select
                value={selectedExamType}
                onValueChange={setSelectedExamType}
              >
                <SelectTrigger id="examType" className="w-full">
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
              <Label htmlFor="year">Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger id="year" className="w-full">
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

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={fetchPapers}
              disabled={loading}
              className="w-full sm:flex-1"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search Papers
                </>
              )}
            </Button>
            <Button
              onClick={resetFilters}
              variant="outline"
              disabled={loading}
              className="w-full sm:w-auto"
              size="lg"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {papers.length > 0 && (
        <div ref={resultsRef} className="space-y-4 scroll-mt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Search Results
              </h2>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                Found {papers.length} paper{papers.length > 1 ? "s" : ""}
                <ArrowDown className="h-5 w-5 text-primary" />
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper) =>
              paper.isVerified ? (
                <PaperCard key={paper.id} paper={paper} />
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}
