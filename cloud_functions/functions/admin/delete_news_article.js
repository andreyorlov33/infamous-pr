const admin = require('firebase-admin')
const functions = require('firebase-functions')

module.exports = function (request, response) {

    const data = JSON.parse(Object.keys(request.body)[0]);

    if (request.method === `OPTIONS`) {
        response.set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', 'GET, POST')
            .set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
            .set('Content-Type', 'application/json')
            .status(200);
        return;
    }

    if (!data.id) {
        response.set('Access-Control-Allow-Origin', "*")
        response.set('Access-Control-Allow-Methods', 'GET, POST')
        response.status(402).send({error: 'Please provide artist name'});
        return;
    }

    admin.firestore()
        .collection('news_stories')
        .doc(data.id)
        .delete()
        .then(() => {
            response.set('Access-Control-Allow-Origin', "*")
            response.set('Access-Control-Allow-Methods', 'GET, POST')
            response.status(200).send({message: `Article ${id} deleted from DB !!!`})
        })
        .catch(err => {
            response.set('Access-Control-Allow-Origin', "*")
            response.set('Access-Control-Allow-Methods', 'GET, POST')
            response.status(500).send({message:'Error deleteing News Article from DB', error: err})
        })
}