// --- Domain
import Team from '../../domain/team';

// --- Shared
import Client from '../../../shared/api/infrastructure/client';

type TeamQuery = Partial<{
    sportId: number;
}>;

interface TeamResponse {
    id: number;
    sport_id: number;
    name: string;
    short_name: string;
    coach?: string;
    country?: string;
    city?: string;
    group?: string;
    confederation?: string;
    conference?: string;
    seed?: number;
    fifa_ranking?: number;
    world_cup_titles?: number;
    world_cup_appearances?: number;
    regular_season_wins?: number;
    regular_season_losses?: number;
    championships?: number;
    arena?: string;
}

class TeamsRepository extends Client {
    private readonly baseURL: string = 'https://keligmartin.github.io/api/equipes.json';

    async list(filters: TeamQuery = {}): Promise<Team[]> {
        const response = await this.get<TeamResponse[]>(this.baseURL);
        return response.map(this.hydrate).filter((t) => this.matches(t, filters));
    }

    private hydrate(raw: TeamResponse): Team {
        return {
            id: raw.id,
            sportId: raw.sport_id,
            name: raw.name,
            shortName: raw.short_name,
            coach: raw.coach,
            informations: {
                country: raw.country,
                city: raw.city,
                group: raw.group,
                confederation: raw.confederation,
                conference: raw.conference,
                seed: raw.seed,
                fifaRanking: raw.fifa_ranking,
                worldCupTitles: raw.world_cup_titles,
                worldCupAppearances: raw.world_cup_appearances,
                regularSeasonWins: raw.regular_season_wins,
                regularSeasonLosses: raw.regular_season_losses,
                championships: raw.championships,
                arena: raw.arena,
            },
        };
    }

    private matches(team: Team, filters: TeamQuery): boolean {
        if (filters.sportId !== undefined && team.sportId !== filters.sportId) {
            return false;
        }

        return true;
    }
}

export type { TeamQuery };
export default TeamsRepository;
