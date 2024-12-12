export interface Run {
  runId: number;
  title: string;
  description: string;
  date: Date;
  time: Date;
  location: string;
  difficultyLevel: string;
  distanceKm: number;
  durationMinutes: number;
  inscriptions: any[];
}
