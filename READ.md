checkHealth
CheckHealth is an Android and iOS Nativescript mobile app for Asthmatic patients and medical practitioners.

This app helps asthmatic patients in keeping track of their health. It involves both the doctor and patient sections. Patients can read on asthma write-ups and relevant information. Also, patients can upload their daily vital information and send it to the doctor by creating a weekly history.

Doctors can see patients daily vitals as well as their weekly histories. They can send a message to patients when they notice abnormal readings.

To run in development, fill in the Firebase URL and API_KEY in the src/app/helpers/key.ts file.

To run on android tns run android

To run on iOS tns run iOS

TO build a debug apk

To build a release apk run tns build android --release --key-store-path <my-key.keystore> --key-store-password <password> --key-store-alias <my-android-key> --key-store-alias-password <password>

Thumbs up to @Afolabidivia for his immense contribution.
