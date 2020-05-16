import fetch from 'isomorphic-fetch'

/**
 * Get article likes
 * @param slug
 * @return {Promise<any>}
 */
export const getArticleLike = (slug) => {
    const newSlug = slug.replace("/", "").replace("/", "");
    return fetch(`/.netlify/functions/get-article/${newSlug}`, {}).then((response) => {
        return response.json()
    }).catch(fail => console.log(fail));
};

/**
 * Increment article like
 * @param {String} ref - faunadb document ref
 * @return {Promise<void> | Promise<postcss.Result | void> | Promise<any>}
 */
export const likeArticle = (ref) => {
    return fetch(`/.netlify/functions/set-article-like/${ref}`, {}).then((response) => {
        return response.json()
    }).catch(fail => console.log(fail));
};
