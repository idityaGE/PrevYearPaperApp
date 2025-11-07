
export interface Paper {
  id: number;
  type: string;
  year: number;
  fileUrl: string;
  isVerified: boolean;
  subject: {
    name: string;
    code: string;
    semester: {
      number: number;
      program: {
        name: string;
        department: {
          name: string;
        };
      };
    };
  };
}
