export interface RepositoryInterface<T> {
    findOneById(id: number): Promise<T>;
}
