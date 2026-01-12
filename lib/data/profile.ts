export type Profile = {
  id: number;
  name: string;
  username: string;
  email: string;
  image: string | null;
  dateOfBirth: string | null;
  createdAt: string;
  updatedAt: string;
};

export const profile: Profile = {
  id: 1,
  name: "Ahmad Software",
  username: "ahmad_software",
  email: "dr.ahmad.salah.54@gmail.com",
  image: null,
  dateOfBirth: "1995-04-20",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
};
