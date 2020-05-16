import faunadb from 'faunadb'

/**
 * Create a FaunaDB client
 * @return {faunadb.Client}
 */
export const getFaunaClient = () => {
    return new faunadb.Client({
        secret: process.env.GATSBY_FAUNADB_SECRET
    });
};

/**
 * TODO refactor this
 * Get last resources name
 * @param event
 * @return {string | *}
 */
export const getLastResourceName = (event) => {
    return event.path.split("/")[event.path.split("/").length-1];
};
