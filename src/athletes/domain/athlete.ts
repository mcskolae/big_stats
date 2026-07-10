type AthleteStats = Record<string, number>;

interface Athlete {
    id: number;
    sportId: number;
    teamId: number | null;
    firstName: string;
    lastName: string;
    nickname?: string;
    nationality: string;
    birthDate: string;
    heightCm: number;
    weightKg: number;
    position?: string;
    jerseyNumber?: number;
    weightClass?: string;
    stance?: string;
    reachCm?: number;
    stats: AthleteStats;
}

export type { AthleteStats };
export default Athlete;
