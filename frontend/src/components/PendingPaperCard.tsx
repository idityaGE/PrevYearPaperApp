import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BACKEND_URL } from "../lib/config";
import { useAuthStore } from "../store/authStore";
import PaperCard from "./PaperCard";
import { Button } from "@/components/ui/button";
import { CheckCircle, Eye, Loader2 } from "lucide-react";
import type { Paper } from "../types/paper";

function PendingPapers() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();
  const [downloadingIds, setDownloadingIds] = useState<Record<number, boolean>>(
    {}
  );

  const fetchPapers = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/pending-papers`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setPapers(response.data);
    } catch (error) {
      console.error("Error fetching pending papers:", error);
      toast.error("Failed to fetch pending papers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleDownload = async (e: React.MouseEvent, paper: Paper) => {
    const url = paper.fileUrl;

    if (url.includes("/raw/")) {
      e.preventDefault();
      setDownloadingIds((prev) => ({ ...prev, [paper.id]: true }));

      try {
        const fileName = url.split("/").pop() || "paper";
        const finalFileName = fileName.endsWith(".pdf")
          ? fileName
          : `${fileName}.pdf`;

        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = finalFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);

        setTimeout(() => {
          setDownloadingIds((prev) => ({ ...prev, [paper.id]: false }));
        }, 500);
      } catch (err) {
        console.error("Download error:", err);
        setDownloadingIds((prev) => ({ ...prev, [paper.id]: false }));
      }
    }
  };

  const handleVerify = async (id: number) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/admin/verify-paper/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Paper verified successfully!");
      setPapers(papers.filter((paper) => paper.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify paper.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pending Papers</h2>
        <div className="text-muted-foreground">
          {papers.length} {papers.length === 1 ? "paper" : "papers"} pending
          review
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-lg bg-muted/10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-muted-foreground">
            Loading papers...
          </p>
          <p className="text-sm text-muted-foreground/80 mt-1">
            Please wait while we load your papers.
          </p>
        </div>
      ) : papers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-lg bg-muted/10">
          <p className="text-lg font-medium text-muted-foreground">
            No pending papers found
          </p>
          <p className="text-sm text-muted-foreground/80 mt-1">
            All papers have been reviewed or none have been submitted yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              showDefaultAction={false}
              customActions={
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild={!downloadingIds[paper.id]}
                    disabled={downloadingIds[paper.id]}
                  >
                    {downloadingIds[paper.id] ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Downloading
                      </div>
                    ) : (
                      <a
                        href={paper.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => handleDownload(e, paper)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </a>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleVerify(paper.id)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verify
                  </Button>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingPapers;
