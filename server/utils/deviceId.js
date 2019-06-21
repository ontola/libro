import uuidv4 from 'uuid/v4';

export const deviceIdFromCookie = req => req.cookies.deviceId;

export const generateDeviceId = () => uuidv4();
