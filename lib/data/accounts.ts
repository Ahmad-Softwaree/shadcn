export type Account = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
};

export const accounts: Account[] = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    username: "techsolutions",
    email: "contact@techsolutions.com",
    phone: "+12025551234",
    dateOfBirth: "1985-03-15",
    createdAt: "2021-05-10T09:00:00Z",
    updatedAt: "2024-01-10T11:20:00Z",
  },
  {
    id: 2,
    name: "Digital Marketing Pro",
    username: "digimarket",
    email: "info@digimarket.com",
    phone: "+12025551235",
    dateOfBirth: "1988-09-22",
    createdAt: "2021-07-15T10:30:00Z",
    updatedAt: "2024-01-11T14:45:00Z",
  },
  {
    id: 3,
    name: "Creative Designs Ltd",
    username: "creativedesigns",
    email: "hello@creativedesigns.com",
    phone: "+12025551236",
    dateOfBirth: "1990-12-05",
    createdAt: "2021-09-20T08:15:00Z",
    updatedAt: "2024-01-12T10:30:00Z",
  },
  {
    id: 4,
    name: "Global Enterprises",
    username: "globalent",
    email: "contact@globalent.com",
    phone: "+12025551237",
    dateOfBirth: "1982-06-30",
    createdAt: "2021-11-05T13:00:00Z",
    updatedAt: "2024-01-12T16:15:00Z",
  },
  {
    id: 5,
    name: "Innovation Hub",
    username: "innovhub",
    email: "info@innovhub.com",
    phone: "+12025551238",
    dateOfBirth: "1995-04-18",
    createdAt: "2022-01-12T11:45:00Z",
    updatedAt: "2024-01-12T09:25:00Z",
  },
];
