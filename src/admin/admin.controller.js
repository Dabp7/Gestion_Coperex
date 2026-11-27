// Demo accounts are created explicitly with npm run seed, never at startup.
export const adminDefaultCreated = async () => { throw new Error('Use npm run seed against the isolated demo database'); };
