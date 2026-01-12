export type Team = {
  id: number;
  name: string;
  employeeCount: number;
  employeeIds: number[];
  createdAt: string;
  updatedAt: string;
};

export const teams: Team[] = [
  {
    id: 1,
    name: "Development Team",
    employeeCount: 5,
    employeeIds: [1, 2, 3, 4, 5],
    createdAt: "2023-01-10T09:00:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
  },
  {
    id: 2,
    name: "Design Team",
    employeeCount: 3,
    employeeIds: [6, 7, 8],
    createdAt: "2023-02-15T10:30:00Z",
    updatedAt: "2024-01-11T11:20:00Z",
  },
  {
    id: 3,
    name: "Marketing Team",
    employeeCount: 4,
    employeeIds: [1, 3, 6, 7],
    createdAt: "2023-03-20T08:45:00Z",
    updatedAt: "2024-01-12T09:15:00Z",
  },
  {
    id: 4,
    name: "Sales Team",
    employeeCount: 3,
    employeeIds: [2, 4, 8],
    createdAt: "2023-04-25T13:00:00Z",
    updatedAt: "2024-01-12T15:40:00Z",
  },
  {
    id: 5,
    name: "Support Team",
    employeeCount: 2,
    employeeIds: [5, 6],
    createdAt: "2023-05-30T11:20:00Z",
    updatedAt: "2024-01-12T12:10:00Z",
  },
];
