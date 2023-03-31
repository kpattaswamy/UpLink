# UpLink
UpLink is a chrome extension that allows users to upload files from the browser to the cloud with a simple click. UpLink simplifies sending files to the cloud from the browser without initially downloading it on your local device. 

## How UpLink Works:
* Configure a cloud provider to send files to (UpLink currently supports sending files to AWS S3)
* Simply right-click on a URL from the browser and select `Send with UpLink` to send the file at URL to the configured cloud provider

## To Contribute
1. Clone the repository: `git clone git@github.com:kpattaswamy/UpLink.git`
2. Install dependencies: `npm install`
3. To build the project: `npm run build`
4. To run unit tests: `npm run test`

### Configure UpLink on Chrome Browser
1. From the Chrome Browser, navigate to `Manage Extensions`
2. Select `Load unpacked`
3. Load the `dist` folder from the UpLink project
4. Pin UpLink 
