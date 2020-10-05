<template>
  <section class="Winners">
    <div class="Winners-Section">
      <div class="Title Title--type-h2 Winners-Title">
        Latest winners
      </div>
      <div class="Table Winners-Table">
        <div class="Table-Row">
          <div class="Table-Cell Winners-Avatar">
            <img class="Winners-Avatar" src="@/assets/img/game1.png" alt="">
          </div>
          <div class="Table-Cell Winners-Name">
              wild98 just won<br/>
              in <span class="Winners-Game">Golden Ticket</span>
          </div>
          <div class="Table-Cell Winners-Money">
            € 11.574.60
          </div>
        </div>
        <div class="Table-Row">
          <div class="Table-Cell Winners-Avatar">
            <img class="Winners-Avatar" src="@/assets/img/game2.png" alt="">
          </div>
          <div class="Table-Cell Winners-Name">
            Dakamu just won<br/>
            in <span class="Winners-Game">Ozwins Jackpot</span>
          </div>
          <div class="Table-Cell Winners-Money">
            € 8.474.25
          </div>
        </div>
        <div class="Table-Row">
          <div class="Table-Cell Winners-Avatar">
            <img class="Winners-Avatar" src="@/assets/img/game3.png" alt="">
          </div>
          <div class="Table-Cell Winners-Name">
            Ioana Juliana just won<br/>
            in <span class="Winners-Game">Dawn of Egypt</span>
          </div>
          <div class="Table-Cell Winners-Money">
            € 6.274.48
          </div>
        </div>
        <div class="Table-Row">
          <div class="Table-Cell Winners-Avatar">
            <img class="Winners-Avatar" src="@/assets/img/game4.png" alt="">
          </div>
          <div class="Table-Cell Winners-Name">
            Strike just won<br/>
            in <span class="Winners-Game">Treasure heroes</span>
          </div>
          <div class="Table-Cell Winners-Money">
            € 1.933.29
          </div>
        </div>
        <div class="Table-Row">
          <div class="Table-Cell Winners-Avatar">
            <img class="Winners-Avatar" src="@/assets/img/game5.png" alt="">
          </div>
          <div class="Table-Cell Winners-Name">
            Farisha just won<br/>
            in <span class="Winners-Game">Wild Robo Factory</span>
          </div>
          <div class="Table-Cell Winners-Money">
            € 843.90
          </div>
        </div>
      </div>
    </div>
    <div class="Winners-Section">
      <div class="Title Title--type-h2 Winners-Title">
        Latest winners
      </div>
      <div class="Table Winners-Table">
        <div class="Table-Row">
          <div class="Table-Cell Winners-Avatar">
            <img class="Winners-Avatar" src="@/assets/img/game1.png" alt="">
          </div>
          <div class="Table-Cell Winners-Name">
            wild98 just won<br/>
            in <span class="Winners-Game">Golden Ticket</span>
          </div>
          <div class="Table-Cell Winners-Money">
            € 11.574.60
          </div>
        </div>
        <div class="Table-Row">
          <div class="Table-Cell Winners-Avatar">
            <img class="Winners-Avatar" src="@/assets/img/game2.png" alt="">
          </div>
          <div class="Table-Cell Winners-Name">
            Dakamu just won<br/>
            in <span class="Winners-Game">Ozwins Jackpot</span>
          </div>
          <div class="Table-Cell Winners-Money">
            € 8.474.25
          </div>
        </div>
        <div class="Table-Row">
          <div class="Table-Cell Winners-Avatar">
            <img class="Winners-Avatar" src="@/assets/img/game3.png" alt="">
          </div>
          <div class="Table-Cell Winners-Name">
            Ioana Juliana just won<br/>
            in <span class="Winners-Game">Dawn of Egypt</span>
          </div>
          <div class="Table-Cell Winners-Money">
            € 6.274.48
          </div>
        </div>
        <div class="Table-Row">
          <div class="Table-Cell Winners-Avatar">
            <img class="Winners-Avatar" src="@/assets/img/game4.png" alt="">
          </div>
          <div class="Table-Cell Winners-Name">
            Strike just won<br/>
            in <span class="Winners-Game">Treasure heroes</span>
          </div>
          <div class="Table-Cell Winners-Money">
            € 1.933.29
          </div>
        </div>
        <div class="Table-Row">
          <div class="Table-Cell Winners-Avatar">
            <img class="Winners-Avatar" src="@/assets/img/game5.png" alt="">
          </div>
          <div class="Table-Cell Winners-Name">
            Farisha just won<br/>
            in <span class="Winners-Game">Wild Robo Factory</span>
          </div>
          <div class="Table-Cell Winners-Money">
            € 843.90
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Winners',
};
</script>

<style lang="scss">
.Winners {
  display: flex;
  flex-direction: column;

  @media(min-width: $screen-s) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 80px;
  }

  &-Section {
    width: 100%;
    margin-bottom: 30px;

    @media(min-width: $screen-s) {
      width: calc(50% - 16px);
      margin-bottom: 0;
    }

    @media(min-width: $screen-l) {
      width: calc(50% - 41px);
    }

    @media(min-width: $screen-xl) {
      width: calc(50% - 69px);
    }
  }

  &-Title {
    margin-bottom: 19px;
  }

  &-Avatar {
    padding-left: 0;
    padding-right: 0;
    width: 64px;
    height: 64px;

    @media(min-width: $screen-m) {
      width: 76px;
      height: 76px;
    }

    @media(min-width: $screen-xl) {
      width: 90px;
      height: 90px;
    }
  }

  &-Name {
    padding-left: 15px;
    font-size: 10px;
    font-weight: 700;
    line-height: 124%;
    color: var(--color-text-ghost);

    @media(min-width: $screen-l) {
      font-size: 12px;
    }

    @media(min-width: $screen-xl) {
      font-size: 14px;
    }
  }

  &-Game {
    color: var(--color-text-main);
  }

  &-Money {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-main1);
    white-space: nowrap;

    @media(min-width: $screen-m) {
      font-size: 18px;
    }

    @media(min-width: $screen-l) {
      font-size: 20px;
    }

    @media(min-width: $screen-xl) {
      font-size: 24px;
    }
  }
}
</style>
