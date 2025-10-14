// // // src/data/universityData.ts

// // // 🏛️ Departments
// // export const departments = [
// //   "Computer Science",
// //   "Mathematics",
// //   "Physics",
// //   "Chemistry",
// //   "Mechanical Engg",
// //   "Civil Engg",
// //   "Electrical Engg",
// //   "Electronics",
// // ];

// // // 🎓 Programs (grouped by department)
// // export const programs = {
// //   "Computer Science": ["Program 1 of Computer Science", "Program 2 of Computer Science"],
// //   "Mathematics": ["Program 1 of Mathematics", "Program 2 of Mathematics"],
// //   "Physics": ["Program 1 of Physics", "Program 2 of Physics"],
// //   "Chemistry": ["Program 1 of Chemistry", "Program 2 of Chemistry"],
// //   "Mechanical Engg": ["Program 1 of Mechanical Engg", "Program 2 of Mechanical Engg"],
// // };

// // // 📘 Semesters
// // export const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

// // // 📚 Subjects (dummy - in real project you'll fetch dynamically based on department/program/sem)
// // export const subjects = {
// //   "Computer Science": [
// //     "Computer Science Subject 1 - Sem 1",
// //     "Computer Science Subject 2 - Sem 2",
// //     "Computer Science Subject 3 - Sem 3",
// //   ],
// //   "Physics": [
// //     "Physics Subject 1 - Sem 1",
// //     "Physics Subject 2 - Sem 2",
// //     "Physics Subject 3 - Sem 3",
// //   ],
// // };

// // // 🧪 Exam Types
// // export const examTypes = ["CIA_I", "CIA_II", "END_SEM"];

// // // 📆 Years (can be dynamic too)
// // export const years = [2021, 2022, 2023, 2024, 2025];

// // src/data/universityData.ts

// // src/data/universityData.ts

// export const universityData = [
//   {
//     department: "Physics",
//     programs: [
//       {
//         name: "Program 1 of Physics",
//         semesters: [
//           {
//             number: 1,
//             subjects: [
//               "Physics Subject 1 - Sem 1",
//               "Physics Subject 2 - Sem 1",
//               "Physics Subject 3 - Sem 1",
//             ],
//           },
//           {
//             number: 3,
//             subjects: [
//               "Physics Subject 1 - Sem 3",
//               "Physics Subject 2 - Sem 3",
//               "Physics Subject 3 - Sem 3",
//             ],
//           },
//         ],
//       },
//       {
//         name: "Program 2 of Physics",
//         semesters: [
//           {
//             number: 2,
//             subjects: [
//               "Advanced Physics - Sem 2",
//               "Experimental Physics - Sem 2",
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     department: "Computer Science",
//     programs: [
//       {
//         name: "Program 1 of Computer Science",
//         semesters: [
//           {
//             number: 1,
//             subjects: [
//               "CS Subject 1 - Sem 1",
//               "CS Subject 2 - Sem 1",
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

// // ✅ Static options for remaining dropdowns
// export const examTypes = ["CIA_I", "CIA_II", "END_SEM"];
// export const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
// export const years = [2021, 2022, 2023, 2024];

// export const allDepartments =  [
//   "Computer Science",
//   "Mathematics",
//   "Physics",
//   "Chemistry",
//   "Mechanical Engg",
//   "Civil Engg",
//   "Electrical Engg",
//   "Electronics",
//   "Biotechnology",
//   "Information Technology",
//   "Aerospace Engg",
//   "Automobile Engg",
//   "Artificial Intelligence",
//   "Data Science",
//   "Robotics",
//   "Economics",
//   "Statistics",
//   "Commerce",
//   "Management",
//   "Architecture"
// ];

// export const allPrograms = [
//   "Program 1 of Computer Science",
//   "Program 2 of Computer Science",
//   "Program 1 of Mathematics",
//   "Program 2 of Mathematics",
//   "Program 1 of Physics",
//   "Program 2 of Physics",
//   "Program 1 of Chemistry",
//   "Program 2 of Chemistry",
//   "Program 1 of Mechanical Engg",
//   "Program 2 of Mechanical Engg",
//   // ...and so on for all 20 departments
// ];


// ✅ Department names
export const allDepartments = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Mechanical Engg",
  "Civil Engg",
  "Electrical Engg",
  "Electronics",
  "Biotechnology",
  "Information Technology",
  "Aerospace Engg",
  "Automobile Engg",
  "Artificial Intelligence",
  "Data Science",
  "Robotics",
  "Economics",
  "Statistics",
  "Commerce",
  "Management",
  "Architecture",
];

// ✅ Generalized generator for university data
export const universityData = allDepartments.map((dept) => ({
  department: dept,
  programs: Array.from({ length: 2 }, (_, programIndex) => ({
    name: `Program ${programIndex + 1} of ${dept}`,
    semesters: Array.from({ length: 4 }, (_, semIndex) => ({
      number: semIndex + 1,
      subjects: Array.from({ length: 3 }, (_, subjIndex) => 
        `${dept} Subject ${subjIndex + 1} - Sem ${semIndex + 1}`
      ),
    })),
  })),
}));

// ✅ Derived lists for dropdowns if needed
export const allPrograms = universityData.flatMap((d) =>
  d.programs.map((p) => p.name)
);

export const allSubjects = universityData.flatMap((d) =>
  d.programs.flatMap((p) =>
    p.semesters.flatMap((s) => s.subjects)
  )
);

// ✅ Static options for dropdowns
export const examTypes = ["CIA_I", "CIA_II", "END_SEM"];
export const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
export const years = [2021, 2022, 2023, 2024];
