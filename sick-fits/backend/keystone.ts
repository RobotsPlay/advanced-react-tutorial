import 'dotenv/config';
import {config, createSchema} from '@keystone-next/keystone/schema';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorail';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 30,
    secret: process.env.COOKIE_SECRET
}

export default config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL]
        }
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        // TODO: add data seeding
    },
    lists: createSchema({
        // TODO: schema items here
    }),
    ui: {
        // TODO: change this for roles
        isAccessAllowed: () => true,
    },
    // TODO: add session values here
});