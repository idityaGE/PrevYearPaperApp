// import { PrismaClient, PaperType } from "../../generated/prisma/index.js";
export {};
// const prisma = new PrismaClient();
// async function main() {
//   // Departments to target
//   const targetDepartments = [
//     "Artificial Intelligence",
//     "Data Science",
//     "Robotics",
//     "Economics",
//     "Statistics",
//     "Commerce",
//   ];
//   // Fetch all subjects from the selected departments
//   const subjects = await prisma.subject.findMany({
//     where: {
//       semester: {
//         program: {
//           department: {
//             name: { in: targetDepartments },
//           },
//         },
//       },
//     },
//     include: {
//       semester: {
//         include: {
//           program: {
//             include: { department: true },
//           },
//         },
//       },
//     },
//   });
//   if (subjects.length === 0) {
//     console.log("⚠️ No subjects found for target departments. Check your DB data.");
//     return;
//   }
//   // Get one random uploader (student or admin)
//   const users = await prisma.user.findMany();
//   if (users.length === 0) {
//     console.log("⚠️ No users found in the database.");
//     return;
//   }
//   const papersToAdd: any[] = [];
//   // Add 20 pending papers
//   for (let i = 0; i < 20; i++) {
//     const subject = subjects[Math.floor(Math.random() * subjects.length)];
//     const uploader = users[Math.floor(Math.random() * users.length)];
//     const typeValues = Object.values(PaperType);
//     const type = typeValues[Math.floor(Math.random() * typeValues.length)];
//     papersToAdd.push({
//       type,
//       year: 2020 + (i % 5), // between 2020–2024
//       fileUrl: `https://pending-papers.com/${subject?.code}_${type?.toLowerCase()}_${2020 + (i % 5)}.pdf`,
//       subjectId: subject?.id,
//       uploadedBy: uploader?.id,
//       isVerified: false, 
//     });
//   }
//   // Insert all pending papers
//   await prisma.paper.createMany({
//     data: papersToAdd,
//   });
//   console.log("✅ Successfully added 20 pending (unverified) papers!");
// }
// main()
//   .catch((e) => {
//     console.error(" Error adding pending papers", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
//# sourceMappingURL=addPendingPapers.js.map