export interface TeamMember {
  name: string;
  role: string;
  links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    name: "Pradeep Kumar",
    role: "Founder & Engineer",
    links: {
      github: "https://github.com/pradeepkumar",
      linkedin: "https://linkedin.com/in/pradeepkumar",
      portfolio: "https://pradeepkumar.dev",
    },
  },
  // Add more team members here
];

export const contactInfo = {
  phone: "(+91) 8650152081",
  email: "pradeepkumar434680@gmail.com",
};
