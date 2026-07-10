interface BaseMatch {
    id: number;
    sportId: number;
    date: string;
    venue?: string;
    attendance?: number;
    status: string;
}

interface TeamMatch extends BaseMatch {
    type: 'match';
    homeTeamId: number;
    awayTeamId: number;
    homeScore: number;
    awayScore: number;
    stage?: string;
    playoffRound?: string;
    series?: string;
}

interface Combat extends BaseMatch {
    type: 'combat';
    fighter1Id: number;
    fighter2Id: number;
    winnerId?: number;
    method?: string;
    round?: number;
    time?: string;
    weightClass?: string;
    titleFight?: boolean;
    cardPosition?: string;
}

type Match = TeamMatch | Combat;

export type { TeamMatch, Combat };
export default Match;
