import { User } from '@prisma/client';
import { UserDomain } from '../../domain/user.domain';

export class UserMapper {
    public static toOptionalDomain(user: User | null): UserDomain | null {
        if (!user) {
            return null;
        }

        const userDomain = new UserDomain(user);

        return userDomain;
    }

    public static toRequiredDomain(user: User): UserDomain {
        const userDomain = new UserDomain(user);

        return userDomain;
    }

    // public static toDomains(productsEntity: ProductEntity[]): Product[] {
    //     const products = new Array<Product>();
    //     productsEntity.forEach((productEntity) => {
    //         const product = this.toDomain(productEntity);
    //         products.push(product.get());
    //     });
    //     return products;
    // }
}
