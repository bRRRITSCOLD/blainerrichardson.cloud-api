// node_modules
import * as _ from 'lodash';

// libraries
import { env } from '../../lib/environment';
import { mongo } from '../../lib/mongo';

// models
import { APIError } from '../../models/error';
import { Certification } from '../../models/resume';

export interface PutCertificationsRequestInterface {
  certifications: Certification[];
}

export interface PutCertificationsResponseInterface {
  certifications: Certification[];
}

export async function putCertifications(
  putCertificationsRequest: PutCertificationsRequestInterface,
): Promise<PutCertificationsResponseInterface> {
  try {
    // deconstruct for ease
    const { certifications } = putCertificationsRequest;

    // build and validate the incoming data
    const newCertifications = await Promise.all(
      certifications.map(async (certification) => {
        const newCertification = new Certification(certification);
        const newCertificationValidation = await newCertification.validateAsync();
        if (newCertificationValidation.error) throw newCertificationValidation.error;
        else return newCertification;
      }),
    );

    // get mongo connection
    const blainerrichardsonCloudMongoDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // initialize a bulk operation in mongo
    const bulkOperation = blainerrichardsonCloudMongoDb
      .collection(env.MONGO_BLAINERRICARDSON_CLOUD_CERTIFICATIONS_COLLECTION_NAME)
      .initializeUnorderedBulkOp();

    // loop through each item and replace a school experience
    /// if a correlating one exists and insert/upert a new
    // school experience if a correlating one does not exist
    for (const newCertification of newCertifications) {
      bulkOperation.find({ certificationId: newCertification.certificationId }).upsert().replaceOne(_.assign({}, newCertification));
    }

    // execute out bulk operation with the transaction we started
    const bulkOperationResponse = await bulkOperation.execute();
    bulkOperationResponse;
    // return explicitly
    return {
      certifications: newCertifications,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
