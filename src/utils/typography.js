import Typography from "typography"

const typography = new Typography({
    title: "Custom typography for the blog",
    baseFontSize: "16px",
    baseLineHeight: 1.75,
    scaleRatio: 5 / 2,
    googleFonts: [
        {
            name: "Darker Grotesque",
            styles: ["400"],
        },
        {
            name: "poiret one",
            styles: ["700"],
        }
    ],
    headerFontFamily: ["Arial", "sans-serif"],
    bodyFontFamily: ["baskerville", "Arial", "sans-serif"],
    bodyColor: "hsla(0,0%,0%,0.9)",
    headerWeight: 900,
    bodyWeight: 400,
    boldWeight: 700,
    overrideStyles: ({adjustFontSizeTo, scale, rhythm}, options) => ({
        blockquote: {
            ...scale(1 / 5),
            color: "#696969",
            fontStyle: "italic",
            paddingLeft: rhythm(13 / 16),
            marginLeft: rhythm(-1),
            borderLeft: `${rhythm(3 / 16)} solid #696969}`,
        },
        "blockquote > :last-child": {
            marginBottom: 0,
        },
        "blockquote cite": {
            ...adjustFontSizeTo(options.baseFontSize),
            color: options.bodyColor,
            fontWeight: options.bodyWeight,
        },
        "blockquote cite:before": {
            content: '"— "',
        },
        ul: {
            listStyle: "disc",
        },
        "ul,ol": {
            marginLeft: 0,
        },
        "h1,h2,h3,h4,h5,h6": {
            marginTop: rhythm(2),
            fontFamily: ["Montserrat", "sans-serif"].join(","),
        },
        h4: {
            letterSpacing: "0.140625em",
            textTransform: "uppercase",
        },
        h6: {
            fontStyle: "italic",
        },
        a: {
            boxShadow: "0 1px 0 0 currentColor",
            color: "#007acc",
            textDecoration: "none",
        },
        "a:hover,a:active": {
            boxShadow: "none",
        },
        "mark,ins": {
            background: "#007acc",
            color: "white",
            padding: `${rhythm(1 / 16)} ${rhythm(1 / 8)}`,
            textDecoration: "none",
        },
    })
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
