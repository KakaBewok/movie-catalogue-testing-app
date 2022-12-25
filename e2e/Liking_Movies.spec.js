/* eslint-disable comma-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');
const { async } = require('regenerator-runtime');

Feature('Liking Movies');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('liking one movie', async ({ I }) => {
  I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');

  I.seeElement('.movie__title a');

  const firstFilm = locate('.movie__title a').first();
  const firstFilmTitle = await I.grabTextFrom(firstFilm);
  I.click(firstFilmTitle);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.movie-item');
  const likedFilmTitle = await I.grabTextFrom('.movie__title');

  assert.strictEqual(firstFilmTitle, likedFilmTitle);
});

Scenario('searching movies', async ({ I }) => {
  I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');

  I.seeElement('.movie__title a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.movie__title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.movie__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/like');
  I.seeElement('#query');

  // test pencariannya
  const searchQuery = titles[1].substring(1, 3);
  const matchingMovies = titles.filter(
    (title) => title.indexOf(searchQuery) !== -1
  );

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedMovies = await I.grabNumberOfVisibleElements('.movie-item');
  assert.strictEqual(matchingMovies.length, visibleLikedMovies);

  matchingMovies.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(
      locate('.movie__title').at(index + 1)
    );
    assert.strictEqual(title, visibleTitle);
  });
});
