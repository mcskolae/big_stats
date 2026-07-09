// --- Domain
import Sport from "../../domain/sport";

// --- Infrastructure
import SportsRepository from "../../infrastructure/repository/sports";

class ListSportsHandler {
    constructor(
        private readonly repository: SportsRepository,
    ) {
    }

    handle(): Promise<Sport[]> {
        return this.repository.list();
    }
}

export default ListSportsHandler;
