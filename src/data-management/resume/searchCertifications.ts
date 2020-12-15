// node_modules
import * as _ from 'lodash';

// libraries
import { env } from '../../lib/environment';
import { mongo } from '../../lib/mongo';

// models
import { AnyObject } from '../../models/common';
import { APIError } from '../../models/error';
import { Certification, CertificationInterface } from '../../models/resume';

export interface SearchCertificationsRequestInterface {
  searchCriteria: AnyObject;
  searchOptions: {
    pageNumber?: number;
    pageSize?: number;
    totalCount?: boolean;
  };
}

export interface SearchCertificationsResponseInterface {
  certifications: Certification[];
  moreCertifications: boolean;
  totalCertifications: number | undefined;
}

export async function searchCertifications(
  searchCertificationsRequest: SearchCertificationsRequestInterface,
): Promise<SearchCertificationsResponseInterface> {
  try {
    // deconstruct for ease
    const { searchCriteria, searchOptions } = searchCertificationsRequest;
    let { pageNumber, pageSize, totalCount } = searchOptions;

    // default options if not passed in
    if (!pageNumber) pageNumber = 1;
    if (!pageSize) pageSize = 500;
    if (!totalCount) totalCount = false;

    // create holder for data computations
    let totalCertifications: number | undefined;

    // get mongo connection
    const socialMediaHubMongoDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // get cursor
    const cursor = await socialMediaHubMongoDb
      .collection(env.MONGO_BLAINERRICARDSON_CLOUD_CERTIFICATIONS_COLLECTION_NAME)
      .find({ ...searchCriteria });

    // get count if wanted by user
    if (totalCount) totalCertifications = await cursor.count();

    // skip the number of pages times the page size
    cursor.skip(pageSize * (pageNumber - 1));

    // limit to only the page size
    cursor.limit(pageSize + 1);

    // turn cursor into array of data/objects
    const fountItems: CertificationInterface[] = await cursor.toArray();

    // return explicitly
    return {
      certifications: fountItems.slice(0, pageSize).map((foundItem: CertificationInterface) => new Certification(foundItem)),
      moreCertifications: fountItems.length > pageSize,
      totalCertifications,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
