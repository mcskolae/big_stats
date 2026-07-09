// --- Domain
import Athlete, { AthleteStats } from '../../domain/athlete';

// --- Shared
import Client from '../../../shared/api/infrastructure/client';

type AthleteQuery = Partial<{
    sportId: number;
    position: string;
    query: string;
}>;

interface AthleteResponse {
    id: number;
    sport_id: number;
    team_id: number | null;
    first_name: string;
    last_name: string;
    nickname?: string;
    nationality: string;
    birth_date: string;
    height_cm: number;
    weight_kg: number;
    position?: string;
    jersey_number?: number;
    weight_class?: string;
    stance?: string;
    reach_cm?: number;
    stats: Record<string, number>;
}

function snakeToCamel(key: string): string {
    return key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function convertStatKeys(stats: Record<string, number>): AthleteStats {
    return Object.fromEntries(
        Object.entries(stats).map(([key, value]) => [snakeToCamel(key), value])
    );
}

class AthletesRepository extends Client {
    private readonly baseURL: string = 'https://keligmartin.github.io/api/athletes.json';

    async list(filters: AthleteQuery = {}): Promise<Athlete[]> {
        const response = await this.get<AthleteResponse[]>(this.baseURL);
        return response.map(this.hydrate).filter((a) => this.matches(a, filters));
    }

    private hydrate(raw: AthleteResponse): Athlete {
        return {
            id: raw.id,
            sportId: raw.sport_id,
            teamId: raw.team_id,
            firstName: raw.first_name,
            lastName: raw.last_name,
            nickname: raw.nickname,
            nationality: raw.nationality,
            birthDate: raw.birth_date,
            heightCm: raw.height_cm,
            weightKg: raw.weight_kg,
            position: raw.position,
            jerseyNumber: raw.jersey_number,
            weightClass: raw.weight_class,
            stance: raw.stance,
            reachCm: raw.reach_cm,
            stats: convertStatKeys(raw.stats),
        };
    }

    private matches(athlete: Athlete, filters: AthleteQuery): boolean {
        if (filters.sportId !== undefined && athlete.sportId !== filters.sportId) {
            return false;
        }

        if (filters.position) {
            const position = (athlete.position ?? athlete.weightClass ?? '').toLowerCase();
            if (position !== filters.position.toLowerCase()) {
                return false;
            }
        }

        if (filters.query?.trim()) {
            const queries = filters.query.trim().toLowerCase();
            const fullname = `${athlete.firstName} ${athlete.lastName}`.toLowerCase();
            const nickname = athlete.nickname?.toLowerCase() ?? '';

            if (!fullname.includes(queries) && !nickname.includes(queries)) {
                return false;
            }
        }

        return true;
    }
}

export type { AthleteQuery };
export default AthletesRepository;
