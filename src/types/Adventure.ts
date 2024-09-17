export type Adventure = {
  id: string;
  timeSlot: 1 | 2;
  title: string;
  rules: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  tableShape: string;
  masterName: string;
  availableSeats: number;
};
