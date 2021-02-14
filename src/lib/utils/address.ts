// node_modules
import * as _ from 'lodash';

export const addressUtils = {
  format(formatRequest: { addressLine1?: string; addressLine2?: string; city?: string; state?: string; zipCode?: string }) {
    // create a standard address format in array format
    const arrayFormattedAddress = Object.keys(formatRequest)
      .map((key: string) => (formatRequest as any)[key])
      .filter((item) => item !== undefined);

    return arrayFormattedAddress.join(', ');
  },
};
