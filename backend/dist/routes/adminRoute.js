"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const initClient_js_1 = __importDefault(require("../lib/initClient.js"));
const admin_controllers_js_1 = require("../controllers/admin.controllers.js");
const admin_js_1 = __importDefault(require("../middleware/admin.js"));
const adminRouter = (0, express_1.Router)();
// adminRouter.post('/signup',(req,res)=>{
//     const {name,email,password} = req.body;
// })
adminRouter.get("/pending-papers", admin_js_1.default, admin_controllers_js_1.getPendingPapers);
adminRouter.patch("/verify-paper/:id", admin_js_1.default, admin_controllers_js_1.verfyPaperById);
adminRouter.post("add-department", admin_js_1.default, admin_controllers_js_1.addDepartment);
adminRouter.delete('/paper/:id', admin_js_1.default, async (req, res) => {
    // try {
    //   const {id} = req.params;
    //   //delete paper with the given id
    //   await client.paper.delete({
    //     where:{
    //       id:Number(id)
    //     }
    //   })
    //   return res.json({
    //     message:"Working delete method"
    //   })
    // } catch (error) {
    //   console.error("Error deleting paper:", error);
    //   res.status(500).json({ error: "Internal server error" });
    // }
});
adminRouter.put('/paper/:id', admin_js_1.default, async (req, res) => {
    try {
        const { id } = req.params;
        const { type, year } = req.body;
        const updated = await initClient_js_1.default.paper.update({
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
adminRouter.get('/queries', admin_js_1.default, async (req, res) => {
    try {
        const queries = await initClient_js_1.default.query.findMany({
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
adminRouter.put('/resolve-query/:id', admin_js_1.default, async (req, res) => {
    try {
        const { id } = req.params;
        await initClient_js_1.default.query.update({
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
exports.default = adminRouter;
//# sourceMappingURL=adminRoute.js.map