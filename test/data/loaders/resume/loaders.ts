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
  workExperiences: WorkExperience[] | WorkExperienceInterface[];
}): Promise<WorkExperience[] | WorkExperienceInterface[]> {
  try {
    // deconstruct for ease
    const { workExperiences } = loadWorkExperiencesDataRequest;

    // get out mongo connection
    const blainerrichardsonDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // insert our data in one sweep
    await blainerrichardsonDb.collection(env.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME).insertMany(workExperiences);

    // return the data for the user
    return workExperiences;
  } catch (err) {
    throw err;
  }
}

export async function loadSchoolExperiencesData(loadSchoolExperiencesDataRequest: {
  schoolExperiences: SchoolExperience[] | SchoolExperienceInterface[];
}): Promise<SchoolExperience[] | SchoolExperienceInterface[]> {
  try {
    // deconstruct for ease
    const { schoolExperiences } = loadSchoolExperiencesDataRequest;

    // get out mongo connection
    const blainerrichardsonDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // insert our data in one sweep
    await blainerrichardsonDb.collection(env.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME).insertMany(schoolExperiences);

    // return the data for the user
    return schoolExperiences;
  } catch (err) {
    throw err;
  }
}

export async function loadCertificationsData(loadCertificationsDataRequest: {
  certifications: Certification[] | CertificationInterface[];
}): Promise<Certification[] | CertificationInterface[]> {
  try {
    // deconstruct for ease
    const { certifications } = loadCertificationsDataRequest;

    // get out mongo connection
    const blainerrichardsonDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // insert our data in one sweep
    await blainerrichardsonDb.collection(env.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME).insertMany(certifications);

    // return the data for the user
    return certifications;
  } catch (err) {
    throw err;
  }
}
