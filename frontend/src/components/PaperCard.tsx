import React from "react";
import type { Paper } from "../types/paper";

type PaperCardProps = {
  paper: Paper;
};

function PaperCard({ paper }: PaperCardProps) {
  return (
    <div
      className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black 
                 border border-yellow-400/10 rounded-3xl shadow-2xl 
                 hover:shadow-yellow-500/40 hover:-translate-y-2 
                 transition-all duration-300 p-8 backdrop-blur-2xl
                 w-full max-w-[400px] mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
        <h4 className="text-2xl font-bold text-white leading-snug tracking-wide">
          {paper.subject.name}
        </h4>
        <span className="text-xs md:text-sm px-4 py-1.5 rounded-full 
                         bg-yellow-500/20 text-yellow-300 border border-yellow-400/40 uppercase font-semibold">
          {paper.type.replace("_", " ")}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-3 text-base text-gray-300 leading-relaxed">
        <p>
          <span className="font-semibold text-yellow-300">Department:</span>{" "}
          {paper.subject.semester.program.department.name}
        </p>
        <p>
          <span className="font-semibold text-yellow-300">Program:</span>{" "}
          {paper.subject.semester.program.name}
        </p>
        <p>
          <span className="font-semibold text-yellow-300">Semester:</span>{" "}
          {paper.subject.semester.number}
        </p>
        <p>
          <span className="font-semibold text-yellow-300">Year:</span> {paper.year}
        </p>
        {paper.subject.code && (
          <p>
            <span className="font-semibold text-yellow-300">Subject Code:</span>{" "}
            {paper.subject.code}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-center">
        <a
          href={paper.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 text-black font-semibold px-8 py-3 text-lg rounded-xl 
                     shadow-md shadow-yellow-500/30 hover:shadow-yellow-500/50 
                     hover:bg-yellow-400 transition-all duration-200"
        >
          View Paper
        </a>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-tr from-yellow-500/10 via-transparent to-transparent blur-2xl"></div>
    </div>
  );
}

export default React.memo(PaperCard);
