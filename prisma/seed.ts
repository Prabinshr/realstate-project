import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
// import * as faker from 'faker';
const prisma = new PrismaClient();
async function main() {
  for (let i = 0; i <= 5; i++) {
    await prisma.house.create({
      data: {
        propertyTitle: faker.lorem.words(),
        image: faker.image.business(),
        price: faker.datatype.number({ min: 50000, max: 1000000 }),
        priceLabel: 'TOTALPRICE',
        address: faker.address.cityName(),
        negotiable: 'YES',
        livingRoom: faker.datatype.number({ min: 1, max: 5 }),
        kitchen: faker.datatype.number({ min: 1, max: 2 }),
        bedroom: faker.datatype.number({ min: 1, max: 5 }),
        toilet: faker.datatype.number({ min: 1, max: 3 }),
        bathroom: faker.datatype.number({ min: 1, max: 3 }),
        roadAccess: 16,
        builtYear: 2023,
        storey: 2,
        floor: 2,
        garage: 1,
        propertyId: 'ab12',
        category: 'RESIDENTAL',
        purpose: 'SALE',
        areaType: 'ANNA',
        area: '4',
        roadType: 'PAVED',
        propertyType: 'apartment',
        propertyFace: 'EAST',
        PropertyFeature: ['property1', 'property2'],
        condition: 'MINT',
        landmark: faker.address.cityName(),
        ownerName: faker.internet.userName(),
        contactNumber: faker.random.numeric(),
        propertyDesc: faker.lorem.words(),
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
