// custom typefaces
import "typeface-montserrat"
import "prismjs/themes/prism.css"

export function replaceHydrateFunction() {
    return (element, container, callback) => {
        ReactDOM.render(element, container, callback);
    };
}
