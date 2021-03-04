/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types*/
export const getCurrentPopup = (state: any) => state.getIn(['popup', 'resource']);
export const getCurrentLocation = (state: any) => state.getIn(['popup', 'location']);
