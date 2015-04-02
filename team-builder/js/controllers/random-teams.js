define(['app'], function (app) {

    app.controller('random-teams', function (siteShell, searchEngineOptimiser) {
        searchEngineOptimiser.setTitle('Team Builder - Random Teams');
        searchEngineOptimiser.setDescription('Sett is all about imagination, take a peak see!');
        searchEngineOptimiser.setKeyWords(['Sett', 'software', 'Get Sett', 'Blog', 'getsett']);
        siteShell.setTitle('Random Teams');
    });
});
