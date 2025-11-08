"use strict";
// import { PrismaClient } from "../../generated/prisma/index.js";
// import { universityData } from "./universityData.js";
// const prisma = new PrismaClient();
// async function main() {
//   console.log("🧹 Clearing old data...");
//   // Delete in reverse order of dependencies
//   await prisma.subject.deleteMany();
//   await prisma.semester.deleteMany();
//   await prisma.program.deleteMany();
//   await prisma.department.deleteMany();
//   console.log("📥 Inserting department, program, semester, and subject data...");
//   for (const dept of universityData) {
//     try {
//       // Create department
//       const createdDept = await prisma.department.create({
//         data: { name: dept.department },
//       });
//       console.log(`✅ Inserted Department: ${createdDept.name}`);
//       for (const program of dept.programs) {
//         try {
//           // Create program
//           const createdProgram = await prisma.program.create({
//             data: {
//               name: program.name,
//               departmentId: createdDept.id,
//             },
//           });
//           console.log(`   ➤ Inserted Program: ${createdProgram.name}`);
//           for (const sem of program.semesters) {
//             try {
//               // Create semester
//               const createdSem = await prisma.semester.create({
//                 data: {
//                   number: sem.number,
//                   programId: createdProgram.id,
//                 },
//               });
//               console.log(`      • Inserted Semester: ${createdSem.number}`);
//               // Prepare subjects for batch insert
//               if (sem.subjects.length > 0) {
//                 const subjectData = sem.subjects.map((name) => ({
//                   name,
//                   semesterId: createdSem.id,
//                 }));
//                 await prisma.subject.createMany({
//                   data: subjectData,
//                 });
//                 // Log subjects inserted
//                 subjectData.forEach((subj) => {
//                   console.log(`         - Inserted Subject: ${subj.name}`);
//                 });
//               }
//             } catch (semErr) {
//               console.error(
//                 ` Error inserting Semester ${sem.number} of Program ${program.name}:`,
//                 semErr
//               );
//             }
//           }
//         } catch (programErr) {
//           console.error(
//             `Error inserting Program ${program.name} in Department ${dept.department}:`,
//             programErr
//           );
//         }
//       }
//     } catch (deptErr) {
//       console.error(` Error inserting Department ${dept.department}:`, deptErr);
//     }
//   }
//   console.log("🎉 All data insertion complete!");
// }
// main()
//   .catch((err) => {
//     console.error(" Unexpected error:", err);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
//# sourceMappingURL=index.js.map