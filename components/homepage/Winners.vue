<template>
  <section class="Winners">
    <div class="Winners-Section">
      <div class="Title Title--type-h2 Winners-Title">
        Latest winners
      </div>
      <div class="Table TableBordered Winners-Table">
        <div v-for="item in items" :key="item.name" class="Table-Row">
          <div class="Table-Cell TableBordered-Cell Winners-Avatar">
            <img class="Winners-Avatar" :src="item.imgUrl" alt="">
          </div>
          <div class="Table-Cell TableBordered-Cell Winners-Name">
              {{ item.name }} just won<br/>
              in <span class="Winners-Game">{{ item.game }}</span>
          </div>
          <div class="Table-Cell TableBordered-Cell Winners-Money">
            € {{ item.sum }}
          </div>
        </div>
      </div>
    </div>
    <div class="Winners-Section">
      <div class="Title Title--type-h2 Winners-Title">
        top winners
      </div>
      <div class="Table Table--bordered Winners-Table">
        <div v-for="item in items" :key="2 + item.name" class="Table-Row">
          <div class="Table-Cell TableBordered-Cell Winners-Avatar">
            <img class="Winners-Avatar" :src="item.imgUrl" alt="">
          </div>
          <div class="Table-Cell TableBordered-Cell Winners-Name">
            {{ item.name }} just won<br/>
            in <span class="Winners-Game">{{ item.game }}</span>
          </div>
          <div class="Table-Cell TableBordered-Cell Winners-Money">
            € {{ item.sum }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Winners',
  data() {
    return {
      items: [
        {
          name: 'Wild98',
          game: 'Divine Lotus',
          imgUrl: 'https://static.egamings.com/games/thunderkick/divine_lotus.jpg',
          sum: '11.574.60',
        },
        {
          name: 'Dakamu',
          game: 'Jin Chan\'s Pond of Riches',
          imgUrl: 'https://static.egamings.com/games/thunderkick/jin_chans_pond_of_riches.jpg',
          sum: '8.474.25',
        },
        {
          name: 'Ioana Juliana',
          game: 'Dragon Horn',
          imgUrl: 'https://static.egamings.com/games/thunderkick/dragon_horn.jpg',
          sum: '6.274.48',
        },
        {
          name: 'Strike',
          game: 'Sword of Khans',
          imgUrl: 'https://static.egamings.com/games/thunderkick/sword_of_khans.jpg',
          sum: '1.933.29',
        },
        {
          name: 'Farisha',
          game: 'Ravens Eye',
          imgUrl: 'https://static.egamings.com/games/thunderkick/ravens_eye.jpg',
          sum: '843.90',
        },
      ],
    }
  }
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
