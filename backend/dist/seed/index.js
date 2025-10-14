import { PrismaClient, PaperType, Role } from '../../generated/prisma/index.js';
const prisma = new PrismaClient();
async function main() {
    // ---- 1) Clear old data (be careful on prod!)
    await prisma.paper.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.semester.deleteMany();
    await prisma.program.deleteMany();
    await prisma.department.deleteMany();
    await prisma.user.deleteMany();
    // ---- 2) Create users
    const admin = await prisma.user.create({
        data: {
            name: "Admin User",
            email: "admin@example.com",
            password: "hashedpassword",
            role: Role.ADMIN,
        },
    });
    const student = await prisma.user.create({
        data: {
            name: "Student User",
            email: "student@example.com",
            password: "hashedpassword",
            role: Role.USER,
        },
    });
    // ---- 3) Department list (all departments will be created)
    const allDepartments = [
        "Computer Science", "Mathematics", "Physics", "Chemistry",
        "Mechanical Engg", "Civil Engg", "Electrical Engg", "Electronics",
        "Biotechnology", "Information Technology", "Aerospace Engg",
        "Automobile Engg", "Artificial Intelligence", "Data Science",
        "Robotics", "Economics", "Statistics", "Commerce",
        "Management", "Architecture",
    ];
    // Create all department rows first
    const deptMap = {};
    for (const name of allDepartments) {
        const d = await prisma.department.create({ data: { name } });
        deptMap[name] = d;
    }
    // ---- 4) Which departments will actually get papers inserted?
    // Remove "Computer Science" from this array to skip papers for CSE.
    const departmentsWithPapers = allDepartments.filter((d) => d !== "Computer Science");
    // ---- 5) Create programs / semesters / subjects for ALL departments
    // (Important: create programs/semesters/subjects for every department,
    //  but insert papers only for departmentsWithPapers)
    for (const deptName of allDepartments) {
        const dept = deptMap[deptName];
        // create 2 programs for each dept (you can change counts as needed)
        for (let p = 1; p <= 2; p++) {
            const program = await prisma.program.create({
                data: {
                    name: `Program ${p} of ${deptName}`,
                    departmentId: dept.id,
                    // create 5 semesters per program
                    semesters: {
                        create: Array.from({ length: 5 }, (_, i) => ({ number: i + 1 }))
                    }
                }
            });
            // fetch the created semesters to attach subjects
            const semesters = await prisma.semester.findMany({ where: { programId: program.id } });
            for (const sem of semesters) {
                // create 3 subjects per semester
                for (let s = 1; s <= 3; s++) {
                    await prisma.subject.create({
                        data: {
                            name: `${deptName} Subject ${s} - Sem ${sem.number}`,
                            code: `${deptName.substring(0, 3).toUpperCase()}${sem.number}0${s}`,
                            semesterId: sem.id
                        }
                    });
                }
            }
        }
    }
    console.log("✅ Departments, programs, semesters and subjects created for ALL departments.");
    // ---- 6) Now insert papers ONLY for the selected departments (exclude Computer Science)
    for (const deptName of departmentsWithPapers) {
        // Get programs of this department
        const programs = await prisma.program.findMany({
            where: { departmentId: deptMap[deptName].id },
            include: { semesters: { include: { subjects: true } } }
        });
        for (const prog of programs) {
            for (const sem of prog.semesters) {
                for (const subj of sem.subjects) {
                    // Create 6 papers per subject (3 paper types × 2 years)
                    for (const type of [PaperType.CIA_I, PaperType.CIA_II, PaperType.END_SEM]) {
                        for (let k = 1; k <= 2; k++) {
                            await prisma.paper.create({
                                data: {
                                    type,
                                    year: 2021 + (k % 3), // samples: 2021..2023
                                    fileUrl: `https://dummy-papers.com/${subj.code}_${type.toLowerCase()}_${2021 + (k % 3)}.pdf`,
                                    subjectId: subj.id,
                                    uploadedBy: Math.random() > 0.5 ? admin.id : student.id,
                                    isVerified: Math.random() > 0.5, // random verified
                                }
                            });
                        }
                    }
                }
            }
        }
    }
    console.log("✅ Papers inserted only for selected departments (Computer Science excluded).");
}
main()
    .then(() => {
    console.log("🎉 Seed complete.");
})
    .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=index.js.map