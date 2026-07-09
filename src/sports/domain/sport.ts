interface SportCompetition {
    name: string;
    hostCountry: string;
    startDate: string;
    endDate: string;
    numberOfTeams: number;
    format: string;
    venue?: string;
    date?: string;
}

interface Sport {
    id: number;
    name: string;
    slug: string;
    type: string;
    playersPerTeam: number;
    matchDuration: number;
    governingBody: string;
    competition?: SportCompetition;
}

export type { SportCompetition };
export default Sport;
