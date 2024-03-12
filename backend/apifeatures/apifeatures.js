const searchByKeyword = (query, queryStr) => {
  const keyword = queryStr.keyword
    ? {
        title: {
          $regex: queryStr.keyword,
          $options: "i",
        },
      }
    : {};
  return query.find({ ...keyword });
};

const filter = (query, queryStr) => {
    // Create a copy of the query object
    const queryCopy = { ...queryStr };
    const removeFields = ["keyword", "page", "limit"];

    // Remove specified fields from the query copy
    removeFields.forEach((key) => delete queryCopy[key]);

    // Convert the query copy to a JSON string and replace certain keywords
    let queryString = JSON.stringify(queryCopy);
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    // Parse the modified JSON string back into an object and apply the filtered query
    return query.find(JSON.parse(queryString));
};



module.exports = {searchByKeyword, filter};
