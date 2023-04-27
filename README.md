# UpLink (ECE 49595 Open Source Software Senior Design Project)
UpLink is a chrome extension that allows users to upload files from the browser to the cloud with a simple click. UpLink simplifies sending files to the cloud from the browser without initially downloading it on your local device. 

## How UpLink Works:
* Configure a cloud provider to send files to (UpLink currently supports sending files to AWS S3)
* Simply right-click on a URL from the browser and select `Send with UpLink` to send the file at URL to the configured cloud provider

## System Diagram:
<img width="1018" alt="Screen Shot 2023-04-27 at 2 38 56 PM" src="https://user-images.githubusercontent.com/62078498/234960267-eff44045-d97d-44a6-934d-157345cc576b.png">


## How does UpLink store your data?
UpLink stores your data (authentication keys, URL's) in the chrome browser's session storage. UpLink only uses your authentication keys to access the chosen cloud service in order to send files to. These keys are removed from your browser as soon as the extension's session is ended or when you logout from the extension.

## To Contribute
1. Clone the repository: `git clone git@github.com:kpattaswamy/UpLink.git`
2. Install dependencies: `npm install`
3. To build the project: `npm run build`
4. To run unit tests: `npm run test`

## Configure UpLink on Chrome Browser
1. From the Chrome Browser, navigate to `Manage Extensions`
2. Select `Load unpacked`
3. Load the `dist` folder from the UpLink project
4. Pin UpLink 
