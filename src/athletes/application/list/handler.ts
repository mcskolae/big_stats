// --- Domain
import Athlete from '../../domain/athlete';

// --- Infrastructure
import AthletesRepository, { AthleteQuery } from '../../infrastructure/repository/athletes';

class ListAthletesHandler {
    constructor(
        private readonly repository: AthletesRepository,
    ) {}

    handle(filters: AthleteQuery = {}): Promise<Athlete[]> {
        return this.repository.list(filters);
    }
}

export default ListAthletesHandler;
