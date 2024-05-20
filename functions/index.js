const {onCall,HttpsError} = require("firebase-functions/v2/https");
const {getDatabase} = require("firebase-admin/database");
const {logger} = require("firebase-functions/v2");
const admin=require('firebase-admin')
admin.initializeApp();

exports.createUserAndAssignRole = onCall(async (request) => {
  try {
    if (!request.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new HttpsError("failed-precondition", "The function must be " +
              "called while authenticated.");
    }
    const { data } = request;


    const userRecord =  await admin.auth().createUser({
      email: "parent@parent.com",
      password: "12345678",
    });
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: "parent" });
    const parentData = {
      ...data,
      id: userRecord.uid,
    };
    await admin.firestore().collection('Parents').doc(userRecord.uid).set(parentData);

    logger.info("User created and assigned role:", { uid: userRecord.uid });

    return { success: true, uid: userRecord.uid, data: data };
  } catch (error) {
    // Log error message
    logger.error("Error creating user and assigning role:", error);

    // Throw HttpsError
    throw new HttpsError("internal", "Error creating user and assigning role");
  }
});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
