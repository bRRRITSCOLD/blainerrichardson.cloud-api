import jsonStringifySafe from 'json-stringify-safe';

export const anyUtils = {
  stringify(
    item: any,
    options: {
      native?: boolean;
      replacer?: ((this: any, key: string, value: any) => any) | undefined;
      space?: string | number | undefined;
    } = {},
  ): string {
    // deconstruct for east
    const { native, replacer, space } = options;
    // if native use native JSON.stringify
    if (native) return JSON.stringify(item, replacer, space);
    // else use the json-stringify-safe library
    return jsonStringifySafe(item);
  },
};
