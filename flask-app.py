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
    # min = congressmen[-1]['coherence']
    min = 0 # avoid negative coherence
    normalized_value = (((10 - (-10))*(value - min))/(max - min)) + (-10)
    return round(normalized_value, 1)


@app.cli.command('dbseed')
def dbseed_command():
    """Seeds the database."""
    print 'Seeding the database...'
    congressmen = dict()
    with open('data.json', 'r') as data_file:
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
    bottom = bottom[::-1]
    for cm in top:
        cm['coherence'] = normalized_coherence(cm['coherence'])
    for cm in bottom:
        cm['coherence'] = normalized_coherence(cm['coherence'])
    return render_template('index.html', top=top, bottom=bottom)


@app.route('/busca')
def search():
    query = request.args['q']
    search_results = list(mongo.db.congressmen.find({"$or": [{'nickname': {'$regex': query, '$options': '-i'}}, {'name': {'$regex': query, '$options': '-i'}}]}).sort("coherence", -1))
    for cm in search_results:
        if 'coherence' in cm:
            cm['coherence'] = normalized_coherence(cm['coherence'])
        else:
            cm['coherence'] = '*'  # this is lower than digits
    return render_template('search.html', search_results=search_results)


@app.route('/deputado/<nickname>')
def show_congressman(nickname):
    cm = mongo.db.congressmen.find_one({'nickname': nickname})
    top_speech_words = Counter(cm['speeches'])
    top_speech_words = top_speech_words.most_common(15)
    top_proposal_words = Counter(cm['proposals'])
    top_proposal_words = top_proposal_words.most_common(15)
    # verify if coherence is present
    if 'coherence' in cm:
        cm['coherence'] = normalized_coherence(cm['coherence'])
    else:
        cm['coherence'] = '*'  # this is lower than digits
    return render_template('show_congressman.html', cm=cm, top_speech_words=top_speech_words, top_proposal_words=top_proposal_words)


@app.route('/como-funciona')
def about_page():
    return render_template('como-funciona.html')


@app.route('/deputados')
def list_all():
    search_results = list(mongo.db.congressmen.find().sort("coherence", -1))
    for cm in search_results:
        if 'coherence' in cm:
            cm['coherence'] = normalized_coherence(cm['coherence'])
        else:
            cm['coherence'] = '*'  # this is lower than digits
    return render_template('list_all.html', search_results=search_results)
