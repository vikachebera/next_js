import {PrismaClient} from "../generate/client-dev";


const prisma = new PrismaClient();

async function main() {
    const client1 = await prisma.user.create({
        data: {
            email: 'john@example.com',
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

    const client2 = await prisma.user.create({  // Додано await
        data: {
            email: 'jane@example.com',
            name: 'Bob Doe',
            posts: {
                create: {
                    title: 'second message',
                    content: 'bob Doe',
                    published: false

                },

            }
        }
    });

    console.log({client1, client2});
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