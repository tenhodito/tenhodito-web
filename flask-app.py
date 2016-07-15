from flask import Flask, render_template, request
from flask_pymongo import PyMongo
import json
from collections import Counter

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'learningmongo'
mongo = PyMongo(app)


def normalized_coherence(value):
    congressmen = mongo.db.congressmen.find().sort("coherence", -1)
    congressmen = filter(lambda x: 'coherence' in x, congressmen)
    congressmen = filter(lambda x: x['coherence'] > 0, congressmen)
    max = congressmen[0]['coherence']
    min = congressmen[-1]['coherence']
    normalized_value = (((10 - (-10))*(value - min))/(max - min)) + (-10)
    return round(normalized_value, 1)


@app.cli.command('dbseed')
def dbseed_command():
    """Seeds the database."""
    print 'Seeding the database...'
    congressmen = dict()
    with open('final.json', 'r') as data_file:
        congressmen = json.load(data_file)

    congressman = mongo.db.congressmen
    for cm in congressmen:
        congressmen[cm]['nickname'] = cm
        congressman.insert(congressmen[cm], check_keys=False)
    print 'db was seeded'


@app.route('/')
def ranking():
    congressmen = mongo.db.congressmen.find().sort("coherence", -1)
    congressmen = filter(lambda x: 'coherence' in x, congressmen)
    congressmen = filter(lambda x: x['coherence'] > 0, congressmen)
    top = congressmen[:5]
    bottom = congressmen[-5:]
    for cm in top:
        print cm['name'], normalized_coherence(cm['coherence'])
    for cm in bottom:
        print cm['name'], normalized_coherence(cm['coherence'])
    return render_template('index.html', top=top, bottom=bottom, normalized_coherence=normalized_coherence)


@app.route('/search')
def search():
    query = request.args['q']
    search_results = mongo.db.congressmen.find({"$or": [{'nickname': {'$regex': query, '$options': '-i'}}, {'name': {'$regex': query, '$options': '-i'}}]}).sort("coherence", -1)
    return render_template('search.html', search_results=search_results, normalized_coherence=normalized_coherence)


@app.route('/congressman/<nickname>')
def show_congressman(nickname):
    cm = mongo.db.congressmen.find_one({'nickname': nickname})
    top_speech_words = Counter(cm['speeches'])
    top_speech_words = top_speech_words.most_common(15)
    top_proposal_words = Counter(cm['proposals'])
    top_proposal_words = top_proposal_words.most_common(15)
    top_speeches_list = []
    top_proposals_list = []
    for k, v in top_speech_words:
        top_speeches_list.append(k)
    for k, v in top_proposal_words:
        top_proposals_list.append(k)
    return render_template('show_congressman.html', cm=cm, top_speeches_list=top_speeches_list, top_proposals_list=top_proposals_list)


@app.route('/about')
def about_page():
    return 'about static'
