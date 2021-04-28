# Google Cloud Storage service built with express and react

Provides an interface for users to autenticate with their company domain, and upload documents into a Google Storage bucket programmatically.

## Installing gcs-upload-service
Clone repository to your local machine in a directory of your choice
```
git clone https://github.com/kdfriedman/gcs-upload-service.git gcp-upload-service
```
## Usage
### For Dev
Install node_modules
`npm install`

1. Create new Google Cloud Platform Project ([GCP create project](https://console.cloud.google.com/projectcreate))
2. Create new GCP storage bucket ([See details](https://console.cloud.google.com/storage/create-bucket))
3. Generate a new OAuth Client ID (apis & services > credentials > create credentials). While generating the new OAuth Client ID, designate a list of authorized origins and authorized redirect uris (These will be used for authenticating a user).
4. Generate a new service account credential. Once the service account credential has been created, create a new key within the service account and download the JSON file with your service account credential details. (Keep this file VERY secure, do not expose to git)
5. Create environment variable for local machine. `export GOOGLE_APPLICATION_CREDENTIALS='path-to-service-credentials-json-file'`. [See here for details](https://cloud.google.com/docs/authentication/getting-started)
6. Generate both config files to store project environment variables: **config.env + .env**. *Once for server side and one for client side*
7. Move service credential json (e.g. **my-project-name-6aty4rf61c7d.json**) file into root directory, along with both config files.
8. Create new MongoDB account, then create a free tier cluster and choose GCP as your provider. ([MongoDB details here](https://docs.atlas.mongodb.com/tutorial/deploy-free-tier-cluster/)). We use the MongoDB free tier as our session store within our express.js application. If you expect your application to receive significant traffic, it would be best to upgrade to a paid tier.

### Environment Variables List (all values must be present for app to run properly)

config.env | description
------------ | -------------
PORT | port of project (3000)
GOOGLE_CLIENT_ID | OAuth client id
GOOGLE_CLIENT_SECRET | OAuth client secret
GOOGLE_CALLBACK_URI | OAuth callback uri
ORIGIN | origin of project (http://localhost:3000)
SECRET_KEY | string used within session store config via express.js
MONGO_CONNECTION_STRING | connection string used to instantiate the mongoDB connection for session store ([see details](https://docs.mongodb.com/manual/reference/connection-string/))
STORAGE_BUCKET | storage bucket id created within google cloud platform
GOOGLE_APPLICATION_CREDENTIALS | reference to service account credentials json file path
STORAGE_BUCKET_NAME | name of storage bucket created within google cloud platform
CREATIVE_IMAGE_ENDPOINT | endpoint to be used to fetch images to upload to gcp storage bucket
ORG_DOMAIN | org domain, e.g. org-company.com

.env | description
------------ | -------------
API_STORAGE_ENDPOINT | api endpoint reference from express route for storage
API_IMAGE_FETCHER_ENDPOINT | api endpoint reference from express route for image fetcher

### Run app in dev
`npm run dev`
