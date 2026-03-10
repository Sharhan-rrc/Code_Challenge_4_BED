
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import serviceAccount from "Coding-challenge.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const auth: Auth = getAuth();

export { auth };
