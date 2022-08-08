export const basicAuthorizer = async (event) => {
  console.log(event);
  let auth = "Deny";

  if (event.Authorization === process.env.rpayeras) {
    auth = "Allow";
  } else {
    auth = "Deny";
  }

  const authResponse = {
    principalId: "abc123",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "executive-api:Invoke",
          Resource: [
            "arn:aws:execute-api:eu-west-1:471876932224:elk4qd7jzh/*/GET/import",
          ],
          Effect: auth,
        },
      ],
    },
  };

  console.log(authResponse);

  return authResponse;
};

export const main = basicAuthorizer;
