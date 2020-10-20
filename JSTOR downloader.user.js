// ==UserScript==
// @name           JSTOR downloader
// @namespace    https://github.com/sun-jiao
// @match          https://plants.jstor.org/stable/10.5555/al.ap.specimen.*
// @grant          GM_xmlhttpRequest
// @version        1.1
// @author       Sun Jiao
// @license        MIT
// @description    Display a banner to download the specimen picture on JSTOR or view it in browser.
// ==/UserScript==


const PREFIX = 'https://plants.jstor.org/seqapp/adore-djatoka/resolver?url_ver=Z39.88-2004&rft_id=';
const SUFFIX = '.jp2&svc_id=info:lanl-repo/svc/getRegion&svc_val_fmt=info:ofi/fmt:kev:mtx:jpeg2000&svc.level=7';

const downloadMessage = 'Download specimen picture from JSTOR  ';

var title = document.getElementsByTagName("title")[0].innerHTML;

function getDownloadLink(url) {
    var res = url.split("?searchUri")[0];
    var finalres = res.split("al.ap.specimen.")[1];
    var urlwithprefix = PREFIX.concat(finalres);
    var fulldownloadurl = urlwithprefix.concat(SUFFIX);
    console.log("full url:", fulldownloadurl);
    return fulldownloadurl;
}

function buildBanner(isDownloadAvailable) {
    const bannerElement = document.createElement('div');
    bannerElement.style = `
      background-color: ${isDownloadAvailable ? 'orange' : 'red'};
      min-height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2147483647;
    `;

    return bannerElement;
}

function buildBannerContent(downloadLink) {
    var filename = title.concat(".jpg");

    const downloadLinkElement = document.createElement('a');
    downloadLinkElement.textContent = downloadMessage;
    downloadLinkElement.href = downloadLink;
    downloadLinkElement.download = filename;
    downloadLinkElement.style = `
      color: white;
      font-size: 16px;
      font-family: arial;
    `;

    return downloadLinkElement;
}

function buildOpenContent(openLink) {
    const openLinkElement = document.createElement('a');
    openLinkElement.textContent = "Open in browser.";
    openLinkElement.href = openLink;
    openLinkElement.target="_blank";
    openLinkElement.style = `
      color: white;
      font-size: 16px;
      font-family: arial;
    `;

    return openLinkElement;
}

function buildSeperateContent() {
    const seperateElement = document.createElement('div');
    seperateElement.textContent = "|";
    seperateElement.style = `
      color: white;
      font-size: 16px;
      font-family: arial;
      padding: 8px;
    `;

    return seperateElement;
}

function displayBanner() {

    const downloadLink = getDownloadLink(window.location.href);

    const banner = buildBanner(downloadLink);
    const bannerContent = buildBannerContent(downloadLink);
    const openContent = buildOpenContent(downloadLink);

    banner.append(bannerContent);
    banner.append(buildSeperateContent());
    banner.append(openContent);
    document.body.prepend(banner);
}

displayBanner();
