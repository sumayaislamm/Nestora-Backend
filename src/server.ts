import app from "./app";
import { prisma } from "./lib/prisma";
 import "dotenv/config";
const PORT = process.env.PORT;

async function main() {

    try {
        // await prisma.$connect();
        console.log("Prisma connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }
    catch (error) {
        console.error(`Error starting server: ${error}`);
        // await prisma.$disconnect();
        process.exit(1);

    }
}
main();