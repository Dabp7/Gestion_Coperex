import {before,after,beforeEach,test} from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import ExcelJS from 'exceljs';
import {MongoMemoryServer} from 'mongodb-memory-server';
import {createApp} from '../configs/server.js';
import Admin from '../src/admin/admin.model.js';
import Company from '../src/company/company.model.js';
let mongo, app, adminToken, viewerToken, companies;
process.env.SECRETORPRIVATEKEY='synthetic-test-secret-only-more-than-32-characters';
const auth=token=>({Authorization:'Bearer '+token});
before(async()=>{
    mongo=await MongoMemoryServer.create({binary:{version:'8.0.16'},instance:{launchTimeout:60000,args:['--wiredTigerCacheSizeGB','0.25']}});
    await mongoose.connect(mongo.getUri());
    await Promise.all([Admin.init(),Company.init()]);
    app=createApp();
});
after(async()=>{await mongoose.disconnect();if(mongo)await mongo.stop();});
beforeEach(async()=>{
    await Promise.all([Admin.deleteMany({}),Company.deleteMany({})]);
    const [admin,viewer]=await Admin.create([{username:'admin',email:'admin@example.test',password:'unused',role:'ADMIN_ROLE'},{username:'viewer',email:'viewer@example.test',password:'unused',role:'VIEWER_ROLE'}]);
    adminToken=jwt.sign({uid:admin.id},process.env.SECRETORPRIVATEKEY);
    viewerToken=jwt.sign({uid:viewer.id},process.env.SECRETORPRIVATEKEY);
    companies=await Company.create([
        {nameCompany:'Alpha',email:'alpha@example.test',foundationYear:2010,trayectory:0,category:'Tech',impactLevel:'High'},
        {nameCompany:'Beta',email:'beta@example.test',foundationYear:2020,trayectory:0,category:'Tech',impactLevel:'Low'},
        {nameCompany:'Gamma',email:'gamma@example.test',foundationYear:2015,trayectory:0,category:'Tech',impactLevel:'High'},
        {nameCompany:'Other',email:'other@example.test',foundationYear:2010,trayectory:0,category:'Education',impactLevel:'High'},
    ]);
});
test('every company route requires authentication and administrative permission',async()=>{
    const endpoints=[['get','/'],['post','/addCompany'],['put','/editCompany/'+companies[0].id],['get','/report'],['get','/getTrayectory/16'],['get','/getCategory/Tech'],['get','/getCompany/A-Z'],['get','/getCompany/Z-A']];
    for(const [method,path] of endpoints){
        assert.equal((await request(app)[method]('/coperex/v1/company'+path)).status,401);
        assert.equal((await request(app)[method]('/coperex/v1/company'+path).set(auth(viewerToken))).status,403);
    }
    assert.equal((await request(app).get('/coperex/v1/company/').set(auth('broken'))).status,401);
});
test('combined filters and stable pagination use the current foundation year',async()=>{
    const response=await request(app).get('/coperex/v1/company/').query({category:'Tech',impactLevel:'High',minTrayectory:'5',sort:'name_desc',limite:'1',desde:'1'}).set(auth(adminToken));
    assert.equal(response.status,200);
    assert.equal(response.body.total,2);
    assert.deepEqual(response.body.companies.map(row=>row.nameCompany),['Alpha']);
    assert.equal(response.body.companies[0].trayectory,new Date().getUTCFullYear()-2010);
});
test('Excel contains exactly the filtered page in the same order and numeric cells',async()=>{
    const query={category:'Tech',impactLevel:'High',sort:'name_desc',limite:'2'};
    const list=await request(app).get('/coperex/v1/company/').query(query).set(auth(adminToken));
    const result=await request(app).get('/coperex/v1/company/report').query(query).set(auth(adminToken)).buffer(true).parse((res,done)=>{
        const chunks=[];res.on('data',chunk=>chunks.push(chunk));res.on('end',()=>done(null,Buffer.concat(chunks)));
    });
    assert.equal(result.status,200);
    assert.match(result.headers['content-disposition'],/companies.xlsx/);
    const book=new ExcelJS.Workbook();await book.xlsx.load(result.body);
    const sheet=book.getWorksheet('Empresas');
    assert.equal(sheet.rowCount,list.body.companies.length+1);
    for(let i=0;i<list.body.companies.length;i++){
        assert.equal(sheet.getCell(i+2,1).value,list.body.companies[i].nameCompany);
        assert.equal(typeof sheet.getCell(i+2,3).value,'number');
        assert.equal(typeof sheet.getCell(i+2,6).value,'number');
    }
});
test('invalid filters and impossible dates are rejected without leaking internals',async()=>{
    for(const query of [{limite:'0'},{limite:'101'},{desde:'-1'},{sort:'password'},{minTrayectory:'20',maxTrayectory:'10'},{category:{'$ne':''}}]){
        assert.equal((await request(app).get('/coperex/v1/company/').query(query).set(auth(adminToken))).status,400);
    }
    const response=await request(app).put('/coperex/v1/company/editCompany/'+companies[0].id).set(auth(adminToken)).send({foundationYear:new Date().getUTCFullYear()+1});
    assert.equal(response.status,400);
    assert.equal((await Company.findById(companies[0].id)).foundationYear,2010);
    assert.equal((await request(app).put('/coperex/v1/company/editCompany/not-an-id').set(auth(adminToken)).send({category:'Demo'})).status,400);
});
test('edits recalculate trajectory and empty queries return a valid list',async()=>{
    const edit=await request(app).put('/coperex/v1/company/editCompany/'+companies[0].id).set(auth(adminToken)).send({foundationYear:2000,trayectory:999});
    assert.equal(edit.status,200);assert.equal(edit.body.company.trayectory,new Date().getUTCFullYear()-2000);
    const list=await request(app).get('/coperex/v1/company/').query({category:'Absent'}).set(auth(adminToken));
    assert.equal(list.status,200);assert.equal(list.body.total,0);
});
