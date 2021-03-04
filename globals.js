/* eslint-env node */
export const btoa = function btoa(str) { return Buffer.from(str).toString('base64'); };

export default btoa;
