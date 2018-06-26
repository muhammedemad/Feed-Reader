/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* this test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Each feed had not empty URL', function() {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toEqual(0);
            });
        });


        /* This a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Each feed had not empty name', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toEqual(0);
            });
        });
    });

    // the menu test suite
    describe('The menu', function(){
        /* This test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('The menu by default is hidden', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


         /* This a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility when the menu icon is clicked.', function () {
            const menu = $('.menu-icon-link');
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });
    });

        

    /* test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* this test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        let feedContainer = $('.feed .entry-link');

        beforeEach(function(done) {
            loadFeed(0 ,done);
        });

        it('Feed container contains at least one entry', function() {
            expect(feedContainer.children.length).toBeGreaterThan(0);
        });
    });

        

    /* Tis test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* This test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        /* This is not comprehensive. to understand the error put console before expect statement
         and print the value of oldContent and newContent.you see oldContent value is always undefined.
         because You're loading the feeds incorrectly. The loadFeed function should take a callback
         function as parameter and there you have to set the value of the oldContent by using something
         like oldContent= $('.feed').html() and after that you will call the second loadFeed function inside
         that callback and set the value of newContent variable there. To be clear what I'm trying to say
         here is an example. */
        it('new feed is loaded', function(){
            let oldContent;
            beforeEach((done)=> {
                loadFeed(0, function() {
                    // set the value of oldContenthere.
                    loadFeed(1, function() {
                        // set the value of newContent here.
                       done(); // call done here
                    });
                });
            });
            let newContent = $('.feed').html();
            expect(newContent).not.toBe(oldContent);
        });
    });
}());
