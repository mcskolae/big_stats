interface TeamInformations {
    country?: string;
    city?: string;
    group?: string;
    confederation?: string;
    conference?: string;
    seed?: number;
    fifaRanking?: number;
    worldCupTitles?: number;
    worldCupAppearances?: number;
    regularSeasonWins?: number;
    regularSeasonLosses?: number;
    championships?: number;
    arena?: string;
}

interface Team {
    id: number;
    sportId: number;
    name: string;
    shortName: string;
    coach?: string;
    informations: TeamInformations;
}

export type { TeamInformations };
export default Team;
