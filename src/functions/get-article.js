import faunadb from 'faunadb'
import { getFaunaClient, getLastResourceName } from "./utils"

/* use dotenv to access env variable in get-article.js */
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

const q = faunadb.query;
const ERROR_NOT_FOUND = "NotFound";
exports.handler = (event, context, callback) => {
    const id = getLastResourceName(event);
    console.log(`Function 'get-article' invoked. Read id: ${id}`);
    return getFaunaClient().query(q.Get(q.Match(q.Index("articles_by_id"), id)))
        .then((response) => {
            return {
                statusCode: 200,
                body: JSON.stringify(response)
            }
        }).catch((error) => {
            if(error.name === ERROR_NOT_FOUND){
                return createArticle(id);
            }
            return {
                statusCode: 400,
                body: JSON.stringify(error)
            }
        })
};

/**
 * Create article if not available in DB
 * @param slug
 */
const createArticle = (slug) => {
    return getFaunaClient().query(q.Create(q.Collection('articles'), {data: {id: slug, like: 0}}))
        .then((response) => {
            return {
                statusCode: 200,
                body: JSON.stringify(response)
            }
        }).catch((error) => {
            return {
                statusCode: 400,
                body: JSON.stringify(error)
            }
        })
};
