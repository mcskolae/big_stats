// --- Domain
import Team from '../../../teams/domain/team';
import { TeamMatch } from '../../../matches/domain/match';

interface StandingRow {
    team: Team;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
}

class StandingsHandler {
    handle(teams: Team[], matches: TeamMatch[]): StandingRow[] {
        const map = new Map<number, StandingRow>(
            teams.map(t => [t.id, {
                team: t, played: 0, wins: 0, draws: 0,
                losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0,
            }])
        );

        matches.forEach(m => {
            const home = map.get(m.homeTeamId);
            const away = map.get(m.awayTeamId);
            if (!home || !away) return;

            home.played++; away.played++;
            home.goalsFor    += m.homeScore; home.goalsAgainst += m.awayScore;
            away.goalsFor    += m.awayScore; away.goalsAgainst += m.homeScore;

            if (m.homeScore > m.awayScore) {
                home.wins++; home.points += 3; away.losses++;
            } else if (m.homeScore < m.awayScore) {
                away.wins++; away.points += 3; home.losses++;
            } else {
                home.draws++; home.points++;
                away.draws++; away.points++;
            }
        });

        return Array.from(map.values())
            .sort((a, b) =>
                b.points - a.points ||
                (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst)
            );
    }
}

export type { StandingRow };
export default StandingsHandler;
