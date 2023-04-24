import { PrismaClient, Status } from '@prisma/client';
import { faker } from '@faker-js/faker';
// import * as faker from 'faker';
const prisma = new PrismaClient();
async function main() {
  const enumValues = Object.values(Status); // get all enum values as an array
  const randomIndex = Math.floor(Math.random() * enumValues.length); // generate a random index
  const randomStatus = enumValues[randomIndex]; // get the enum value at the random index
  for (let i = 0; i <= 5; i++) {
    await prisma.house.create({
      data: {
        status: randomStatus,
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

  // for (let i = 0; i < 5; i++) {
  //   await prisma.user.create({
  //     data: {
  //       fullname: faker.name.firstName(),
  //       email: faker.internet.email(),
  //       phone: faker.phone.number(),
  //       password: faker.internet.password(),
  //     },
  //   });
  // }

  //   for (let i = 0; i < 5; i++) {
  //     await prisma.land.create({
  //       data: {
  //         propertyId: 'Land',
  //         purpose: 'RENT',
  //         propertyCategory: 'COMMERCIAL',
  //         propertyFace: 'EAST',
  //         address: faker.address.cityName(),
  //         landmark: faker.address.cityName(),
  //         roadType: 'BLACKTOPPED',
  //         roadAccess: faker.phone.number(),
  //         areaType: 'HAAT',
  //         area: faker.address.city(),
  //         price: 100000,
  //         priceLabel: 'PERHAAT',
  //         negotiable: 'YES',
  //         propertyTitle: 'Land Sale',
  //         propertyDescription: faker.lorem.sentence(),
  //         ownerName: faker.name.fullName(),
  //         contactNumber: faker.phone.number(),
  //         image: faker.image.image(),
  //       },
  //     });
  //   }
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
