import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  modelQuery: Query<T[], T>;
  query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchFields: string[]) {
    const searchTerm = this.query.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or:searchFields.map((field) => ({
          [field] : { $regex: searchTerm, $options: 'i' } 
        }) as FilterQuery<T>)
      });
    }
    return this;
  }

  filter() {
    const objQuery = {
      ...this.query,
    };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    for (const key in objQuery) {
      if (!objQuery[key]) {
        excludeFields.push(key);
      }
    }
    excludeFields.forEach((f) => delete objQuery[f]);
    this.modelQuery = this.modelQuery.find(objQuery as Record<string, unknown>);
    return this;
  }
  sort() {
    const sort = this.query.sort || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
