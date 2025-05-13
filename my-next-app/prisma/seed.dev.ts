import {PrismaClient} from "../generate/client-dev";


const prisma = new PrismaClient();

async function main() {
    const client1 = await prisma.user.create({
        data: {
            email: 'nmfgghjjklkl;l@gmail.com',
            name: 'John Doe',
            posts: {
                create: {
                    title: 'first message',
                    content: 'John Doe',
                    published: true

                },

            }
        }
    });


    console.log({client1});
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