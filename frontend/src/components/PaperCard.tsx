import React, { useState } from "react";
import type { Paper } from "../types/paper";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Calendar,
  BookOpen,
  GraduationCap,
  Building2,
  Loader2,
} from "lucide-react";

type PaperCardProps = {
  paper: Paper;
  customActions?: React.ReactNode;
  showDefaultAction?: boolean;
};

function PaperCard({
  paper,
  customActions,
  showDefaultAction = true,
}: PaperCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    const url = paper.fileUrl;

    if (url.includes("/raw/")) {
      e.preventDefault();
      setIsDownloading(true);

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

        // Small delay to show downloading state
        setTimeout(() => {
          setIsDownloading(false);
        }, 500);
      } catch (err) {
        console.error("Download error:", err);
        setIsDownloading(false);
      }
    }
  };

  const paperType = paper.type.replace("_", " ");

  return (
    <div className="group relative border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 bg-card flex flex-col h-full">
      {/* Paper Type Badge - Top Right Corner */}
      <div className="absolute top-0 right-0 z-10">
        <div className="px-3 py-1.5 text-xs font-medium bg-muted/80 backdrop-blur-sm border-b border-l border-border rounded-bl-lg">
          {paperType}
        </div>
      </div>

      <div className="relative p-6 space-y-4 flex-1 flex flex-col">
        {/* Subject Name */}
        <div className="pr-20 min-h-[3.5rem]">
          <h3 className="text-lg font-semibold leading-tight line-clamp-2">
            {paper.subject.name}
          </h3>
          {paper.subject.code && (
            <p className="text-xs text-muted-foreground font-mono mt-1">
              {paper.subject.code}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        <div className="space-y-2 text-sm flex-1">
          <div className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/30 border border-border/50">
            <span className="text-muted-foreground flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              Department
            </span>
            <span className="font-medium text-foreground text-right ml-2">
              {paper.subject.semester.program.department.name}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/30 border border-border/50">
            <span className="text-muted-foreground flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5 shrink-0" />
              Program
            </span>
            <span className="font-medium text-foreground truncate ml-2">
              {paper.subject.semester.program.name}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/30 border border-border/50">
              <span className="text-muted-foreground text-xs">Semester</span>
              <span className="font-semibold text-foreground">
                {paper.subject.semester.number}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/30 border border-border/50">
              <span className="text-muted-foreground text-xs flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Year
              </span>
              <span className="font-semibold text-foreground">
                {paper.year}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Action Button - At Bottom */}
        <div className="mt-auto space-y-2">
          {showDefaultAction && (
            <Button
              asChild={!isDownloading}
              variant="outline"
              disabled={isDownloading}
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
            >
              {isDownloading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Downloading...
                </div>
              ) : (
                <a
                  href={paper.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  View Paper
                  <ExternalLink className="h-3.5 w-3.5 opacity-50" />
                </a>
              )}
            </Button>
          )}
          {customActions}
        </div>
      </div>
    </div>
  );
}

export default React.memo(PaperCard);
