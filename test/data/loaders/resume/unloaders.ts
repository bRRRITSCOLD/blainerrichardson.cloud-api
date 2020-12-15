// node_modules
import * as _ from 'lodash';

// models
import {
  Certification,
  CertificationInterface,
  SchoolExperience,
  SchoolExperienceInterface,
  WorkExperience,
  WorkExperienceInterface,
} from '../../../../src/models/resume';

// libraries
import { mongo } from '../../../../src/lib/mongo';
import { env } from '../../../../src/lib/environment';

export async function loadWorkExperiencesData(loadWorkExperiencesDataRequest: {
  workExperiences: WorkExperienceInterface[];
}): Promise<boolean> {
  try {
    // deconstruct for ease
    const { workExperiences } = loadWorkExperiencesDataRequest;

    // get out mongo connection
    const blainerrichardsonDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // insert our data in one sweep
    await blainerrichardsonDb.collection(env.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME).deleteMany({
      companyName: {
        $in: _.uniq(workExperiences.map((workExperience: WorkExperience | WorkExperienceInterface) => workExperience.companyName)),
      },
    });

    // return the data for the user
    return true;
  } catch (err) {
    throw err;
  }
}

export async function loadSchoolExperiencesData(loadSchoolExperiencesDataRequest: {
  schoolExperiences: SchoolExperienceInterface[];
}): Promise<boolean> {
  try {
    // deconstruct for ease
    const { schoolExperiences } = loadSchoolExperiencesDataRequest;

    // get out mongo connection
    const blainerrichardsonDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // insert our data in one sweep
    await blainerrichardsonDb.collection(env.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME).deleteMany({
      schoolName: {
        $in: _.uniq(schoolExperiences.map((schoolExperience: SchoolExperienceInterface) => schoolExperience.schoolName)),
      },
    });

    // return the data for the user
    return true;
  } catch (err) {
    throw err;
  }
}

export async function loadCertificationsData(loadCertificationsDataRequest: {
  certifications: CertificationInterface[];
}): Promise<boolean> {
  try {
    // deconstruct for ease
    const { certifications } = loadCertificationsDataRequest;

    // get out mongo connection
    const blainerrichardsonDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // insert our data in one sweep
    await blainerrichardsonDb.collection(env.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME).deleteMany({
      schoolName: {
        $in: _.uniq(certifications.map((certification: CertificationInterface) => certification.institution)),
      },
    });

    // return the data for the user
    return true;
  } catch (err) {
    throw err;
  }
}
