import { User } from "@prisma/client"; // or your user type

declare global {
  namespace Express {
    interface Request {
      user?: User; // or a custom user type with only id/email
    }
  }
}
