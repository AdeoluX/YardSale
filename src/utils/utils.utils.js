function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

const paginateOptions = (req) => {
    const page = req?.query.page || 1;
    const perPage = req?.query.perPage || 15;
    return {
      limit: perPage,
      offset: (page - 1) * perPage,
    };
  };

module.exports = {generateRandomString, paginateOptions}