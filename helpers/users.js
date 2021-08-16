const crypto = require('crypto');

const PRIVATE_KEY = "superSecretStringNowoneShouldKnowOrTheCanGenerateTokens"

const calculateToken = (userEmail = "") => {
    return crypto.createHash('md5').update(userEmail + PRIVATE_KEY).digest("hex");
}

module.exports = { calculateToken };