export default (fn) => (ctx, next) => Promise.resolve(fn(ctx, next)).catch(next);
