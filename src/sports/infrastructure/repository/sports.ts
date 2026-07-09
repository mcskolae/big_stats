// --- Domain
import Sport from "../../domain/sport";

// --- Utils
import Client from "../../../shared/api/infrastructure/client";

interface SportResponse {
    id: number;
    name: string;
    slug: string;
    type: string;
    players_per_team: number;
    match_duration_minutes: number;
    governing_body: string;
    competition?: {
        name: string;
        host_country: string;
        start_date: string;
        end_date: string;
        number_of_teams: number;
        format: string;
        venue?: string;
        date?: string;
    }
}

class SportsRepository extends Client {
    private readonly baseURL: string = "https://keligmartin.github.io/api/sports.json";

    async list(): Promise<Sport[]> {
        const response: SportResponse[] = await this.get<SportResponse[]>(this.baseURL);
        return response.map(this.hydrate);
    }

    private hydrate(sport: SportResponse): Sport {
        return {
            id: sport.id,
            name: sport.name,
            slug: sport.slug,
            type: sport.type,
            playersPerTeam: sport.players_per_team,
            matchDuration: sport.match_duration_minutes,
            governingBody: sport.governing_body,
            competition: sport.competition ? {
                name: sport.competition.name,
                hostCountry: sport.competition.host_country,
                startDate: sport.competition.start_date,
                endDate: sport.competition.end_date,
                numberOfTeams: sport.competition.number_of_teams,
                format: sport.competition.format,
                venue: sport.competition.venue,
                date: sport.competition.date,
            } : undefined,
        };
    }
}

export default SportsRepository;
