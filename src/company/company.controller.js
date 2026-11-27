import Company from './company.model.js';
import ExcelJS from 'exceljs';

const fail = (message, status = 400) => { throw Object.assign(new Error(message), { status }); };
const integer = (value, fallback, min, max) => {
    if (value === undefined) return fallback;
    if (typeof value !== 'string' || !/^\d+$/.test(value)) fail('Invalid pagination or trajectory');
    const number = Number(value);
    if (!Number.isSafeInteger(number) || number < min || number > max) fail('Pagination or trajectory out of range');
    return number;
};
function text(value, field) {
    if (value === undefined) return undefined;
    if (typeof value !== 'string' || !value.trim() || value.length > 200) fail('Invalid ' + field);
    return value.trim();
}
export function queryOptions(req) {
    const query = {};
    const category = text(req.params.category ?? req.query.category, 'category');
    const impactLevel = text(req.query.impactLevel, 'impactLevel');
    if (category) query.category = category;
    if (impactLevel) query.impactLevel = impactLevel;
    const year = new Date().getUTCFullYear();
    const exact = req.params.trayectoryGet;
    if (exact !== undefined) query.foundationYear = year - integer(exact, 0, 0, year - 1600);
    else if (req.query.minTrayectory !== undefined || req.query.maxTrayectory !== undefined) {
        const min = integer(req.query.minTrayectory, 0, 0, year - 1600);
        const max = integer(req.query.maxTrayectory, year - 1600, 0, year - 1600);
        if (min > max) fail('minTrayectory exceeds maxTrayectory');
        query.foundationYear = { $gte: year - max, $lte: year - min };
    }
    const sortName = req.forcedSort ?? req.query.sort ?? 'name_asc';
    const sorts = { name_asc: { nameCompany: 1, _id: 1 }, name_desc: { nameCompany: -1, _id: -1 }, foundation_asc: { foundationYear: 1, _id: 1 }, foundation_desc: { foundationYear: -1, _id: -1 } };
    if (typeof sortName !== 'string' || !Object.hasOwn(sorts, sortName)) fail('Invalid sort');
    return { query, sort: sorts[sortName], limit: integer(req.query.limite, 20, 1, 100), offset: integer(req.query.desde, 0, 0, 1000000) };
}
async function readPage(req) {
    const { query, sort, limit, offset } = queryOptions(req);
    const [total, rows] = await Promise.all([Company.countDocuments(query), Company.find(query).sort(sort).skip(offset).limit(limit).lean()]);
    return { total, rows: rows.map(row => ({...row, trayectory: new Date().getUTCFullYear() - row.foundationYear})), limit, offset };
}
function dataFor(body, partial = false) {
    const data = {};
    for (const field of ['nameCompany', 'email', 'impactLevel', 'category']) {
        const value = text(body[field], field);
        if (value === undefined && !partial) fail(field + ' is required');
        if (value !== undefined) data[field] = value;
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) fail('Invalid email');
    if (body.foundationYear !== undefined || !partial) {
        const year = body.foundationYear;
        if (!Number.isInteger(year) || year < 1600 || year > new Date().getUTCFullYear()) fail('Invalid foundationYear');
        data.foundationYear = year;
        data.trayectory = new Date().getUTCFullYear() - year;
    }
    if (!Object.keys(data).length) fail('No editable fields');
    return data;
}
function errorResponse(res, error) {
    if (res.headersSent) return res.destroy();
    const status = error.status ?? (error.code === 11000 ? 409 : ['ValidationError', 'CastError'].includes(error.name) ? 400 : 500);
    return res.status(status).json({success:false, message: status === 500 ? 'Internal server error' : error.message});
}
export const createCompany = async (req, res) => {
    try { const newCompany = await Company.create(dataFor(req.body)); return res.status(201).json({success:true,newCompany}); }
    catch(error) { return errorResponse(res,error); }
};
export const listCompanies = async (req,res) => {
    try { const {total,rows,limit,offset} = await readPage(req); return res.json({success:true,total,company:rows,companies:rows,limite:limit,desde:offset}); }
    catch(error) { return errorResponse(res,error); }
};
export const getCompanyTrayectory = listCompanies;
export const getCompanyCategory = listCompanies;
export const getCompaniesAsc = (req,res) => { req.forcedSort = 'name_asc'; return listCompanies(req,res); };
export const getCompaniesDesc = (req,res) => { req.forcedSort = 'name_desc'; return listCompanies(req,res); };
export const updateCompany = async(req,res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.idCompany, {$set:dataFor(req.body,true)}, {new:true,runValidators:true});
        if (!company) fail('Company not found',404);
        return res.json({success:true,company});
    } catch(error) { return errorResponse(res,error); }
};
export const generateCompanyReport = async(req,res) => {
    try {
        const {rows} = await readPage(req);
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Empresas');
        sheet.columns = [{header:'Empresa',key:'nameCompany',width:30},{header:'Email',key:'email',width:30},{header:'Fundacion',key:'foundationYear',width:15},{header:'Impacto',key:'impactLevel',width:15},{header:'Categoria',key:'category',width:20},{header:'Trayectoria',key:'trayectory',width:15}];
        for (const row of rows) sheet.addRow(row);
        sheet.getRow(1).font = {bold:true};
        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').attachment('companies.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    } catch(error) { return errorResponse(res,error); }
};
