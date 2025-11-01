import { Router } from "express";
import client from "../lib/initClient.js";
const adminRouter = Router();
// adminRouter.post('/signup',(req,res)=>{
//     const {name,email,password} = req.body;
// })
adminRouter.get("/pending-papers", async (req, res) => {
    try {
        const pendingPapers = await client.paper.findMany({
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
});
adminRouter.patch("/verify-paper/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const updated = await client.paper.update({
            where: { id: Number(id) },
            data: { isVerified: true },
        });
        res.json({ message: "Paper verified ", paper: updated });
    }
    catch (error) {
        console.error("Error verifying paper:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
adminRouter.delete('/paper/:id', async (req, res) => {
    try {
        const { id } = req.params;
        //delete paper with the given id
        await client.paper.delete({
            where: {
                id: Number(id)
            }
        });
        return res.json({
            message: "Working delete method"
        });
    }
    catch (error) {
        console.error("Error deleting paper:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
adminRouter.put('/paper/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type, year } = req.body;
        const updated = await client.paper.update({
            where: { id: Number(id) },
            data: { type, year }
        });
        return res.json({
            message: "Working put method",
            paper: updated
        });
    }
    catch (error) {
        console.error("Error updating paper:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
adminRouter.get('/queries', async (req, res) => {
    try {
        const queries = await client.query.findMany({
            where: {
                isResponded: false
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return res.json(queries);
    }
    catch (error) {
        console.error("Error fetching queries:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
adminRouter.put('/resolve-query/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await client.query.update({
            where: {
                id: Number(id)
            },
            data: {
                response: req.body.response,
                isResponded: true
            }
        });
        return res.json({
            message: "Query resolved"
        });
    }
    catch (error) {
        console.error("Error resolving query:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default adminRouter;
//# sourceMappingURL=adminRoute.js.map