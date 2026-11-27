import 'dotenv/config';
import mongoose from 'mongoose';
import { hash } from 'argon2';
import Admin from '../src/admin/admin.model.js';
import Company from '../src/company/company.model.js';
if (!process.env.URI_MONGO || !new URL(process.env.URI_MONGO).pathname.endsWith('/coperex_demo')) throw new Error('Seed only accepts coperex_demo');
await mongoose.connect(process.env.URI_MONGO);
try {
    const password=await hash('Demo-password-123!');
    for(const [name,role] of [['admin','ADMIN_ROLE'],['viewer','VIEWER_ROLE']]) await Admin.updateOne({username:name},{$setOnInsert:{username:name,email:name+'@example.test',password,role}},{upsert:true});
    for(const [name,year,category,impactLevel] of [['Alfa Demo',2010,'Technology','High'],['Beta Demo',2020,'Technology','Low'],['Gamma Demo',2015,'Education','High']]) await Company.updateOne({nameCompany:name},{$setOnInsert:{nameCompany:name,email:name.split(' ')[0].toLowerCase()+'@example.test',foundationYear:year,category,impactLevel,trayectory:new Date().getUTCFullYear()-year}},{upsert:true});
    console.log('Synthetic demo ready: admin@example.test and viewer@example.test / Demo-password-123!');
} finally {await mongoose.disconnect();}
