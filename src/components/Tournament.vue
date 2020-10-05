<template>
  <!-- eslint-disable max-len -->
  <section class="Tournament">
    <div class="Wrapper">
      <div class="Title Title--type-h1 Tournament-Title">
        Sign up <span class="Colored">&</span> win <br/>
        two day tournament
      </div>
      <div class="Title Title--type-h2 Tournament-Subtitle">
        € 500 <span class="Colored">+</span> 500 Free Spins every day!
      </div>
      <div class="Tournament-Participate">
        <div class="Btn Tournament-Btn">
          Participate
        </div>
        <Counter class="Tournament-Counter" enddate="2020-11-01" />
      </div>
      <div class="Tournament-Table">
        <div class="Table">
          <div class="Table-Row">
            <div class="Table-Cell Table-Th">
              #
            </div>
            <div class="Table-Cell Table-Th">
              Name
            </div>
            <div class="Table-Cell Table-Th">
              Points
            </div>
          </div>
          <div class="Table-Row">
            <div class="Table-Cell">
              1
            </div>
            <div class="Table-Cell">
              Natacool
            </div>
            <div class="Table-Cell Tournament-Points">
              3422
            </div>
          </div>
          <div class="Table-Row">
            <div class="Table-Cell">
              3
            </div>
            <div class="Table-Cell">
              Fire Lighting 12
            </div>
            <div class="Table-Cell Tournament-Points">
              2210
            </div>
          </div>
          <div class="Table-Row">
            <div class="Table-Cell">
              4
            </div>
            <div class="Table-Cell">
              Dakamu
            </div>
            <div class="Table-Cell Tournament-Points">
              1012
            </div>
          </div>
          <div class="Table-Row" >
            <div class="Table-Cell">
              4
            </div>
            <div class="Table-Cell">
              Ioana Juliana
            </div>
            <div class="Table-Cell Tournament-Points">
              840
            </div>
          </div>
        </div>
        <button class="Tournament-More">
          Show more
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Counter from '@/components/Counter.vue';

export default {
  name: 'Tournament',
  components: {
    Counter,
  },
};
</script>

<style lang="scss">
.Tournament {
  margin-bottom: 30px;
  padding: 20px 16px;
  max-width: 100%;
  background-image: url('./../assets/img/tournament-bg_460.png');
  background-position: right top;
  background-size: auto 100%;
  background-repeat: no-repeat;

  @media(min-width: $screen-m) {
    margin-bottom: 38px;
    padding: 26px 0;
    background-image: url('./../assets/img/tournament-bg_768.png');
  }

  @media(min-width: $screen-l) {
    margin-bottom: 58px;
    background-image: url('./../assets/img/tournament-bg_960.png');
  }

  @media(min-width: $screen-xl) {
    margin-bottom: 80px;
    padding: 37px 0;
    background-image: url('./../assets/img/tournament-bg_1248.png');
  }

  &-Title {
    margin-bottom: 12px;
  }

  &-Subtitle {
    margin-bottom: 14px;

    @media(min-width: $screen-m) {
      margin-bottom: 23px;
    }

    @media(min-width: $screen-xl) {
      margin-bottom: 34px;
    }
  }

  &-Btn {
    order: 1;

    @media(min-width: $screen-s) {
      order: 0;
      margin-right: 15px;
    }
  }

  &-Participate {
    display: flex;
    flex-direction: column;
    margin-bottom: 19px;

    @media(min-width: $screen-s) {
      flex-direction: row;
      margin-bottom: 24px;
    }

    @media(min-width: $screen-l) {
      margin-bottom: 28px;
    }

    @media(min-width: $screen-xl) {
      margin-bottom: 40px;
    }
  }

  &-Counter {
    margin-bottom: 15px;

    @media(min-width: $screen-s) {
      margin-bottom: 0;
    }
  }

  &-Table {
    width: 100%;
    font-size: 12px;

    @media(min-width: $screen-m) {
      width: 50%;
    }

    @media(min-width: $screen-l) {
      width: 40%;
    }

    @media(min-width: $screen-xl) {
      width: 32%;
    }
  }

  &-Points {
    font-size: 14px;
    color: var(--color-main1);
  }

  &-More {
    display: block;
    padding: 15px 0;
    width: 100px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-ghost);
    text-transform: uppercase;
    cursor: pointer;
    margin-left: auto;
    white-space: nowrap;
  }
}
</style>
