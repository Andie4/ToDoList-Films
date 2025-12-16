const ENVIRONMENT = getEnvironment();
const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || 'dev-only-secret';

module.exports = {
    PORT,
    SECRET_KEY,
    SECRET,
    ENVIRONMENT,
}


function getEnvironment(){
    return process.env.ENVIRONMENT || 'development';
}