<template>
  <!-- eslint-disable max-len -->
  <div class="CabinetPage VerificationPage">
    <div class="CabinetPage-Title VerificationPage-Title">
      {{ title }}
    </div>
    <div class="VerificationPage-Content">
      <div class="VerificationPage-Item">
        <div class="VerificationPage-Desc">
          <svg class="VerificationPage-Approve VerificationPage-Approve--approved">
            <use xlink:href="@/assets/img/icons.svg#approve"></use>
          </svg>
          <div class="VerificationPage-Title">
            <div class="VerificationPage-Name">
              Selfie & Id verification
            </div>
            <div class="VerificationPage-Text">
              Passport, drivers license, or other official document replacing them. <a href="#" class="CabinetPage-Link">More info</a>
            </div>
          </div>
        </div>
        <div class="VerificationPage-Docs">
          <div class="VerificationPage-Close">
            <div class="Close"></div>
          </div>
          <div class="VerificationPage-DocsTitle">
            Uploaded documents
          </div>
          <div class="VerificationPage-Name">
            Michelle Harris.pdf
          </div>
        </div>
      </div>
      <div class="VerificationPage-Item">
        <div class="VerificationPage-Desc">
          <svg class="VerificationPage-Approve">
            <use xlink:href="@/assets/img/icons.svg#approve"></use>
          </svg>
          <div class="VerificationPage-Title">
            <div class="VerificationPage-Name">
              Address verification
            </div>
            <div class="VerificationPage-Text">
              Until bill, phone bill, or bank statement, in which your name and address are fully indicated. <a href="#" class="CabinetPage-Link">More info</a>
            </div>
          </div>
        </div>
        <div class="VerificationPage-Docs">
          <div class="VerificationPage-Close">
            <div class="Close"></div>
          </div>
          <div class="VerificationPage-Text">
            Dpor file here or <a href="#" class="CabinetPage-Link">browse</a>
            jpg. png. Max size 2MB
          </div>
        </div>
      </div>
      <div class="VerificationPage-Item">
        <div class="VerificationPage-Desc">
          <svg class="VerificationPage-Approve">
            <use xlink:href="@/assets/img/icons.svg#approve"></use>
          </svg>
          <div class="VerificationPage-Title">
            <div class="VerificationPage-Name">
              Selfie & Id verification
            </div>
            <div class="VerificationPage-Text">
              Screenshot or photo from onlone bank, bank statement, Skrill page,etc,showing the deposit. <a href="#" class="CabinetPage-Link">More info</a>
            </div>
          </div>
        </div>
        <div class="VerificationPage-Docs">
          <div class="VerificationPage-Close">
            <div class="Close"></div>
          </div>
          <div class="VerificationPage-Text">
            Dpor file here or <a href="#" class="CabinetPage-Link">browse</a>
            jpg. png. Max size 2MB
          </div>
        </div>
      </div>
      <div class="VerificationPage-Item">
        <div class="VerificationPage-Desc">
          <svg class="VerificationPage-Approve VerificationPage-Approve--approved">
            <use xlink:href="@/assets/img/icons.svg#approve"></use>
          </svg>
          <div class="VerificationPage-Title">
            <div class="VerificationPage-Name">
              Phone verification
            </div>
            <div class="VerificationPage-Approved">
              Approved
            </div>
          </div>
        </div>
        <div class="VerificationPage-Docs">
          <div class="VerificationPage-Close">
            <div class="Close"></div>
          </div>
          <div class="VerificationPage-DocsTitle">
            Phone number
          </div>
          <div class="VerificationPage-Name">
            +3585****289
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerificationPage',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style lang="scss">
.VerificationPage {
  &-Content {
    width: 100%;
    margin-top: 36px;
  }

  &-Item {
    width: 100%;
    margin-bottom: 16px;

    @media (min-width: $screen-m) {
      display: flex;
      margin-bottom: 6px;
    }
  }

  &-Desc {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    padding: 16px;
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      justify-content: flex-start;
      margin-bottom: 0;
      margin-right: 6px;
      padding: 28px;
    }
  }

  &-Approve {
    order: 1;
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    fill: var(--color-bg-lighter);

    &--approved {
      fill: var(--color-accept);
    }

    @media (min-width: $screen-m) {
      order: 0;
      width: 54px;
      height: 54px;
      margin-right: 29px;
    }
  }

  &-Title {
    margin-right: 25px;
  }

  &-Name {
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1.09;
    color: var(--color-text-main);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-Text {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.339;
    color: var(--color-text-ghost);
  }

  &-Docs {
    position: relative;
    padding: 16px 56px 16px 16px;
    background: rgba(27, 33, 56, 0.2);
    border: 2px dashed var(--color-bg-lighter);

    @media (min-width: $screen-m) {
      flex-shrink: 0;
      width: 324px;
      padding: 28px 68px 28px 66px;
    }
  }

  &-DocsTitle {
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1.09;
    color: var(--color-text-ghost);
    white-space: nowrap;
  }

  &-Close {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background: var(--color-bg-lighter);
    cursor: pointer;
  }

  &-Approved {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1.09;
    color: var(--color-accept);
  }
}

</style>
