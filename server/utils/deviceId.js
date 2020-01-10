import uuidv4 from 'uuid/v4';

const oneYearInMiliSec = 31536000000;

const deviceIdFromCookie = (ctx) => ctx.cookies.get('deviceId');

const generateDeviceId = () => uuidv4();

const deviceIdMiddleware = async (ctx, next) => {
  let deviceId = deviceIdFromCookie(ctx);
  if (!deviceId) {
    deviceId = generateDeviceId();
    ctx.cookies.set('deviceId', deviceId, {
      httpOnly: true,
      maxAge: oneYearInMiliSec,
      secure: true,
    });
  }
  ctx.deviceId = deviceId;

  return next();
};

export default deviceIdMiddleware;
