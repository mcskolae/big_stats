// --- Sports
import ListSportsHandler from '../list/handler';
import SportsRepository from '../../infrastructure/repository/sports';

// --- Athletes
import ListAthletesHandler from '../../../athletes/application/list/handler';
import AthletesRepository from '../../../athletes/infrastructure/repository/athletes';

// --- Matches
import ListMatchesHandler from '../../../matches/application/list/handler';
import MatchesRepository from '../../../matches/infrastructure/repository/matches';

// --- Teams
import ListTeamsHandler from '../../../teams/application/list/handler';
import TeamsRepository from '../../../teams/infrastructure/repository/teams';

// --- Domain
import Sport from '../../domain/sport';
import Athlete from '../../../athletes/domain/athlete';
import Match from '../../../matches/domain/match';
import Team from '../../../teams/domain/team';

type SportPageData = {
    sport: Sport;
    allSports: Sport[];
    athletes: Athlete[];
    matches: Match[];
    teams: Team[];
};

class SportPageHandler {
    private readonly listSports   = new ListSportsHandler(new SportsRepository());
    private readonly listAthletes = new ListAthletesHandler(new AthletesRepository());
    private readonly listMatches  = new ListMatchesHandler(new MatchesRepository());
    private readonly listTeams    = new ListTeamsHandler(new TeamsRepository());

    async handle(slug: string): Promise<SportPageData> {
        const [sports, athletes, matches, teams] = await Promise.all([
            this.listSports.handle(),
            this.listAthletes.handle(),
            this.listMatches.handle(),
            this.listTeams.handle(),
        ]);

        const sport = sports.find(s => s.slug === slug);

        if (!sport) {
            throw new Error(`Sport introuvable : ${slug}`);
        }

        return {
            sport,
            allSports: sports,
            athletes: athletes.filter(a => a.sportId === sport.id),
            matches:  matches.filter(m => m.sportId === sport.id),
            teams:    teams.filter(t => t.sportId === sport.id),
        };
    }
}

export type { SportPageData };
export default SportPageHandler;
