/**
 * The default export of `netlify-cms-app` is an object with all of the Netlify CMS
 * extension registration methods, such as `registerWidget` and
 * `registerPreviewTemplate`.
 */
import CMS from "netlify-cms-app"
import React from "react";
import "./cms.scss";
import "./netlify-preview.scss";
import "../css/parallax-image.scss";
import {GalleryWidget} from "./image-widget";


/**
 * Register the imported widget:
 */
console.log("REGISTER NEW NETLIFY WIDGETS...");

CMS.registerEditorComponent(GalleryWidget());
