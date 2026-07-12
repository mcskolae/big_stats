// --- Sports
import ListSportsHandler from '../../sports/application/list/handler';
import SportsRepository from '../../sports/infrastructure/repository/sports';

// --- Matches
import ListMatchesHandler from '../../matches/application/list/handler';
import MatchesRepository from '../../matches/infrastructure/repository/matches';

// --- Domain
import Sport from '../../sports/domain/sport';
import Match from '../../matches/domain/match';

type HomeData = {
    sports: Sport[];
    matches: Match[];
};

class HomeHandler {
    private readonly listSports  = new ListSportsHandler(new SportsRepository());
    private readonly listMatches = new ListMatchesHandler(new MatchesRepository());

    async handle(): Promise<HomeData> {
        const [sports, matches] = await Promise.all([
            this.listSports.handle(),
            this.listMatches.handle(),
        ]);

        return { sports, matches };
    }
}

export default HomeHandler;
