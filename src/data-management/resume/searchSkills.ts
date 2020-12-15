// // node_modules
// import * as _ from 'lodash';

// // libraries
// import { env } from '../../lib/environment';
// import { mongo } from '../../lib/mongo';

// // models
// import { AnyObject } from '../../models/common';
// import { APIError } from '../../models/error';
// import { Skill, SkillInterface } from '../../models/resume';

// export interface SearchSkillsRequestInterface {
//   searchCriteria: AnyObject;
//   searchOptions: {
//     pageNumber?: number;
//     pageSize?: number;
//     totalCount?: boolean;
//   };
// }

// export interface SearchSkillsResponseInterface {
//   skills: Skill[];
//   moreSkills: boolean;
//   totalSkills: number | undefined;
// }

// export async function searchSkills(searchSkillsRequest: SearchSkillsRequestInterface): Promise<SearchSkillsResponseInterface> {
//   try {
//     // deconstruct for ease
//     const { searchCriteria, searchOptions } = searchSkillsRequest;
//     let { pageNumber, pageSize, totalCount } = searchOptions;

//     // default options if not passed in
//     if (!pageNumber) pageNumber = 1;
//     if (!pageSize) pageSize = 500;
//     if (!totalCount) totalCount = false;

//     // create holder for data computations
//     let totalSkills: number | undefined;

//     // get mongo connection
//     const socialMediaHubMongoDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

//     // get cursor
//     const cursor = await socialMediaHubMongoDb
//       .collection(env.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
//       .find({ ...searchCriteria });

//     // get count if wanted by user
//     if (totalCount) totalSkills = await cursor.count();

//     // skip the number of pages times the page size
//     cursor.skip(pageSize * (pageNumber - 1));

//     // limit to only the page size
//     cursor.limit(pageSize + 1);

//     // turn cursor into array of data/objects
//     const fountItems: SkillInterface[] = await cursor.toArray();

//     // return explicitly
//     return {
//       skills: fountItems.slice(0, pageSize).map((foundItem: SkillInterface) => new Skill(foundItem)),
//       moreSkills: fountItems.length > pageSize,
//       totalSkills,
//     };
//   } catch (err) {
//     // build error
//     const error = new APIError(err);

//     // throw error explicitly
//     throw error;
//   }
// }
