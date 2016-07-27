var Router = Backbone.Router.extend({
    games: {},
    lastGame: {},

    routes: {
        '': 'index',
        'browse/:id': 'browseYears',
        'browse/:id/:year': 'browseDraws'
    },

    initialize: function (options) {
        this.games = options.games;
        this.lastGame = options.lastGame;
    },

    findGame: function (id) {
        var game = this.games.findWhere({id: id});
        this.trigger('game:found', game);

        return game;
    },

    index: function () {
        this.navigate('browse/' + this.lastGame.get('id'), {trigger: true});
    },

    browseYears: function (id) {
        var game = this.findGame(id);

        game.loadYears(function () {
            var view = new BrowseYearsView({
                el: '#content-slot',
                game: game
            });
            view.render();
        });
    },

    browseDraws: function (id, year) {
        var view, draws;

        draws = new DrawCollection(null, {
            game: this.findGame(id),
            year: new YearModel({year: year})
        });
        draws.fetch({
            success: function (draws) {
                view = new BrowseDrawsView({
                    el: '#content-slot',
                    draws: draws
                });
                view.render();
            }
        });
    }
});