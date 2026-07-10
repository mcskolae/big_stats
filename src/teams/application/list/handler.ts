// --- Domain
import Team from '../../domain/team';

// --- Infrastructure
import TeamsRepository, { TeamQuery } from '../../infrastructure/repository/teams';

class ListTeamsHandler {
    constructor(
        private readonly repository: TeamsRepository,
    ) {}

    handle(filters: TeamQuery = {}): Promise<Team[]> {
        return this.repository.list(filters);
    }
}

export default ListTeamsHandler;
