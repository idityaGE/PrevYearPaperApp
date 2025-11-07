import express from 'express';
import client from '../lib/initClient.js';



export const getQueryById = async (req:express.Request, res:express.Response) => {
  try {
    const { userId } = req.params;
    const queries = await client.query.findMany({
      where: { userId: parseInt(userId!) },
      orderBy: { createdAt: 'desc' },
    });
    res.json(queries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching queries' });
  }
}

export const getPendingPapers = async (req:express.Request, res:express.Response) => {
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
  } catch (error) {
    console.error("Error fetching pending papers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


export const verfyPaperById = async (req:express.Request, res:express.Response) => {
  try {
    const { id } = req.params;
    
    const updated = await client.paper.update({
      where: { id: Number(id) },
      data: { isVerified: true },
    });
    
    res.json({ message: "Paper verified ", paper: updated });
  } catch (error) {
    console.error("Error verifying paper:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const addDepartment = async (req:express.Request,res:express.Response)=>{
  const { departmentName,programName} = req.body;
}