import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        fullname: faker.name.firstName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        password: faker.internet.password(),
      },
    });
  }

  for (let i = 0; i < 5; i++) {
    await prisma.land.create({
      data: {
        propertyId: 'Land',
        purpose: 'RENT',
        propertyCategory: 'COMMERCIAL',
        propertyFace: 'EAST',
        address: faker.address.cityName(),
        landmark: faker.address.cityName(),
        roadType: 'BLACKTOPPED',
        roadAccess: faker.phone.number(),
        areaType: 'HAAT',
        area: faker.address.city(),
        price: 100000,
        priceLabel: 'PERHAAT',
        negotiable: 'YES',
        propertyTitle: 'Land Sale',
        propertyDescription: faker.lorem.sentence(),
        ownerName: faker.name.fullName(),
        contactNumber: faker.phone.number(),
        image: faker.image.image(),
      },
    });
  }
}
main()
  .catch(async (e) => {
    console.error('Got an error: ', e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
