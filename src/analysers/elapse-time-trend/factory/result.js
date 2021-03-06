function ElapseTimeTrendResultFactory() {
    this.numberExtractor = new AnalyserNumberExtractor();
}

ElapseTimeTrendResultFactory.prototype = {
    constructor: ElapseTimeTrendResultFactory,

    get: function (period, elapseTimeSorter, gapDistanceSorter) {
        this.elapseTimeSorter = elapseTimeSorter;
        this.gapDistanceSorter = gapDistanceSorter;

        return new ElapseTimeTrendResultData(
            period,
            this.getElapseTimeNumbers(period.getHits()),
            this.getElapseTimeGapNumbers(period.getHits())
        );
    },

    getElapseTimeNumbers: function (hits) {
        // sort hits by elapse time
        // HINT: there is a known bug here - if the period is not long enough
        // elapse times of 0 and null would be considered equal
        // FIX: just make sure periods are long enough
        this.elapseTimeSorter.sort(hits, 'getElapseTime', 'getNumber');
        hits.reverse();

        return this.numberExtractor.extract(hits);
    },
    
    getElapseTimeGapNumbers: function (hits) {
        // remove hits that have no elapse time gap
        hits = _.filter(hits, function (hit) {
            return (hit.getElapseTimeGap() != null);
        });
        
        // sort hits by elapse time gap distance to -1
        // HINT: we are using -1 as a 0 by moving all numbers one position to the right (+1),
        // than by applying an absolute value we get the distance
        this.gapDistanceSorter.sort(hits, 'getElapseTimeGapDistance', 'getNumber');
        
        return this.numberExtractor.extract(hits);
    }
};