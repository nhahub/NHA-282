//a custom class for handling database querys from the (API query stirg) ex: url?sort=price&page=2&limit=4&price[lte]=100

//this class recives two arguments the query object and the querystring
//you can chain methods
class APIcontroller {
  constructor(queryObj, queryString) {
    this.queryObj = queryObj;
    this.queryString = queryString;
  }

  filter() {
    const excludeFields = ["sort", "limit", "page", "fields"];
    const filterQueryStr = { ...this.queryString };
    excludeFields.forEach((el) => {
      delete filterQueryStr[el];
    });

    let querystr = JSON.stringify(filterQueryStr);
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.queryObj = this.queryObj.find(JSON.parse(querystr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.queryObj = this.queryObj.sort(this.queryString.sort);
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      let fieldsStr = this.queryString.fields.split(",").join(" ");

      this.queryObj = this.queryObj.select(fieldsStr);
    }
    return this;
  }

  pagination() {
    if (this.queryString.page) {
      let page = +this.queryString.page || 1;
      let limit = +this.queryString.limit || 3;
      let skipVal = (page - 1) * limit;
      this.queryObj = this.queryObj.skip(skipVal).limit(limit);
      //   const docCount = await Movie.countDocuments();
      //   if (skipVal >= docCount) {
      //     throw new Error("page not found");
      //   }
    }
    return this;
  }
}

export default APIcontroller;

//adding Comment to test Discord Bot
