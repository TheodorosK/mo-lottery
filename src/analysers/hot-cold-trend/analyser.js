function HotColdTrendAnalyser() {
    this.periodFactory = new HotColdTrendPeriodFactory();
    this.resultFactory = new HotColdTrendResultFactory();
}

HotColdTrendAnalyser.prototype = {
    constructor: HotColdTrendAnalyser,

    getResult: function (numbers, draws, drawsPerPeriod, periodCount) {
        var periods, drawCount;

        draws.reverse();
        drawCount = drawsPerPeriod * periodCount;
        periods = this.periodFactory.get(
            numbers,
            draws.slice(0, drawCount),
            periodCount
        );

        return this.resultFactory.get(periods);
    },

    test: function () {
        /*var tests = [], iterator;

        for (iterator = 1; iterator <= 20; iterator++) {
            tests.push(this.createTest(iterator * 12, 730));
        }

        // order tests by their score
        tests.sort(function (a, b) {
            return b.getScore() - a.getScore();
        });

        return tests;*/
        
        return [];
    },

    createTest: function (drawCount, iterations) {
        /*var currentIteration = 1, drawStart = 1, lastDraw, suggestion, test;

        test = new HotColdTrendTestData(this.game.get('drawSize'), drawCount, this.periodCount);
        while (currentIteration <= iterations) {
            lastDraw = this.draws[drawStart - 1];
            suggestion = this.suggestions.get(
                this.periods.get(
                    this.game.get('numbers'),
                    this.draws.slice(drawStart, drawStart + drawCount),
                    this.periodCount
                ),
                this.game.get('drawSize')
            );

            // update test data
            test.check(suggestion, lastDraw);

            // increase iteration counters
            currentIteration++;
            drawStart++;
        }
        test.calculateScore();

        return test;*/
    }
};