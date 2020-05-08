import * as json2mq from "json2mq";

/**
 * we can't create new custom breakpoint with material-ui < 5 let create some media queries
 * these media queries allow to split xs screen size into multiple ones
 */

export const MediaQueryUtils = {
    mediaQueries : {
        layoutXL :  json2mq({minWidth: 1920}),
        layoutLG :json2mq({minWidth: 1280, maxWidth: 1920 -1}),
        layoutMD : json2mq({minWidth: 960, maxWidth: 1280 -1}),
        layoutSM : json2mq({minWidth: 600, maxWidth: 960 -1}),
        layoutXS_LG : json2mq({minWidth: 450, maxWidth: 600 -1}),
        layoutXS_MD : json2mq({minWidth: 350, maxWidth: 450 -1}),
        layoutXS : json2mq({minWidth: 280, maxWidth: 350 -1})
    },
    get : (mediaQueryName) => {
        return MediaQueryUtils.mediaQueries[mediaQueryName];
    }
};
