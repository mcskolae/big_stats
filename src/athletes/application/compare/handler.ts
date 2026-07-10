// --- Domain
import Athlete from '../../domain/athlete';

class CompareAthletesHandler {
    handle(a: Athlete, b: Athlete): [Athlete, Athlete] {
        if (a.sportId !== b.sportId) {
            throw new Error('Impossible de comparer des athlètes de sports différents.');
        }

        return [a, b];
    }
}

export default CompareAthletesHandler;
