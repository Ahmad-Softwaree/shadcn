export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
};

export const users: User[] = [
  {
    id: 1,
    name: "Ahmad Software",
    username: "ahmad_soft",
    email: "dr.ahmad.salah.54@gmail.com",
    phone: "+9647501234567",
    dateOfBirth: "1995-04-20",
    createdAt: "2022-11-10T08:00:00Z",
    updatedAt: "2024-01-11T13:30:00Z",
  },
  {
    id: 2,
    name: "Omar Hassan",
    username: "omarh",
    email: "omar.hassan@example.com",
    phone: "+9647501234568",
    dateOfBirth: "1993-06-15",
    createdAt: "2022-12-15T09:30:00Z",
    updatedAt: "2024-01-10T10:20:00Z",
  },
  {
    id: 3,
    name: "Fatima Ali",
    username: "fatimaa",
    email: "fatima.ali@example.com",
    phone: "+9647501234569",
    dateOfBirth: "1996-01-25",
    createdAt: "2023-01-20T11:00:00Z",
    updatedAt: "2024-01-09T15:45:00Z",
  },
  {
    id: 4,
    name: "Youssef Ahmed",
    username: "youssefa",
    email: "youssef.ahmed@example.com",
    phone: "+9647501234570",
    dateOfBirth: "1992-08-12",
    createdAt: "2023-02-10T14:20:00Z",
    updatedAt: "2024-01-11T09:10:00Z",
  },
  {
    id: 5,
    name: "Layla Mohammed",
    username: "laylam",
    email: "layla.mohammed@example.com",
    phone: "+9647501234571",
    dateOfBirth: "1994-11-03",
    createdAt: "2023-03-05T10:15:00Z",
    updatedAt: "2024-01-12T12:30:00Z",
  },
  {
    id: 6,
    name: "Karim Saleh",
    username: "karims",
    email: "karim.saleh@example.com",
    phone: "+9647501234572",
    dateOfBirth: "1991-07-18",
    createdAt: "2023-04-12T13:00:00Z",
    updatedAt: "2024-01-12T14:55:00Z",
  },
];
