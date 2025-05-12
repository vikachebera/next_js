import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
    const client1 = await prisma.user.create({
        data: {
            email: 'john@example.com',
            name: 'John Doe',
            posts: {
                create: {
                    title: 'John',
                    content: "This is my first post",
                    published: true,
                }
            }
        }
    });

    const client2 = await prisma.user.create({  // Додано await
        data: {
            email: 'jane@example.com',
            name: 'Jane Doe',
            posts: {
                create: {
                    title: 'My second post',
                    content: 'This is another post',
                    published: false,
                }
            }
        }
    });

    console.log({ client1, client2 });
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