// --- Domain
import Match from '../../domain/match';

// --- Infrastructure
import MatchesRepository, { MatchQuery } from '../../infrastructure/repository/matches';

class ListMatchesHandler {
    constructor(
        private readonly repository: MatchesRepository,
    ) {}

    handle(filters: MatchQuery = {}): Promise<Match[]> {
        return this.repository.list(filters);
    }
}

export default ListMatchesHandler;
