function App() {
    this.router = {};
    this.games = {};
    this.navigation = {};
    this.progress = {};
    this.lastGameStorage = new LastGameStorage();
}

App.prototype = _.extend({}, Backbone.Events, {
    constructor: App,

    init: function () {
        var app = this;

        this.games = new GameCollection();
        this.games.fetch({
            success: function () {
                app.initLastGame();
                app.renderNavigation();
                app.renderProgress();
                app.initRouting();
            }
        });
    },

    initLastGame: function () {
        if (!this.lastGameStorage.has()) {
            this.lastGameStorage.set(this.games.first());
        }
    },

    renderNavigation: function () {
        this.navigation.changeGame = new NavigationChangeGameView({
            el: '#navigation-change-game-slot',
            games: this.games,
            currentGame: this.lastGameStorage.get()
        });
        this.navigation.changeGame.render();
        
        this.navigation.gameMenu = new NavigationGameMenuView({
            el: '#navigation-game-menu-slot',
            game: this.lastGameStorage.get(),
            fragment: Backbone.history.fragment
        });
        this.navigation.gameMenu.render();
    },

    renderProgress: function () {
        var self = this, i, delay, progress;

        this.progress = new ProgressPanelView({
            el: '#progress-panel-slot',
            icon: '#progress-icon .glyphicon'
        });
        this.progress.render();
        this.progress.addBar('audit-bst535', '5/35', 100);
        this.progress.addBar('audit-bst642', '6/42', 300);


        for (i = 1; i <= 5; i++) {
            setTimeout(function () {
                self.progress.updateBarProgress('audit-bst535', 20);
            }, i * 1000);
        }
        for (i = 1; i <= 30; i++) {
            setTimeout(function () {
                self.progress.updateBarProgress('audit-bst642', 10);
            }, i * 100);
        }

        setTimeout(function () {
            self.progress.addBar('audit-bst649', '6/49', 3);

            setTimeout(function () {
                self.progress.updateBarProgress('audit-bst649', 1);
            }, 2000);
            setTimeout(function () {
                self.progress.updateBarProgress('audit-bst649', 1);
            }, 3000);
            setTimeout(function () {
                self.progress.updateBarProgress('audit-bst649', 1);
            }, 4000);
        }, 15000);
    },

    initRouting: function () {
        this.router = new Router({
            games: this.games,
            lastGame: this.lastGameStorage.get()
        });
        this.listenTo(this.router, 'game:changed', this.changeGame);
        Backbone.history.start();
    },

    changeGame: function (game) {
        this.lastGameStorage.set(game);
        this.navigation.gameMenu.setGame(game);
        this.navigation.gameMenu.setFragment(Backbone.history.fragment);
        this.navigation.gameMenu.render();
    }
});

var app = new App();
app.init();