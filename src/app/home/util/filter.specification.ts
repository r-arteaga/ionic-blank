import { Recipe } from '../../shared/util/model'

interface Spec<T> {
    isSatisfiedBy(candidate: T): boolean;
}

abstract class AbstractSpec<T> implements Spec<T> {
    abstract isSatisfiedBy(candidate: T): boolean
}

export class NameSpec extends AbstractSpec<Recipe> {
    constructor(private name: string) {
        super()
    }

    isSatisfiedBy(candidate: Recipe): boolean {
        return this.name === '' || candidate.name.toLowerCase().includes(this.name.toLowerCase())
    }
}

export class IsFavSpec extends AbstractSpec<Recipe> {
    constructor(private isFav: boolean) {
        super()
    }

    public isSatisfiedBy(candidate: Recipe): boolean {
        return !this.isFav || candidate.isFav === this.isFav
    }
}