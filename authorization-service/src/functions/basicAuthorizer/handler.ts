export const basicAuthorizer = async (event) => {
  console.log(event);

  let auth = "Deny";

  const tokenUnparsed = event.headers.Authorization.split(" ")[1];
  const token = Buffer.from(tokenUnparsed, "base64").toString("ascii");
  const envName = token.split(":")[0];
  const envPassword = token.split(":")[1];

  if (envPassword === process.env[envName]) {
    auth = "Allow";
  }

  const authResponse = {
    principalId: "serverless-admin",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Resource: [
            `arn:aws:execute-api:${process.env.AWS_CLIENT_REGION}:${process.env.AWS_ACCOUNT_ID}:${process.env.AWS_API_PRODUCTS}/*/GET/import`,
          ],
          Effect: auth,
        },
      ],
    },
  };

  console.log(authResponse);
  console.log(auth);

  return authResponse;
};

export const main = basicAuthorizer;
