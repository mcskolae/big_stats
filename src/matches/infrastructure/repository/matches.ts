// --- Domain
import Match, { TeamMatch, Combat } from '../../domain/match';

// --- Shared
import Client from '../../../shared/api/infrastructure/client';

type MatchQuery = Partial<{
    sportId: number;
    status: string;
}>;

interface BaseMatchResponse {
    id: number;
    sport_id: number;
    type: string;
    date: string;
    venue?: string;
    attendance?: number;
    status: string;
}

interface TeamMatchResponse extends BaseMatchResponse {
    type: 'match';
    home_team_id: number;
    away_team_id: number;
    home_score: number;
    away_score: number;
    stage?: string;
    playoff_round?: string;
    series?: string;
}

interface CombatResponse extends BaseMatchResponse {
    type: 'combat';
    fighter1_id: number;
    fighter2_id: number;
    winner_id?: number;
    method?: string;
    round?: number;
    time?: string;
    weight_class?: string;
    title_fight?: boolean;
    card_position?: string;
}

type MatchResponse = TeamMatchResponse | CombatResponse;

class MatchesRepository extends Client {
    private readonly baseURL: string = 'https://keligmartin.github.io/api/rencontres.json';

    async list(filters: MatchQuery = {}): Promise<Match[]> {
        const response = await this.get<MatchResponse[]>(this.baseURL);
        return response.map(this.hydrate).filter((m) => this.matches(m, filters));
    }

    private hydrate(raw: MatchResponse): Match {
        if (raw.type === 'combat') {
            return {
                type: 'combat',
                id: raw.id,
                sportId: raw.sport_id,
                date: raw.date,
                venue: raw.venue,
                attendance: raw.attendance,
                status: raw.status,
                fighter1Id: raw.fighter1_id,
                fighter2Id: raw.fighter2_id,
                winnerId: raw.winner_id,
                method: raw.method,
                round: raw.round,
                time: raw.time,
                weightClass: raw.weight_class,
                titleFight: raw.title_fight,
                cardPosition: raw.card_position,
            } satisfies Combat;
        }

        return {
            type: 'match',
            id: raw.id,
            sportId: raw.sport_id,
            date: raw.date,
            venue: raw.venue,
            attendance: raw.attendance,
            status: raw.status,
            homeTeamId: raw.home_team_id,
            awayTeamId: raw.away_team_id,
            homeScore: raw.home_score,
            awayScore: raw.away_score,
            stage: raw.stage,
            playoffRound: raw.playoff_round,
            series: raw.series,
        } satisfies TeamMatch;
    }

    private matches(match: Match, filters: MatchQuery): boolean {
        if (filters.sportId !== undefined && match.sportId !== filters.sportId) {
            return false;
        }

        if (filters.status && match.status !== filters.status) {
            return false;
        }

        return true;
    }
}

export type { MatchQuery };
export default MatchesRepository;
