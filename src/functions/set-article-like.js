import faunadb from 'faunadb'
import {getLastResourceName, getFaunaClient} from "./utils"

/* use dotenv to access env variable in get-article.js */
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

const q = faunadb.query;
exports.handler = (event, context, callback) => {
    const refId = getLastResourceName(event);
    console.log(`Function 'set-article-like' invoked. update like count for ref: ${refId}`);
    const ref = q.Ref(q.Collection("articles"), refId);
    const increment = q.Add(q.Select(['data','like'], q.Get(ref)), 1);
    return getFaunaClient().query(q.Update(ref, {data: {like: increment}}))
        .then((response) => {
            return {
                statusCode: 200,
                body: JSON.stringify(response)
            }
        }).catch((error) => {
            return  {
                statusCode: 400,
                body: JSON.stringify(error)
            }
        })
};
