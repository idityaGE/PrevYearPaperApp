"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDepartment = exports.verfyPaperById = exports.getPendingPapers = exports.getQueryById = void 0;
const initClient_js_1 = __importDefault(require("../lib/initClient.js"));
const getQueryById = async (req, res) => {
    try {
        const { userId } = req.params;
        const queries = await initClient_js_1.default.query.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'desc' },
        });
        res.json(queries);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching queries' });
    }
};
exports.getQueryById = getQueryById;
const getPendingPapers = async (req, res) => {
    try {
        const pendingPapers = await initClient_js_1.default.paper.findMany({
            where: { isVerified: false },
            include: {
                subject: {
                    include: {
                        semester: {
                            include: {
                                program: { include: { department: true } },
                            },
                        },
                    },
                },
            },
        });
        res.json(pendingPapers);
    }
    catch (error) {
        console.error("Error fetching pending papers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getPendingPapers = getPendingPapers;
const verfyPaperById = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await initClient_js_1.default.paper.update({
            where: { id: Number(id) },
            data: { isVerified: true },
        });
        res.json({ message: "Paper verified ", paper: updated });
    }
    catch (error) {
        console.error("Error verifying paper:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.verfyPaperById = verfyPaperById;
const addDepartment = async (req, res) => {
    const { departmentName, programName } = req.body;
};
exports.addDepartment = addDepartment;
//# sourceMappingURL=admin.controllers.js.map