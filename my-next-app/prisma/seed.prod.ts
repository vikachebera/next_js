import { PrismaClient } from "../generate/client-prod";


const prisma = new PrismaClient();

async function main() {
    const client1 = await prisma.user.create({
        data: {
            email: 'john234@example.com',
            name: 'John Doe',
            password: '123456',

        }
    });



    console.log({ client1 });
}

main()
    .then(() => {
        console.log('Seed completed successfully.');
    })
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });