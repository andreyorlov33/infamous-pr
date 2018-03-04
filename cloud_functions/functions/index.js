const admin = require('firebase-admin')
const functions = require('firebase-functions')
const creds = require('./firebase_creds.json')

const fetch_all_news = require('./client/fetch_all_news')
const fetch_artist_news = require('./client/fetch_artist_news')
const fetch_all_artists = require('./client/fetch_all_artists')
const fetch_single_artist = require('./client/fetch_single_artist')
const fetch_dynamic_info = require('./client/fetch_dynamic_info')

const upload_dynamic_info = require('./admin/upload_dynamic_info')

const update_news_article = require('./admin/update_news_article')
const create_news_article = require('./admin/create_news_article')
const delete_news_article = require('./admin/delete_news_article')

const update_client_profile = require('./admin/update_client_profile')
const create_client_profile = require('./admin/create_client_profile')
const delete_client_profile = require('./admin/delete_client_profile')

const upload_image_file = require('./admin/upload_image_file')

admin.initializeApp(functions.config().firebase);

// Client Side Main Website 
// News Data Feeds 
exports.fetch_all_news = functions.https.onRequest(fetch_all_news)
exports.fetch_artist_news = functions.https.onRequest(fetch_artist_news)

//Artist Data Feeds 
exports.fetch_all_artists = functions.https.onRequest(fetch_all_artists)
exports.fetch_single_artist = functions.https.onRequest(fetch_single_artist)

// Misc Website Data and Info 
exports.fetch_dynamic_info = functions.https.onRequest(fetch_dynamic_info)

// ADMIN FULL INFO
exports.upload_dynamic_info = functions.https.onRequest(upload_dynamic_info)

// ADMIN NEWS
exports.create_news_article = functions.https.onRequest(create_news_article)
exports.update_news_article = functions.https.onRequest(update_news_article)
exports.delete_news_article = functions.https.onRequest(delete_news_article)

// ADMIN CLIENT
exports.create_client_profile = functions.https.onRequest(create_client_profile)
exports.update_client_profile = functions.https.onRequest(update_client_profile)
exports.delete_client_profile = functions.https.onRequest(delete_client_profile)

//ADMIN IMAGES
exports.upload_image_file = functions.https.onRequest(upload_image_file)
