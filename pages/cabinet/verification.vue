<template>
  <div class="CabinetPage VerificationPage">
    <div class="CabinetPage-Title VerificationPage-Title">
      Verification
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
              Passport, drivers license, or other official document replacing them.
              <a href="#" class="CabinetPage-Link">More info</a>
            </div>
          </div>
        </div>
        <div class="VerificationPage-Docs">
          <div class="VerificationPage-DocsContent">
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
              Until bill, phone bill, or bank statement, in which your name and address are fully
              indicated. <a href="#" class="CabinetPage-Link">More info</a>
            </div>
          </div>
        </div>
        <div class="VerificationPage-Docs">
          <client-only>
            <vueDropzone
              id="dropzone"
              ref="myVueDropzone"
              :options="dropzoneOptions"
              :use-custom-slot="true"
            >
              <div class="VerificationPage-DocsContent">
                <div class="VerificationPage-Close">
                  <div class="Close"></div>
                </div>
                <div class="VerificationPage-Text">
                  Dpor file here or <span class="CabinetPage-Link">browse</span>
                  jpg. png. Max size 2MB
                </div>
              </div>
            </vueDropzone>
          </client-only>
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
              Screenshot or photo from onlone bank, bank statement, Skrill page,etc,showing the
              deposit. <a href="#" class="CabinetPage-Link">More info</a>
            </div>
          </div>
        </div>
        <div class="VerificationPage-Docs">
          <client-only>
            <vueDropzone
              id="dropzone2"
              ref="myVueDropzone2"
              :options="dropzoneOptions"
              :use-custom-slot="true"
            >
              <div class="VerificationPage-DocsContent">
                <div class="VerificationPage-Close">
                  <div class="Close"></div>
                </div>
                <div class="VerificationPage-Text">
                  Dpor file here or <span class="CabinetPage-Link">browse</span>
                  jpg. png. Max size 2MB
                </div>
              </div>
            </vueDropzone>
          </client-only>
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
          <div class="VerificationPage-DocsContent">
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
  </div>
</template>

<script>
import { API_HOST_PROD, API_HOST_SANDBOX } from '@/config';
import { mapState } from 'vuex';

const vue2Dropzone = () => import('vue2-dropzone');

const API_HOST = process.env.NUXT_ENV_MODE === 'sandbox' ? API_HOST_SANDBOX : API_HOST_PROD;

export default {
  name: 'VerificationPage',
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: `${API_HOST}/document`,
        maxFilesize: 2,
        thumbnailHeight: 100,
        thumbnailMethod: 'contain',
        acceptedFiles: '.png, .jpg',
        addRemoveLinks: true,
        params: file => ({ name: file.name }),
      },
    };
  },
  computed: {
    ...mapState(['token']),
  },
  mounted() {
    this.dropzoneOptions.headers = { 'X-Auth-Token': this.token };
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
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    margin-bottom: 4px;
    padding: 16px;
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      justify-content: flex-start;
      margin-right: 6px;
      margin-bottom: 0;
      padding: 28px;
    }
  }

  &-Approve {
    flex-shrink: 0;
    order: 1;
    width: 34px;
    height: 34px;
    fill: var(--color-bg-lighter);

    @media (min-width: $screen-m) {
      order: 0;
      width: 54px;
      height: 54px;
      margin-right: 29px;
    }

    &--approved {
      fill: var(--color-accept);
    }
  }

  &-Title {
    margin-right: 25px;
  }

  &-Name {
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.09;
    color: var(--color-text-main);
    text-transform: uppercase;

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
    background: rgba(27, 33, 56, 0.2);
    border: 2px dashed var(--color-bg-lighter);

    @media (min-width: $screen-m) {
      flex-shrink: 0;
      width: 324px;
    }
  }

  &-DocsContent {
    height: 100%;
    padding: 16px 56px 16px 16px;

    @media (min-width: $screen-m) {
      padding: 28px 68px 28px 66px;
    }
  }

  &-DocsTitle {
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.09;
    color: var(--color-text-ghost);
    text-transform: uppercase;
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
    line-height: 1.09;
    color: var(--color-accept);
    text-transform: uppercase;
  }
}
</style>
