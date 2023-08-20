const admin = require("firebase-admin");
const readline = require("readline");

const serviceAccount = require("./serviceAccountKey.json");
const { UserRecord } = require("firebase-admin/lib/auth/user-record");
const { log } = require("console");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://example-5f828-default-rtdb.firebaseio.com",
});

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

r1.question("Email:", (email) => {
  r1.question("Password:", (password) => {
    admin
      .auth()
      .createUser({
        email: email,
        password: password,
      })
      .then((UserRecord) => {
        console.log("Successfully created new user:", UserRecord.uid);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      })
      .finally(() => {
        r1.close();
      });
  });
});
