import { db } from "@/firebase/firebase-config";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { z } from "zod";
import { profileFormSchema } from "@/validators/general-info";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Reference to the unique document "GeneralInformation" in the "Profile" collection
const generalInfoDocRef = doc(db, "Profile", "GeneralInformation");

export const addProfile = async (updatedProfile: ProfileFormValues) => {
  try {
    // Update the specific document with new information
    await updateDoc(generalInfoDocRef, updatedProfile); // This updates existing fields
    console.log("Profile updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; // Rethrow for further handling
  }
};

export const setGeneralInformation = async (profile: ProfileFormValues) => {
  try {
    // Set (overwrite or merge) data in the specific document
    await setDoc(generalInfoDocRef, profile, { merge: true }); // Use `merge: true` to add or update fields
    console.log("General Information set successfully");
    return true;
  } catch (error) {
    console.error("Error setting general information:", error);
    throw error;
  }
};